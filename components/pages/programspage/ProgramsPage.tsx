"use client";

import React from 'react';
import { 
  BookOpen, 
  HeartPulse, 
  Briefcase, 
  Leaf, 
  Droplets, 
  Users,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import enProgramsMessages from '@/messages/en/programs.json';
import bnProgramsMessages from '@/messages/bn/programs.json';

const ProgramsPage = () => {
  const { locale } = useLanguage();
  
  // Get translations based on current locale
  const t = locale === 'bn' ? bnProgramsMessages.Programs : enProgramsMessages.Programs;
  const programs = t.programsList.map((prog, index) => ({
    id: index + 1,
    title: prog.title,
    description: prog.description,
    icon: [BookOpen, Briefcase, HeartPulse, Droplets, Leaf, Users][index],
    color: [
      "bg-blue-50 text-blue-600", 
      "bg-orange-50 text-orange-600", 
      "bg-red-50 text-red-600", 
      "bg-sky-50 text-sky-600", 
      "bg-green-50 text-green-600", 
      "bg-purple-50 text-purple-600"
    ][index],
    link: [
      "/programs/education",
      "/programs/self-reliance",
      "/programs/health",
      "/programs/water",
      "/programs/environment",
      "/programs/relief"
    ][index]
  })).map(prog => ({
    ...prog,
    icon: React.createElement(prog.icon, { className: "w-8 h-8" })
  }));

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-50 py-16 md:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 
            className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6"
            dangerouslySetInnerHTML={{ __html: t.heroTitle }}
          />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs?.map((program) => (
            <div 
              key={program.id}
              className="group p-8 rounded-3xl border border-gray-100 bg-white hover:border-green-200 hover:shadow-2xl hover:shadow-green-100 transition-all duration-300 flex flex-col items-start"
            >
              {/* Icon Container */}
              <div className={`p-4 rounded-2xl mb-6 transition-transform group-hover:scale-110 duration-300 ${program.color}`}>
                {program.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-700 transition-colors">
                {program.title}
              </h3>

              <p className="text-gray-600 leading-relaxed mb-6">
                {program.description}
              </p>

              <Link 
                href={program.link}
                className="mt-auto flex items-center font-semibold text-green-600 hover:text-green-700 transition-all group/link"
              >
                {t.learnMore}
                <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Section / Call to Action */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto bg-green-600 rounded-[2.5rem] p-8 md:p-16 text-center text-white shadow-xl shadow-green-100">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">
            {t.partnerWithUs}
          </h2>
          <p className="text-green-50 mb-10 text-lg opacity-90">
            {t.donationText}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg active:scale-95">
              {t.donateNow}
            </button>
            <button className="bg-green-700 border border-green-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-800 transition-all active:scale-95">
              {t.volunteer}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramsPage;