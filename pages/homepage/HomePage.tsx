
import ActivitiesSection from '@/components/view/Activities/Activities'
import Blog from '@/components/view/Blog/Blog'
import Contact from '@/components/view/contact/Contact'
import Gallery from '@/components/view/Gallery/Gallery'
import GetInvolved from '@/components/view/GetInvolved/GetInvolved'
import DonationCard from '@/components/view/Home/Hero/DonationCard'
import Hero from '@/components/view/Home/Hero/Hero'
import ServiceSection from '@/components/view/Home/ServiceSection/ServiceSection'

export default function HomePage() {
    return (
        <main className="bg-white">
            <Hero />
            <ServiceSection />
            <ActivitiesSection />
            <GetInvolved />
            <Gallery />
            <Blog />
            <Contact />
        </main>
    )
}