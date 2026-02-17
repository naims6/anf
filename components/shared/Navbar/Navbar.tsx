"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, User, LogIn, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { brandlogo } from "@/utils/assets";
import Image from "next/image";
import { SiteConfig } from "@/config/siteConfig";
import NavDrawer from "./NavDrawer";
import { NavItem } from "@/types/siteConfigType";

const { email, location, socialLinks, navItems, callLink, displayNumber } = SiteConfig;

const Navbar = () => {
  const pathname = usePathname();

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-700 text-white py-2 px-4 text-sm text-center relative overflow-hidden -mb-32">
        <div className="absolute inset-0 bg-[url('/islamic-pattern.png')] opacity-10"></div>
        <div className="relative z-10">
          🕌 <strong>Your Sadaqah Changes Lives</strong> - Donate today and earn endless rewards
        </div>
      </div>

      {/* Top Contact Bar */}
      <div className="hidden lg:block border-b bg-gradient-to-r from-emerald-50 to-green-50/80 text-sm">
        <div className="container mx-auto py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link 
              href={callLink} 
              className="flex items-center gap-2 hover:text-emerald-600 transition-all duration-300 group"
            >
              <div className="p-1.5 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                <Phone className="h-3.5 w-3.5 text-emerald-700" />
              </div>
              <span className="font-medium text-gray-700">{displayNumber}</span>
            </Link>
            
            <Link 
              href={`mailto:${email}`} 
              className="flex items-center gap-2 hover:text-emerald-600 transition-all duration-300 group"
            >
              <div className="p-1.5 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                <Mail className="h-3.5 w-3.5 text-emerald-700" />
              </div>
              <span className="font-medium text-gray-700">{email}</span>
            </Link>
            
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-emerald-100 rounded-lg">
                <MapPin className="h-3.5 w-3.5 text-emerald-700" />
              </div>
              <span className="font-medium text-gray-700">{location}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {socialLinks.map((social:any) => (
              <Link
                key={social.name}
                href={social.href}
                className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md hover:scale-110 transition-all duration-300 border border-gray-100"
                aria-label={social.name}
              >
                <social.icon className="h-3.5 w-3.5 text-emerald-700" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-lg supports-[backdrop-filter]:bg-white/90 shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div className="flex-1 md:flex-none">
              <Link href="/" className="flex items-center gap-3 group mt-3">
                <div className="relative">
                  <Image 
                    src={brandlogo.logo} 
                    width={160} 
                    height={140} 
                    quality={100}
                    alt="As Nusra Foundation Logo"
                    className="transition-transform duration-300 group-hover:scale-105 -ml-3 md:ml-0 w-36 h-32"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 mx-8">
              {navItems?.bn.map((item:NavItem) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 rounded-xl font-medium transition-all duration-300 group",
                    pathname === item.href
                      ? "text-emerald-700 "
                      : "text-gray-700 hover:text-emerald-600 "
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4 flex-1 justify-end">
              
              {/* Donate Button */}
              <Link
                href="/donate"
                className="hidden sm:flex items-center gap-2 bg-primary hover:from-amber-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
              >
                <Heart className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>দান করুন</span>
              </Link>

              {/* User Actions */}
              <div className="flex items-center gap-2">
                
                {/* Login Button */}
                {/* <Link
                  href="/auth/signin"
                  className="hidden sm:flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-medium shadow-sm hover:shadow transition-all duration-300 group"
                >
                  <LogIn className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span>Login</span>
                </Link> */}

                {/* User Icon */}
                <Link
                  href="/auth/signin"
                  className="hidden md:flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-100 to-green-100 hover:from-emerald-200 hover:to-green-200 border-2 border-emerald-200 rounded-xl shadow-sm hover:shadow transition-all duration-300 group relative overflow-hidden"
                  aria-label="User Account"
                >
                  <User className="h-5 w-5 text-emerald-700 group-hover:scale-110 transition-transform" />
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Pulse animation */}
                  <div className="absolute inset-0 border-2 border-emerald-300 rounded-xl opacity-0 group-hover:opacity-100 animate-ping"></div>
                </Link>
              </div>

              {/* Mobile Menu */}
              <div className="lg:hidden">
                <NavDrawer />
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Navigation for Donation Types */}
        {/* <div className="hidden lg:block border-t border-gray-100 bg-white/80">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-6 py-3 overflow-x-auto">
              {[
                "Zakat", "Sadaqah", "Emergency Aid", "Education", 
                "Winter Relief", "Qurbani", "Iftar Program"
              ].map((type) => (
                <Link
                  key={type}
                  href={`/donate/${type.toLowerCase().replace(' ', '-')}`}
                  className="text-xs font-medium text-gray-600 hover:text-emerald-600 whitespace-nowrap transition-colors duration-200 relative group"
                >
                  {type}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>
          </div>
        </div> */}
      </header>
    </>
  );
};

export default Navbar;