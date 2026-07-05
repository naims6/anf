
'use client';

import React, { useState } from 'react';
import { GraduationCap, HeartHandshake, MessageCircle, HandCoins, Palette, Shield, ArrowRight, Target, CheckCircle2, Users, Clock, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionHeader from '@/components/shared/SectionHeader/SectionHeader';
import { useLanguage } from '@/contexts/LanguageContext';
import enHomepageMessages from '@/messages/en/homepage.json';
import bnHomepageMessages from '@/messages/bn/homepage.json';

// Remove the hardcoded services array and replace with helper data
const serviceIcons = [GraduationCap, HeartHandshake, MessageCircle, HandCoins, Palette];
const serviceGradients = [
  'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
  'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
  'linear-gradient(135deg, #A855F7 0%, #7E22CE 100%)',
  'linear-gradient(135deg, #F43F5E 0%, #BE123C 100%)'
];
const serviceColors = [
  { bg: 'bg-blue-500/5', border: 'border-blue-500/20' },
  { bg: 'bg-emerald-500/5', border: 'border-emerald-500/20' },
  { bg: 'bg-amber-500/5', border: 'border-amber-500/20' },
  { bg: 'bg-purple-500/5', border: 'border-purple-500/20' },
  { bg: 'bg-rose-500/5', border: 'border-rose-500/20' }
];

export default function ServiceSection() {
  const { locale } = useLanguage();
  const [activeCard, setActiveCard] = useState<number | null>(null);
  
  // Get translations based on current locale
  const t = locale === 'bn' ? bnHomepageMessages.HomePage.ServiceSection : enHomepageMessages.HomePage.ServiceSection;
  const services = t.services;

  return (
    <section className="relative overflow-hidden py-10 bg-linear-to-b from-white via-emerald-50/20 to-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-linear-to-br from-blue-100/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-linear-to-tr from-amber-100/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-linear-to-r from-emerald-100/30 to-transparent rounded-full blur-3xl" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0001_1px,transparent_1px),linear-gradient(to_bottom,#0001_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header  */}
        <SectionHeader
          badgeText={t.badgeText}
          title={t.title}
          subtitle={t.subtitle}
          description={t.description}
          icon={Shield}
        />

        {/* Interactive Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {services?.map((service, index) => (
            <div
              key={index}
              className="relative group "
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Card Container with Glass Effect */}
              <div
                className={` relative h-full rounded-xl overflow-hidden bg-white/80 backdrop-blur-xl border hover:border-primary/70 shadow-lg shadow-gray-200/50 transition-all duration-500 ease-out ${activeCard === index ? 'scale-105 shadow-2xl shadow-emerald-200/30' : ''} ${serviceColors[index].bg} `}>

                {/* Card Content */}
                <div className="relative p-8 h-full flex flex-col">
                  {/* Icon */}
                  <div className="relative mb-4">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 ${activeCard === index ? 'rotate-15' : ''}`}
                      style={{ background: serviceGradients[index] }}
                    >
                      {React.createElement(serviceIcons[index], { className: "w-10 h-10 text-white" })}
                    </div>

                    {/* Floating Badge */}
                    <div className="absolute top-0 right-0">
                      <div className={`px-3 py-1.5 rounded-full text-xs font-semibold ${serviceColors[index].border.replace('border-', 'bg-').replace('/20', '/10')} border ${serviceColors[index].border}`}>
                        {service.stats}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 font-bangla">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-2 leading-relaxed grow font-bangla">
                    {service.description}
                  </p>

                  {/* Projects List */}
                  <div className="space-y-3 mb-4">
                    {service.projects.map((project, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-2 transition-all duration-300 opacity-100 translate-x-0`}
                        style={{ transitionDelay: `${idx * 100}ms` }}
                      >
                        <CheckCircle2 className={`w-4 h-4 ${serviceColors[index].border.replace('border-', 'text-')}`} />
                        <span className="text-sm text-gray-700 font-bangla">{project}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100 ">
                    <span className={`text-sm font-semibold group-hover:text-emerald-600 font-bangla `}>
                      {locale === 'bn' ? 'বিস্তারিত দেখুন' : 'View Details'}
                    </span>
                    <div
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent text-inherit transition-all duration-300 ease-in-out group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-110"
                    >
                      <ArrowRight className="w-5 h-5 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Particles */}
              {activeCard === index && (
                <>
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        background: serviceGradients[index].split(' ')[2],
                        animationDelay: `${i * 100}ms`
                      }}
                    />
                  ))}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Impact Stats Section */}
        <div className="mb-10">
          <div className="backdrop-blur-sm rounded-3xl border border-gray-200/50 p-8 ">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {t.stats.map((stat, idx) => {
                const colors = ['text-blue-600', 'text-emerald-600', 'text-amber-600', 'text-purple-600'];
                const color = colors[idx] || 'text-gray-600';
                const icons = [Target, Users, Clock, Globe];
                const IconComponent = icons[idx] || Target;
                
                return (
                  <div
                    key={idx}
                    className="text-center transition-transform duration-300 hover:scale-105"
                  >
                    <div className={`w-16 h-16 rounded-2xl ${color.replace('text-', 'bg-').replace('600', '50')} flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className={`w-8 h-8 ${color}`} />
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-gray-600 font-bangla">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="relative">
            <div className="absolute rounded-3xl blur-xl opacity-20" />
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-200/50 p-12 shadow-xl">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-bangla">
                {t.ctaTitle}
              </h3>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto font-bangla">
                {t.ctaDescription}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="transition-transform duration-300 hover:scale-105 active:scale-95">
                  <Button
                    // size="lg"
                    className='py-7.5 rounded-2xl'
                  >
                    <span>{t.ctaButton1}</span>
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </div>

                <div className="transition-transform duration-300 hover:scale-105 active:scale-95">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-10 py-7 text-xl font-semibold rounded-2xl transition-all duration-300 font-bangla"
                  >
                    {t.ctaButton2}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}