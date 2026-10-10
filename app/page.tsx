import { MotionConfig } from "framer-motion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Expertise from "@/components/Expertise";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import OpenSource from "@/components/OpenSource";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="paper-wash min-h-screen overflow-x-clip">
        <Header />
        <main>
          <Hero />
          <About />
          <Expertise />
          <Work />
          <Experience />
          <OpenSource />
          <Contact />
        </main>
        <Footer />
      </div>
      <ChatWidget />
    </MotionConfig>
  );
}
