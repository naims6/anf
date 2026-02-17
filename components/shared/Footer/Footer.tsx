import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Heart, Shield, Users, BookOpen } from "lucide-react";
import { SiteConfig } from "@/config/siteConfig";
import { NavItem } from "@/types/siteConfigType";



export function Footer() {
  const {
    brandName,
    description,
    email,
    displayNumber,
    callLink,
    location,
    navItems,
    socialLinks,
  } = SiteConfig;

  return (
    // bg-[#008E48]
    <footer className="bg-primary text-white relative overflow-hidden">
      {/* <footer className="bg-gradient-to-b from-emerald-900 to-green-950 text-white relative overflow-hidden"> */}
      {/* Islamic Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 border-2 border-white rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 border-2 border-white rounded-full"></div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Trust Badges Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">100% Secure Donations</h3>
            <p className="text-sm text-white/70">Your contributions are protected with encryption</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
            <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Transparent Operations</h3>
            <p className="text-sm text-white/70">Regular updates on fund utilization</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
            <div className="w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Sadaqah Jariyah</h3>
            <p className="text-sm text-white/70">Continuous charity for lasting rewards</p>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
                {brandName}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed mb-6">
                {description}
              </p>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-start gap-3 group cursor-pointer">
                  <div className="p-2 bg-amber-500 rounded-lg group-hover:scale-110 transition-transform">
                    <Phone className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <Link
                      href={callLink}
                      className="text-sm font-medium hover:text-amber-400 transition-colors block"
                    >
                      {displayNumber}
                    </Link>
                    <p className="text-xs text-white/60 mt-1">24/7 Support Available</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 group cursor-pointer">
                  <div className="p-2 bg-amber-500 rounded-lg group-hover:scale-110 transition-transform">
                    <Mail className="h-4 w-4 text-white" />
                  </div>
                  <Link
                    href={`mailto:${email}`}
                    className="text-sm font-medium hover:text-amber-400 transition-colors"
                  >
                    {email}
                  </Link>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-500 rounded-lg">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-sm font-medium">{location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold border-l-4 border-amber-400 pl-3 bg-white/5 py-2 rounded-r-lg">
              Quick Links
            </h3>
            <nav className="grid grid-cols-1 gap-3">
              {navItems?.bn.map((item:NavItem, index:number) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-sm text-white/80 hover:text-amber-400 transition-all duration-300 hover:translate-x-2 flex items-center gap-1 group p-2 rounded-lg hover:bg-white/5"
                >
                  <div className="w-2 h-2 bg-amber-400 rounded-full group-hover:scale-150 transition-transform"></div>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Donation Types Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold border-l-4 border-amber-400 pl-3 bg-white/5 py-2 rounded-r-lg">
              Ways to Give
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                "Zakat",
                "Sadaqah",
                "Emergency Aid",
                "Education Funds",
                "Winter Relief",
                "Qurbani",
                "Tree Plantation",
                "Masjid Construction"
              ].map((type, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-all duration-300 group"
                >
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full group-hover:scale-150 transition-transform"></div>
                  <span className="text-sm text-white/80 group-hover:text-white">
                    {type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Islamic Resources & Social Links */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold border-l-4 border-amber-400 pl-3 bg-white/5 py-2 rounded-r-lg">
                Resources
              </h3>
              <nav className="space-y-3">
                {[
                  { name: "Zakat Calculator", href: "/zakat-calculator" },
                  { name: "Islamic Webinars", href: "/webinars" },
                  { name: "Blog & Articles", href: "/blog" },
                  { name: "Volunteer", href: "/volunteer" },
                  { name: "Membership", href: "/membership" }
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-white/80 hover:text-amber-400 transition-all duration-300 hover:translate-x-2 flex items-center gap-3 group p-2 rounded-lg hover:bg-white/5"
                  >
                    <div className="w-2 h-2 bg-amber-400 rounded-full group-hover:scale-150 transition-transform"></div>
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Follow Our Journey</h4>
              <div className="flex gap-3">
                {socialLinks.map(({ name, icon: Icon, href }:any) => (
                  <Link
                    key={name}
                    href={href}
                    aria-label={name}
                    className="p-3 bg-white/10 rounded-xl hover:bg-amber-500 hover:scale-110 transition-all duration-300 group border border-white/20"
                  >
                    <Icon className="h-5 w-5 group-hover:text-white" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} {brandName}. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="text-sm text-white/60 hover:text-amber-400 transition-colors hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" className="text-sm text-white/60 hover:text-amber-400 transition-colors hover:underline">
                Terms & Conditions
              </Link>
              <Link href="/refund-policy" className="text-sm text-white/60 hover:text-amber-400 transition-colors hover:underline">
                Refund Policy
              </Link>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <span className="text-xs text-white/60 mr-2">Secure Payments:</span>
            <div className="flex gap-1">
              <div className="w-8 h-5 bg-white/20 rounded text-[10px] flex items-center justify-center text-white/60">Bkash</div>
              <div className="w-8 h-5 bg-white/20 rounded text-[10px] flex items-center justify-center text-white/60">Nagad</div>
              <div className="w-8 h-5 bg-white/20 rounded text-[10px] flex items-center justify-center text-white/60">VISA</div>
              <div className="w-8 h-5 bg-white/20 rounded text-[10px] flex items-center justify-center text-white/60">MC</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}