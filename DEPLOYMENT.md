# Independent AWS EC2 deployment

Vercel keeps its existing Git integration, environment variables, build command,
and settings. No Vercel changes are required. Only CodeBuild sets
`BUILD_STANDALONE=true`; the existing conditional in `next.config.ts` is preserved.
`package.json`, the lockfile, routes, APIs, and UI are unchanged.

AWS flow: GitHub main → CodePipeline → CodeBuild → CodeDeploy → Ubuntu EC2.
This repository supplies the build and deployment artifacts, not provisioned cloud
resources. Complete the steps below in your AWS account before pushing to main.
Use one region throughout and replace all uppercase placeholders.

## 1. IAM and artifact storage

Create a private S3 artifact bucket with Block Public Access, encryption, versioning,
and a lifecycle policy appropriate for your rollback retention. Restrict access
to the following roles. Use resource-specific policies rather than AdministratorAccess.

| Role / trusted service | Required access |
| --- | --- |
| Pipeline / codepipeline.amazonaws.com | `codeconnections:UseConnection` on the GitHub connection ARN (older connections may use `codestar-connections:UseConnection`); `codebuild:StartBuild,BatchGetBuilds` on the project; `codedeploy:CreateDeployment,GetDeployment,GetDeploymentConfig,GetApplication,GetApplicationRevision,RegisterApplicationRevision` scoped to the application, deployment group and deployment configuration as supported by IAM; artifact S3 read/write |
| Build / codebuild.amazonaws.com | Artifact S3 read/write; `logs:CreateLogGroup,CreateLogStream,PutLogEvents` scoped to `/aws/codebuild/PROJECT`. No application runtime secrets are needed for the current build. |
| Deployment / codedeploy.amazonaws.com | AWS managed `AWSCodeDeployRole` for EC2 deployments, or an equivalent reviewed scoped policy |
| EC2 instance profile / ec2.amazonaws.com | `s3:GetObject,GetObjectVersion` on artifact bucket objects; `s3:ListBucket` on that bucket. Optional `AmazonSSMManagedInstanceCore` for Session Manager. |

Artifact S3 read/write means `s3:GetObject,GetObjectVersion,PutObject` on
`arn:aws:s3:::BUCKET/*`, plus `s3:GetBucketLocation,GetBucketVersioning,ListBucket`
on `arn:aws:s3:::BUCKET`. For a customer-managed KMS key, grant
`kms:Decrypt,DescribeKey` to readers and `kms:Encrypt,GenerateDataKey` to writers
on the key ARN; its key policy must also permit the roles.
Some CodeDeploy read actions require Resource `*`; consult the service authorization
reference when scoping them. The setup operator needs IAM role creation/attachment,
`iam:PassRole` restricted to these roles/services, and permissions to create the
pipeline, connection, build project and deployment resources. These are not runtime
permissions. Never place AWS access keys in GitHub, source files, or buildspec.

## 2. EC2 prerequisites

Use a dedicated **Ubuntu 22.04 x86_64** EC2 instance, matching CodeBuild's Linux
x86_64 environment. Start with at least 2 GB RAM and adequate disk for CodeDeploy
revision history. Attach the instance profile above and tag it
`Application=portfolio`. Require IMDSv2. Allow inbound 80/443, restrict SSH to
your IP (or use Session Manager), and do **not** open port 3000.
Provide outbound HTTPS/DNS access for AWS endpoints and application providers,
and outbound access to your SMTP provider's configured port.

Install Node.js **22** system-wide using your approved Node installation source;
the binary must be `/usr/bin/node`. Do not use an interactive user's nvm.
Verify `/usr/bin/node --version` prints v22.x. Use the same Node patch release
in build and runtime when pinning versions.

```bash
sudo apt-get update
sudo apt-get install -y nginx curl ca-certificates ruby-full wget
sudo useradd --system --user-group --home-dir /opt/portfolio --no-create-home --shell /usr/sbin/nologin portfolio
sudo install -d -m 755 /opt/portfolio
sudo install -d -m 700 /etc/portfolio
sudo install -m 600 /dev/null /etc/portfolio/portfolio.env
sudoedit /etc/portfolio/portfolio.env
```

Run user creation and empty-file creation only for initial provisioning; do not
truncate an existing secrets file. Populate it before the first deployment.

