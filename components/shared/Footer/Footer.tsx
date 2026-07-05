import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Heart, Shield, Users, ArrowRight } from "lucide-react";
import { SiteConfig } from "@/config/siteConfig";
import { NavItem } from "@/types/siteConfigType";
import Logo from "../../../assets/logo/footer-logo.png";

interface SocialLink {
  name: string;
  icon: any;
  href: string;
}

export function Footer() {
  const { brandName, description, email, displayNumber, callLink, location, navItems, socialLinks } = SiteConfig;

  const activityItems = ["যাকাত প্রদান", "এতিম ও দুস্থ সহায়তা", "জরুরি খাদ্য সহায়তা", "মসজিদ ও মাদ্রাসা ফান্ড", "শীতবস্ত্র বিতরণ", "স্বাস্থ্যসেবা প্রদান"];

  return (
    <footer className="bg-primary text-white relative overflow-hidden border-t border-white/10 pb-24 lg:pb-0">
      {/* Background Subtle Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 h-64 border border-white rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 blur-3xl rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 py-12 lg:py-16 relative z-10">

        {/* উপরের ৩টি মূল বৈশিষ্ট্য */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-amber-400/50 transition-all duration-300">
            <Shield className="h-8 w-8 text-amber-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-bold mb-2">নিরাপদ অনুদান</h3>
            <p className="text-sm text-white/60">আপনার প্রতিটি কন্ট্রিবিউশন এনক্রিপশন দ্বারা সুরক্ষিত।</p>
          </div>
          <div className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-amber-400/50 transition-all duration-300">
            <Users className="h-8 w-8 text-amber-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-bold mb-2">স্বচ্ছ কার্যক্রম</h3>
            <p className="text-sm text-white/60">ব্যয়ের সঠিক হিসাব এবং নিয়মিত আপডেট প্রদান।</p>
          </div>
          <div className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-amber-400/50 transition-all duration-300 sm:col-span-2 lg:col-span-1">
            <Heart className="h-8 w-8 text-amber-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-bold mb-2">সদকাহ জারিয়া</h3>
            <p className="text-sm text-white/60">স্থায়ী সওয়াব অর্জনে আপনার পাশে আন-নুসরা ফাউন্ডেশন।</p>
          </div>
        </div>

        {/* মেইন গ্রিড সেকশন */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* লোগো ও বর্ণনা */}
          <div className="space-y-6 text-center md:text-left">
            <div className="flex justify-center md:justify-start">
              <Image
                src={Logo}
                alt={`${brandName} Logo`}
                className="h-20 w-auto object-contain bg-white rounded-md p-1" // লোগোটি হোয়াইট ব্যাকগ্রাউন্ডে থাকলে p-1 দিলে সুন্দর দেখায়
                priority
              />
            </div>
            <p className="text-sm text-white/70 leading-relaxed font-light">
              {description}
            </p>
            <div className="flex justify-center md:justify-start gap-4 pt-2">
              {socialLinks?.map(({ name, icon: Icon, href }: SocialLink) => (
                <Link key={name} href={href} className="p-2 bg-white/5 rounded-full hover:bg-amber-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* দ্রুত লিংক */}
          <div className="space-y-5">
            <h3 className="text-lg font-bold border-l-4 border-amber-400 pl-3">দ্রুত লিংক</h3>
            <nav className="flex flex-col gap-3">
              {navItems?.bn.map((item: NavItem, index: number) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-sm text-white/60 hover:text-amber-400 hover:translate-x-2 transition-all duration-300 flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-amber-400 rounded-full"></span>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* আমাদের কার্যক্রম */}
          <div className="space-y-5">
            <h3 className="text-lg font-bold border-l-4 border-amber-400 pl-3">আমাদের কার্যক্রম</h3>
            <div className="flex flex-col gap-3">
              {activityItems?.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-2 text-sm text-white/60 hover:text-amber-400 cursor-pointer transition-all duration-400 hover:translate-x-3"
                >
                  <ArrowRight className="h-0 w-0 group-hover:w-4 group-hover:h-4 opacity-0 group-hover:opacity-100 transition-all duration-400 text-amber-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* যোগাযোগ */}
          <div className="space-y-5">
            <h3 className="text-lg font-bold border-l-4 border-amber-400 pl-3">যোগাযোগ করুন</h3>
            <div className="space-y-4 text-sm text-white/70">
              <Link href={callLink} className="flex items-center gap-3 hover:text-amber-400 transition-colors group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-amber-500/20 transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                {displayNumber}
              </Link>
              <Link href={`mailto:${email}`} className="flex items-center gap-3 hover:text-amber-400 transition-colors group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-amber-500/20 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                {email}
              </Link>
              <div className="flex items-start gap-3 group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-amber-500/20 transition-colors">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="leading-relaxed">{location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* নিচের অংশ */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-6 text-center">
          <div className="space-y-2 lg:text-left">
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} {brandName}। সর্বস্বত্ব সংরক্ষিত।
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-[11px] text-white/40">
              <Link href="/privacy-policy" className="hover:text-amber-400 transition-colors">গোপনীয়তা নীতি</Link>
              <Link href="/terms" className="hover:text-amber-400 transition-colors">শর্তাবলী</Link>
              <Link href="/refund" className="hover:text-amber-400 transition-colors">ফেরত নীতি</Link>
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-3">
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">নিরাপদ পেমেন্ট পার্টনার</span>
            <div className="flex gap-2">
              {['বিকাশ', 'নগদ', 'রকেট', 'ভিসা'].map((pay) => (
                <div key={pay} className="px-3 py-1 bg-white/5 rounded border border-white/10 text-[10px] text-white/60 hover:bg-white/10 transition-colors cursor-default">
                  {pay}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}