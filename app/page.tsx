import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ProjectsSection } from "@/components/projects-section";
import { ServicesSection } from "@/components/services-section";
import { WhyChooseSection } from "@/components/why-choose-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { FloatingShapes } from "@/components/floating-shapes";
import { WhatsAppButton } from "@/components/whatsapp-button";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <FloatingShapes />
      <WhatsAppButton />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <WhyChooseSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
