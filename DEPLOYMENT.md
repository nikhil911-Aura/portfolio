# Minimal AWS deployment

Existing flow: GitHub main → CodePipeline → CodeBuild → CodeDeploy → Ubuntu EC2.
Vercel, application code, and the existing Nginx reverse proxy remain unchanged.

```text
buildspec.yml
appspec.yml
deploy/
  stop.sh
  start.sh
  validate.sh
```

## What happens on deployment

1. CodeBuild uses Node 24, installs dependencies, and builds with
   BUILD_STANDALONE=true. Default/Vercel builds retain their existing behavior.
2. The artifact contains appspec.yml, deploy/*.sh, and app/ with server.js,
   traced node_modules, .next/static, and public files. Dotenv files and build
   caches are excluded. No build or npm install runs on EC2.
3. BeforeInstall stops portfolio.service if it exists. On the first deployment
   there is nothing to stop. This prevents serving files while they are replaced.
4. CodeDeploy creates /var/www/portfolio and copies app/ into it.
5. start.sh assigns ownership to ubuntu:ubuntu and creates portfolio.service
   only if absent. It reloads systemd, enables the service for boot, and restarts it.
6. validate.sh checks that the service is active and that http://127.0.0.1:3000/
   returns HTTP 200, retrying for up to about two minutes.

The service uses the existing ubuntu user, WorkingDirectory=/var/www/portfolio,
and ExecStart=/usr/bin/node server.js. It sets production mode and listens on
127.0.0.1:3000. The existing Node v24.21.0 installation is not replaced or modified.
Future deployments preserve the installed service, including local overrides.
Deployments cause brief downtime; no custom rollback framework is added.

## EC2 prerequisites

No manual user, directory, service, or environment-file creation is required.
The supplied instance already has Ubuntu, ubuntu, /usr/bin/node, and Nginx.
The existing CodeDeploy agent must be running and curl must be available.
Port 3000 must not be occupied by a separate process.

Keep the existing CodeBuild project on a Linux image supporting Node 24, such as
aws/codebuild/standard:7.0, and use the same CPU architecture as EC2 for native
dependencies. See [AWS supported runtimes](https://docs.aws.amazon.com/codebuild/latest/userguide/available-runtimes.html).
Do not recreate the pipeline, deployment group, or Nginx configuration.

## Environment variables

No environment file is required for the service to start. For chat, email, and
authenticated GitHub access, configure real runtime credentials independently
of Vercel. The existing APIs read GROQ_API_KEY, CEREBRAS_API_KEY, GITHUB_TOKEN,
SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, and ADMIN_EMAIL.
The homepage health check does not test provider credentials.

If needed, use a real root-owned mode-600 environment file outside
/var/www/portfolio, and add its actual path with:

```bash
sudo systemctl edit portfolio.service
# In the editor:
# [Service]
# EnvironmentFile=/absolute/path/to/your/real/environment-file
sudo systemctl daemon-reload
sudo systemctl restart portfolio.service
```

Do not create an empty file to satisfy deployment, commit secrets, or place
runtime secrets in CodeBuild. The hooks preserve systemd overrides.

## Test the next execution

1. Commit and push these changes to main. The existing CodePipeline source action
   must watch main with automatic change detection enabled.
2. Confirm Build uses buildspec.yml and Deploy consumes its output artifact,
   not the source artifact. The artifact root must contain appspec.yml,
   deploy/, and app/ (including hidden .next files).
3. Inspect CodeDeploy's BeforeInstall, ApplicationStart, and ValidateService.
   The hooks should reference deploy/*.sh, not the removed deploy/ec2 paths.
4. After deployment, run:

```bash
sudo systemctl status portfolio --no-pager
curl --fail http://127.0.0.1:3000/
sudo journalctl -u portfolio -n 50 --no-pager
sudo tail -n 50 /var/log/aws/codedeploy-agent/codedeploy-agent.log
```

Open the existing AWS URL to check Nginx, images, chat, GitHub data, and email.
If a failure still mentions prepare.sh, check the source revision/build artifact.
No AWS deployment success is implied by local build or packaging tests.

## Simplification inventory

Removed deploy/ec2/package.sh, prepare.sh, update.sh, start.sh, stop.sh,
validate.sh, portfolio.service, and nginx.conf. Packaging is inline in buildspec;
service creation is inline in start.sh. Only three small scripts remain.
Updated buildspec.yml, appspec.yml, .gitattributes, and this guide.
No dependencies, Vercel settings, Next.js configuration, routes, or UI changed.
