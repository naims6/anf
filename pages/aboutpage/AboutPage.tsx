import AboutHero from "@/components/view/AboutUs/AboutHero";
import AboutSection from "@/components/view/AboutUs/AboutSection";
import FinancialPolicySection from "@/components/view/AboutUs/FinancialPolicySection";
import ObjectivesSection from "@/components/view/AboutUs/ObjectivesSection";
import PrinciplesSection from "@/components/view/AboutUs/PrinciplesSection";


export default function AboutPage() {
  return (
    <div>
      <AboutHero />
      <AboutSection />
      <PrinciplesSection />
      <ObjectivesSection />
      <FinancialPolicySection />
    </div>
  )
}
