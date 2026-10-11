import { About } from "@/components/about";
import { Awards } from "@/components/awards";
import { Contact } from "@/components/contact";
import { Effects } from "@/components/effects";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Startup } from "@/components/startup";
import { TechStrip } from "@/components/tech-strip";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <TechStrip />
        <About />
        <Experience />
        <Startup />
        <Projects />
        <Awards />
        <Skills />
        <Contact />
      </main>
      <Footer />
      {/* Last in the page tree so its effects run only after every section has hydrated
          (it adds attributes like data-shown / data-offscreen to server-rendered markup). */}
      <Effects />
    </>
  );
}
