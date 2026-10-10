import { About } from "@/components/about";
import { Awards } from "@/components/awards";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { TechMarquee } from "@/components/tech-marquee";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <TechMarquee />
        <About />
        <Experience />
        <Projects />
        <Awards />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
