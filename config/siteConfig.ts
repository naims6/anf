
import { SiteConfigType } from "@/types/siteConfigType";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";


export const SiteConfig: any = {
  authorName: "Abul Kashem Fazlul Haque",
  brandName: "As Nusra Foundation",
  url: "https://annusrafoundation.com",
  email: "annusrafoundation@gmail.com",
  description: "আন-নুসরা ফাউন্ডেশন একটি অলাভজনক ইসলামি সেবামূলক প্ল্যাটফর্ম, যা যাকাত, সদকাহ, জরুরি ত্রাণ সহায়তা এবং শিক্ষা তহবিলের মতো বিভিন্ন চ্যারিটি কার্যক্রম পরিচালনার মাধ্যমে মানবতার সেবায় নিয়োজিত।",
  displayNumber: "+880 1817-536363",
  callLink: "tel:+01817536363",
  whatsappLink: "https://wa.me/8801817536363",
  location: "Dhaka, Bangladesh, 1207",
  city: "Dhaka",
  country: "Bangladesh",
  // navItems: [
  //   { name: "Home", href: "/" },
  //   { name: "Activities", href: "/activities" },
  //   { name: "Programs", href: "/programs" },
  //   { name: "About", href: "/about" },
  //   { name: "Contact", href: "/contact" },
  //   { name: "Blog", href: "/blog" },
  //   { name: "Donate", href: "/donate" }
  // ],
  navItems: {
    en:[
    { name: "Home", href: "/" },
    { name: "Activities", href: "/activities" },
    { name: "Programs", href: "/programs" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
    { name: "Donate", href: "/donate" }
  ],
  bn:[
    { name: "হোম", href: "/" },
    { name: "কার্যক্রমসমূহ", href: "/activities" },
    { name: "প্রোগাম", href: "/programs" },
    { name: "আমাদের সম্পর্কে", href: "/about" },
    { name: "যোগাযোগ", href: "/contact" },
    { name: "ব্লগ", href: "/blog" },
    { name: "দান করুণ", href: "/donate" }
  ]
  },
  footerhrefs: [
    { title: "About Us", href: "/about" },
    { title: "Contact", href: "/contact" },
    { title: "Blog", href: "/blog" },
    { title: "Privacy Policy", href: "/privacy" },
    { title: "sitemap", href: "/sitemap.xml" },
  ],

  socialLinks: [
    { name: "Facebook", icon: Facebook, href: "/facebook.com" },
    { name: "Instagram", icon: Instagram, href: "/instagram.com" },
    { name: "Twitter", icon: Twitter, href: "/twitter.com" },
    { name: "YouTube", icon: Youtube, href: "/youtube.com" },
  ],
  contactLinks: [
    { name: "Map", icon: MapPin, href: "/facebook.com" },
    { name: "Phone", icon: Phone, href: "/instagram.com" },
    { name: "Email", icon: Mail, href: "/twitter.com" },
  ]

}

