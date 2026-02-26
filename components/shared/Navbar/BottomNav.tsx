"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Phone, MessageCircle, } from "lucide-react";
import { cn } from "@/lib/utils";
import { SiteConfig } from "@/config/siteConfig";

interface BottomNavProps {
  className?: string;
}

export function BottomNav({ className }: BottomNavProps) {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState(pathname);
  const { callLink, whatsappLink, displayNumber } = SiteConfig;

  const menuItems = [
    {
      name: "Call",
      href: callLink,
      icon: Phone,
      type: "action",
      color: "emerald"
    },
    {
      name: "Donate",
      href: "/donate",
      icon: Heart,
      type: "link",
      color: "rose",
      special: true
    },
    {
      name: "Chat",
      href: whatsappLink,
      icon: MessageCircle,
      type: "action",
      color: "green"
    }
  ];

  const handleItemClick = (href: string) => {
    setActiveItem(href);
  };

  const colorMap = {
    emerald: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-700",
      icon: "text-emerald-600",
      hover: "hover:bg-emerald-100",
      gradient: "from-emerald-500 to-green-500"
    },
    rose: {
      bg: "bg-rose-50",
      border: "border-rose-200",
      text: "text-rose-700",
      icon: "text-rose-600",
      hover: "hover:bg-rose-100",
      gradient: "from-rose-500 to-pink-500"
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-700",
      icon: "text-green-600",
      hover: "hover:bg-green-100",
      gradient: "from-green-500 to-emerald-500"
    }
  };

  return (
    <>
      {/* Spacer for fixed bottom nav */}
      <div className="h-24 md:hidden" />

      {/* Bottom Navigation Container */}
      <nav className={cn(
        "fixed bottom-0 left-0 right-0 z-50 md:hidden",
        "h-24",
        "bg-white/95 backdrop-blur-sm",
        "border-t border-gray-100",
        "shadow-lg",
        className
      )}>
        {/* Inner Container */}
        <div className="relative h-full flex items-center justify-between px-4">

          {/* Left Button - Call */}
          <div className="relative w-20">
            <Link
              href={callLink}
              className="group flex flex-col items-center justify-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* Button Container */}
              <div className={cn(
                "relative w-14 h-14 rounded-2xl",
                colorMap.emerald.bg,
                colorMap.emerald.border,
                "border-2 flex flex-col items-center justify-center",
                "transition-all duration-300",
                colorMap.emerald.hover,
                "group-hover:shadow-md"
              )}>
                {/* Icon */}
                <div className={cn(
                  "p-2 rounded-lg",
                  colorMap.emerald.bg,
                  "border border-emerald-100",
                  "group-hover:border-emerald-200",
                  "transition-all duration-300"
                )}>
                  <Phone className={cn(
                    "w-6 h-6",
                    colorMap.emerald.icon
                  )} />
                </div>
              </div>

              {/* Label */}
              <span className={cn(
                "text-xs font-semibold",
                colorMap.emerald.text
              )}>
                Call Now
              </span>
            </Link>
          </div>

          {/* Center - Special Donate Button */}
          <div className="relative -mt-8">

            {/* Main Donate Button */}
            <Link
              href="/donate"
              onClick={() => handleItemClick("/donate")}
              className="group block"
            >
              {/* Button Container */}
              <div className="relative">
                {/* Gradient Border Container */}
                <div className={cn(
                  "absolute -inset-1 rounded-3xl",
                  "bg-primary/10",
                  "opacity-20 group-hover:opacity-30",
                  "transition-opacity duration-300"
                )} />

                {/* Main Button */}
                <div className={cn(
                  "relative w-24 h-24 rounded-3xl",
                  "bg-primary/20",
                  "border-2 border-primary",
                  "flex flex-col items-center justify-center p-4",
                  "group-hover:border-primary",
                  "group-hover:shadow-lg",
                  "transition-all duration-300"
                )}>
                  {/* Icon Container */}
                  <div className="relative mb-2">
                    {/* Icon Background */}
                    <div className={cn(
                      "w-16 h-16 rounded-2xl",
                      "bg-primary",
                      "flex items-center justify-center",
                      "shadow-lg",
                      "group-hover:shadow-xl",
                      "transition-all duration-300"
                    )}>
                      <Heart className="w-8 h-8 text-white" />

                      {/* Sparkle Icon */}
                      {/* <div className="absolute -top-1 -right-1">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                      </div> */}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="text-center">
                    <div className={cn(
                      "text-sm font-bold",
                      "bg-primary",
                      "bg-clip-text text-transparent"
                    )}>
                      DONATE
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Right Button - WhatsApp */}
          <div className="relative w-20">
            <Link
              href={whatsappLink}
              className="group flex flex-col items-center justify-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* Button Container */}
              <div className={cn(
                "relative w-14 h-14 rounded-2xl",
                colorMap.green.bg,
                colorMap.green.border,
                "border-2 flex flex-col items-center justify-center",
                "transition-all duration-300",
                colorMap.green.hover,
                "group-hover:shadow-md"
              )}>
                {/* Icon */}
                <div className={cn(
                  "p-2 rounded-lg",
                  colorMap.green.bg,
                  "border border-green-100",
                  "group-hover:border-green-200",
                  "transition-all duration-300"
                )}>
                  <MessageCircle className={cn(
                    "w-6 h-6",
                    colorMap.green.icon
                  )} />
                </div>
              </div>

              {/* Label */}
              <span className={cn(
                "text-xs font-semibold",
                colorMap.green.text
              )}>
                WhatsApp
              </span>
            </Link>
          </div>
        </div>

        {/* Decorative Bottom Line */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-1 bg-linear-to-r from-emerald-500 via-rose-500 to-green-500" />
        </div>

        {/* Corner Accents */}
        <div className="absolute bottom-4 left-4 w-3 h-3 border-l-2 border-b-2 border-emerald-200 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-3 h-3 border-r-2 border-b-2 border-green-200 rounded-br-lg" />
      </nav>
    </>
  );
}