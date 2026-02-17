"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronUp, Facebook, Youtube, Linkedin } from "lucide-react";

export function FloatingActionButton() {
  const [isVisible, setIsVisible] = useState(false);

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://www.facebook.com/people/An-Nusra-Foundation/61577276277737/",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "YouTube",
      icon: Youtube,
      href: "#",
      color: "bg-red-600 hover:bg-red-700",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "#",
      color: "bg-blue-500 hover:bg-blue-600",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed right-5 bottom-40 md:bottom-20 z-50 flex flex-col items-center gap-4">
      {/* Static Social Media Icons - Always Visible */}
      <div className="flex flex-col gap-3">
        {socialLinks.map((social, index) => {
          const Icon = social.icon;
          return (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                animationDelay: `${index * 100}ms`
              }}
              className={`
                w-10 h-10 rounded-xl flex items-center justify-center
                text-white shadow-lg hover:shadow-xl
                transition-all duration-300 hover:scale-110
                border border-white/20
                animate-float
                ${social.color}
              `}
              aria-label={social.name}
            >
              <Icon className="h-5 w-5" />
            </Link>
          );
        })}
      </div>

      {/* Scroll to Top Button - Smooth appear/disappear */}
      <div className={`
        transition-all duration-500 ease-out
        ${isVisible 
          ? "opacity-100 translate-y-0 scale-100" 
          : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }
      `}>
        <button
          onClick={scrollToTop}
          className=" mt-20
            w-10 h-10 rounded-xl flex items-center justify-center
            bg-primary text-white shadow-lg hover:shadow-xl
            transition-all duration-300 hover:scale-110
            border border-amber-300/50
            animate-pulse-slow
          "
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5 " />
        </button>
      </div>
    </div>
  );
}