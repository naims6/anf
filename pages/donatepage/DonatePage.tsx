import DonateHero from "@/components/view/Donate/DonateHero";
import DonationCategories from "@/components/view/Donate/DonationCategories";
import DonationMethods from "@/components/view/Donate/DonationMethods";
import TransparencySection from "@/components/view/Donate/TransparencySection";




export default function DonatePage() {
  return (
    <div>
      <DonateHero />
      <DonationCategories />
      <DonationMethods />
      <TransparencySection />
    </div>
  )
}
