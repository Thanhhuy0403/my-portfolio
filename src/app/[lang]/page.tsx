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
import { sectionIds } from "@/content/profile";
import { getI18n } from "@/i18n/server";

export default async function Home() {
  const { locale, dict, content } = await getI18n();
  return (
    <>
      <Header
        locale={locale}
        nav={sectionIds.map((id) => ({ id, label: dict.nav[id] }))}
        labels={dict.header}
        name={content.person.name}
        cv={content.person.cv}
      />
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
          (it adds attributes like data-shown to server-rendered markup). */}
      <Effects />
    </>
  );
}
