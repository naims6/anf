"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { locale, setLocale } = useLanguage();

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "bn" : "en";
    setLocale(newLocale);
  };

  const isBengali = locale === "bn";

  return (
    <button
      onClick={toggleLanguage}
      className="relative w-24 h-10 flex items-center rounded-full border border-gray-300 bg-gray-100 p-1 cursor-pointer transition-all duration-300 hover:shadow-lg focus:outline-none"
      aria-label={`Switch to ${locale === "en" ? "Bengali" : "English"}`}
    >
      <span
        className={`absolute top-1 w-8 h-8 bg-white rounded-full shadow-md transition-all duration-300 ${
          isBengali ? "translate-x-12" : "translate-x-0"
        }`}
      />
      <span className="relative z-10 w-full flex justify-between px-2 text-[12px] font-bold text-gray-700 select-none">
        <span className="text-emerald-700">বাং</span>
        <span className="text-emerald-700">EN</span>
      </span>
    </button>
  );
};

export default LanguageToggle;