## 3. Runtime environment and secrets

Use systemd EnvironmentFile syntax (not shell `export` statements):

```dotenv
GROQ_API_KEY="REPLACE"
CEREBRAS_API_KEY="REPLACE"
GITHUB_TOKEN="REPLACE"
SMTP_HOST="REPLACE"
SMTP_PORT="587"
SMTP_USER="REPLACE"
SMTP_PASS="REPLACE"
SMTP_FROM="REPLACE"
ADMIN_EMAIL="REPLACE"
```

These are the variables referenced by the existing APIs. Supply valid values for
the features you use; SMTP currently uses `secure: false`, so use your provider's
STARTTLS port (typically 587), not implicit TLS port 465. Quote values containing spaces or special characters using systemd
environment-file rules; shell expansion does not occur. Never source this file
or print its contents into deployment logs.

The root-owned mode-600 file is read by systemd and supplied to the unprivileged
process. It survives deployment and rollback. Rotate values through an approved
secure administration session and run `sudo systemctl restart portfolio`.
For centralized secret management, provision this file from Secrets Manager or
SSM SecureString with a separate trusted provisioning process; grant the EC2 role
only `secretsmanager:GetSecretValue` or `ssm:GetParameter` on the chosen ARN,
plus `kms:Decrypt` for its customer-managed key. That retrieval is not implemented
by these hooks. Do not grant runtime secrets to CodeBuild.

Do not commit dotenv files. The packager removes any traced `.env*` files, but
removal cannot undo secrets already embedded in generated assets: keep runtime
secrets out of the build environment. Any future `NEXT_PUBLIC_*` values must be
non-secret and set at build time; changing them requires rebuilding.
AWS values are managed independently from Vercel values.

## 4. Nginx

Copy `deploy/ec2/nginx.conf` from this repository to
`/etc/nginx/sites-available/portfolio`. Add the EC2 hostname or a separate AWS
domain to `server_name`, keeping `portfolio.internal` for local health checks.

```bash
sudo install -m 644 deploy/ec2/nginx.conf /etc/nginx/sites-available/portfolio
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio
sudo nginx -t
sudo systemctl enable --now nginx
sudo systemctl reload nginx
```

The template proxies to 127.0.0.1:3000 and disables buffering for streamed responses.
The Ubuntu default site may remain enabled; access via your configured hostname,
not an unmatched IP Host header. Configure DNS and trusted HTTPS certificates
before public use. Preserve an HTTP `portfolio.internal` location that proxies
to the app for the deployment check if you add HTTP-to-HTTPS redirects. Deployment
hooks deliberately do not overwrite your installed Nginx/TLS configuration.
Do not repoint the existing Vercel domain unless you intend to change its routing.

## 5. CodeDeploy agent

Use the regional installer bucket matching the instance region. Example:

```bash
AWS_REGION=ap-south-1 # replace as needed
cd /tmp
wget -O codedeploy-install "https://aws-codedeploy-${AWS_REGION}.s3.${AWS_REGION}.amazonaws.com/latest/install"
chmod +x codedeploy-install
sudo ./codedeploy-install auto
sudo systemctl enable --now codedeploy-agent
sudo systemctl status codedeploy-agent --no-pager
```

Ensure outbound access to S3 and CodeDeploy (including its commands endpoint);
private subnets need NAT or suitable VPC endpoints. Keep the agent updated.
See the [official Ubuntu installation instructions](https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent-operations-install-ubuntu.html).

Create a CodeDeploy application with compute platform **EC2/On-premises**, and
a deployment group using the deployment service role, tag `Application=portfolio`,
in-place deployment, and `CodeDeployDefault.OneAtATime`. No load balancer is required
for this single-instance setup. Enable automatic rollback on deployment failure.
Deployments cause brief downtime; for zero downtime use a separate blue/green
or multi-instance architecture. Rollback redeploys the last successful artifact
and does not restore old secrets. A failed first deployment has no prior revision.

## 6. CodeBuild and CodePipeline

1. Create a CodeBuild project using managed image `aws/codebuild/standard:7.0`,
   Linux x86_64, and Node.js 22 as selected in buildspec. Use at least
   BUILD_GENERAL1_MEDIUM, no privileged mode, source **CodePipeline** and artifacts
   **CodePipeline**, buildspec path `buildspec.yml`, and the build role above.
   Provide outbound network access for npm and the fonts downloaded by next/font.
