"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { brandlogo } from "@/utils/assets";
import Image from "next/image";
import { SiteConfig } from "@/config/siteConfig";
import NavDrawer from "./NavDrawer";
import AuthSheet from "./AuthSheet";
import UserMenu from "./UserMenu";
import { NavItem } from "@/types/siteConfigType";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "next-intl";
import { useAuth } from "@/hooks/useAuth";

const { navItems } = SiteConfig;

const Navbar = () => {
  const pathname = usePathname();
  const { locale } = useLanguage();
  const t = useTranslations("Navbar");
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-lg supports-backdrop-filter:bg-background/90 shadow-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
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

          <nav className="hidden lg:flex items-center gap-1 mx-8">
            {navItems?.[locale]?.map((item: NavItem) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 rounded-xl font-medium transition-all duration-300 group",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 flex-1 justify-end">
            <LanguageToggle />

            <Link
              href="/donate"
              className="hidden sm:flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-primary/90 transition-all duration-300"
            >
              <Heart className="h-4 w-4" />
              <span>{t("donate")}</span>
            </Link>

            {isAuthenticated ? <UserMenu /> : <AuthSheet />}

            <div className="lg:hidden">
              <NavDrawer />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
