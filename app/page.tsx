import { HeroSection } from "@/components/hero-section";
import { ConsultaForm } from "@/components/consulta-form";
import { TestimoniosSection } from "@/components/testimonios-section";
import { FlyersHighlight } from "@/components/flyers-highlight";
import { FAQSection } from "@/components/faq-section";
import { AboutSection } from "@/components/about-section";
import { EmpresasAsociadasSection } from "@/components/empresas-asociadas-section";

export default function Home() {
  return (
    <main id="inicio" className="min-h-screen">
      <HeroSection />
      <FlyersHighlight />
      <TestimoniosSection />
      <AboutSection />
      <EmpresasAsociadasSection />
      <FAQSection />
      <ConsultaForm />
    </main>
  );
}