2. In CodePipeline create a GitHub connection through AWS CodeConnections. Authorize
   the GitHub App only for this repository and complete its pending authorization.
   This is independent of the existing Vercel GitHub integration.
3. Create the pipeline with the artifact bucket and pipeline role. Use execution
   mode **QUEUED** to serialize deployments to this single instance.
4. Source: choose the connection, repository and branch **main**, standard ZIP
   output artifact `SourceArtifact` (not full-clone mode). Enable automatic
   change detection / start on source changes. If using V2 trigger filters,
   configure Git push with include branch `main`, no tag or path filters.
5. Build: select the project, input `SourceArtifact`, output `BuildArtifact`.
6. Deploy: provider **AWS CodeDeploy**, the application/deployment group above,
   and input **BuildArtifact**, not SourceArtifact. Omit manual approval stages
   if every main push should deploy automatically.
7. Release a first revision, then push a small authorized change to main to verify
   automatic triggering. The existing Vercel deployment can run independently.

The [GitHub connection guide](https://docs.aws.amazon.com/codepipeline/latest/userguide/connections-github.html)
describes authorization; [available runtimes](https://docs.aws.amazon.com/codebuild/latest/userguide/available-runtimes.html)
lists supported build images.

The artifact root contains `appspec.yml`, `deploy/ec2/*`, and `app/` with
`server.js`, traced node_modules, public files, and hidden `.next` files.
The standalone asset copying follows the installed Next.js output guide.
No npm install or application build runs on EC2.

## 7. Deployment lifecycle and verification

CodeDeploy stops systemd, checks prerequisites, clears only `/opt/portfolio/app`,
copies the fresh app, installs the service, starts it, and checks HTTP 200 both
on port 3000 and through Nginx. Hooks run as root; Node runs as `portfolio`.
Application code is read-only to Node except `.next`, which supports Next's
runtime caches. Systemd fixes production mode, localhost binding, and port 3000.
CodeDeploy uses the previous successful revision's ApplicationStop hook and skips
it on the first deployment; BeforeInstall also stops the service.
See [hook lifecycle semantics](https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html).

On Linux, validate a fresh checkout with Node 22:

```bash
npm ci
npm run build
BUILD_STANDALONE=true npm run build
bash deploy/ec2/package.sh
for script in deploy/ec2/*.sh; do bash -n "$script"; done
test -f build/codedeploy/app/server.js
test -d build/codedeploy/app/.next/static
find build/codedeploy/app -name '.env*' # must print nothing
```

On EC2 after deployment:

```bash
sudo systemctl status portfolio --no-pager
curl --fail http://127.0.0.1:3000/
curl --fail -H 'Host: portfolio.internal' http://127.0.0.1/
sudo journalctl -u portfolio -n 100 --no-pager
sudo tail -n 100 /var/log/aws/codedeploy-agent/codedeploy-agent.log
```

Also verify static assets, image optimization, chat, GitHub data, and contact
email with the real runtime credentials. The deployment health check checks
application availability, not external provider credentials. Inspect deployment
event logs for failed hooks. Redeploy a known-good revision through CodeDeploy
for manual rollback; do not copy files over a running service.

## Migration inventory

- Removed `deploy/eb/Procfile` and `deploy/eb/.ebextensions/01-environment.config`.
- Replaced the Beanstalk packaging workflow in `buildspec.yml` with CodeDeploy
  packaging. No `.github/workflows` deployment workflow exists in this checkout.
- Updated only the AWS comment in `next.config.ts`; its conditional is unchanged.
- Added `appspec.yml`, `deploy/ec2/` scripts/service/Nginx template,
  scoped `.gitattributes` line-ending rules, and this guide.
- No Beanstalk-only npm dependencies were present.

No AWS cloud resources were deleted or changed. If an existing cloud pipeline
still targets Beanstalk, disable or replace that pipeline's trigger/deploy stage
manually before merging this artifact-layout change; otherwise it will receive
an incompatible bundle. Retire old Beanstalk resources separately after confirming
the migration. Preserve shared roles, buckets, and connections still in use.
