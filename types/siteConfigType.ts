import type { LucideIcon } from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
}

export interface FooterLink {
  title: string;
  href: string;
}

export interface SocialLink {
  name: string;
  icon: LucideIcon;
  href: string;
}

export interface ContactLink {
  name: string;
  icon: LucideIcon;
  href: string;
}

export interface SiteConfigType {
  authorName: string;
  brandName: string;
  url: string;
  email: string;
  description: string;
  displayNumber: string;
  callLink: string;
  whatsappLink: string;
  location: string;
  city: string;
  country: string;

  /** ✅ FIXED */
  navItems: {
    en: NavItem[];
    bn: NavItem[];
  };

  footerhrefs: FooterLink[];
  socialLinks: SocialLink[];
  contactLinks: ContactLink[];
}
