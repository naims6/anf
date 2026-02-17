// 'use client';

// import { Heart, Users, Target, Briefcase, ChevronRight, Star } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// const involvementOptions = [
//     {
//         id: 1,
//         title: 'নিয়মিত দাতা',
//         description: 'মাসিক/বাৎসরিক অনুদানের মাধ্যমে আমাদের স্থায়ী সেবার অংশীদার হোন',
//         icon: Heart,
//         color: 'bg-gradient-to-br from-rose-500 to-pink-500',
//         stats: '৫০০+ নিয়মিত দাতা',
//         features: ['মাসিক অনুদান', 'স্বয়ংক্রিয় পেমেন্ট', 'আপডেট রিপোর্ট'],
//         cta: 'দাতা হোন'
//     },
//     {
//         id: 2,
//         title: 'আজীবন সদস্য',
//         description: 'আজীবন সদস্যপদের মাধ্যমে স্থায়ীভাবে মানবসেবার অংশীদার হোন',
//         icon: Users,
//         color: 'bg-gradient-to-br from-emerald-500 to-green-500',
//         stats: '২০০+ আজীবন সদস্য',
//         features: ['বিশেষ প্রিভিলেজ', 'নাম অন্তর্ভুক্তি', 'অনুষ্ঠানে আমন্ত্রণ'],
//         cta: 'সদস্য হোন'
//     },
//     {
//         id: 3,
//         title: 'স্বেচ্ছাসেবক',
//         description: 'আপনার সময় ও শ্রম দিয়ে সরাসরি মানবসেবার কাজে অংশ নিন',
//         icon: Target,
//         color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
//         stats: '১০০০+ স্বেচ্ছাসেবক',
//         features: ['ফিল্ড ভলান্টিয়ার', 'অনলাইন সুযোগ', 'প্রশিক্ষণ'],
//         cta: 'যোগদান করুন'
//     },
//     {
//         id: 4,
//         title: 'ক্যারিয়ার',
//         description: 'আমাদের টিমের অংশ হয়ে পেশাদারি দক্ষতা নিয়ে মানবসেবায় যুক্ত হোন',
//         icon: Briefcase,
//         color: 'bg-gradient-to-br from-amber-500 to-orange-500',
//         stats: '৫০+ কর্মী',
//         features: ['ফুলটাইম চাকরি', 'ইন্টার্নশিপ', 'প্রজেক্ট ভিত্তিক'],
//         cta: 'ক্যারিয়ার দেখুন'
//     }
// ];

// const stats = [
//     { value: '৫০,০০০+', label: 'সেবাপ্রাপ্ত মানুষ' },
//     { value: '২৫+', label: 'সক্রিয় প্রকল্প' },
//     { value: '১,৭৫০+', label: 'নিবেদিত স্বেচ্ছাসেবক' },
//     { value: '১০+', label: 'জেলায় কার্যক্রম' }
// ];

// export default function GetInvolved() {
//     return (
//         <section className="relative py-10 bg-white">
//             {/* Background Decorative Elements */}
//             <div className="absolute inset-0 overflow-hidden pointer-events-none">
//                 <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-50/30 rounded-full blur-3xl" />
//                 <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-50/30 rounded-full blur-3xl" />

//                 {/* Minimal Grid Pattern */}
//                 <div
//                     className="absolute inset-0 opacity-5"
//                     style={{
//                         backgroundImage: `linear-gradient(90deg, transparent 95%, #000 100%)`,
//                         backgroundSize: '40px 40px'
//                     }}
//                 />
//             </div>

//             <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
//                 {/* Section Header - Minimal */}
//                 <div className="text-center mb-8">
//                     {/* Simple Badge */}
//                     <div className="inline-flex items-center gap-2 bg-emerald-50 rounded-full px-4 py-2 mb-6">
//                         <div className="w-2 h-2 bg-emerald-500 rounded-full" />
//                         <span className="text-emerald-700 font-semibold text-sm font-bangla">
//                             যুক্ত হোন আমাদের সাথে
//                         </span>
//                     </div>

//                     {/* Elegant Title */}
//                     <div className="max-w-4xl mx-auto">
//                         <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-bangla leading-tight">
//                             <span className="block mb-3">মানবতার সেবায়</span>
//                             <span className="relative inline-block">
//                                 <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 bg-clip-text text-transparent">
//                                     আপনার ভূমিকা রাখুন
//                                 </span>
//                                 <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />
//                             </span>
//                         </h2>

//                         <p className="text-lg text-gray-600 font-bangla leading-relaxed max-w-2xl mx-auto">
//                             আপনার সময়, দক্ষতা অথবা আর্থিক সহায়তা দ্বারা আমাদের কার্যক্রমকে আরও বেগবান করুন
//                         </p>
//                     </div>
//                 </div>

//                 {/* Stats Bar - Clean Design */}
//                 <div className="mb-8">
//                     <div className="bg-gradient-to-r from-emerald-50/50 to-blue-50/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-100">
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//                             {stats.map((stat, index) => (
//                                 <div key={index} className="text-center">
//                                     <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-bangla">
//                                         {stat.value}
//                                     </div>
//                                     <div className="text-gray-600 font-bangla text-sm">
//                                         {stat.label}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Involvement Options - Modern Card Design */}
//                 <div className="mb-10">
//                     <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
//                         {involvementOptions.map((option) => {
//                             const Icon = option.icon;

//                             return (
//                                 <div
//                                     key={option.id}
//                                     className="group relative"
//                                 >
//                                     {/* Card Container */}
//                                     <div className="
//                     relative h-full bg-white rounded-2xl border border-gray-100
//                     shadow-lg hover:shadow-xl transition-all duration-300
//                     hover:-translate-y-1 overflow-hidden
//                   ">
//                                         {/* Color Accent */}
//                                         <div className={`absolute top-0 left-0 right-0 h-1.5 ${option.color}`} />

//                                         {/* Card Content */}
//                                         <div className="p-8">
//                                             {/* Header with Icon */}
//                                             <div className="flex flex-col items-start gap-6 mb-6">
//                                                 <div className='flex justify-between'>
//                                                     <div className={`
//                           relative flex-shrink-0 w-14 h-14 rounded-xl
//                           ${option.color} flex items-center justify-center
//                           shadow-lg
//                         `}>
//                                                         <Icon className="w-7 h-7 text-white" />
//                                                         {/* Subtle Glow */}

//                                                         <div className="absolute inset-0 rounded-xl bg-white/10" />

//                                                     </div>
//                                                     <div className="
//                               px-3 py-1 rounded-full text-xs font-semibold
//                               bg-gray-100 text-gray-700 font-bangla
//                             ">
//                                                         {option.stats}
//                                                     </div>

//                                                 </div>

//                                                 <div className="flex-grow">
//                                                     <div className="flex items-center justify-between mb-2">
//                                                         <h3 className="text-xl font-bold text-gray-900 font-bangla">
//                                                             {option.title}
//                                                         </h3>
//                                                         {/* <div className="
//                               px-3 py-1 rounded-full text-xs font-semibold
//                               bg-gray-100 text-gray-700 font-bangla
//                             ">
//                               {option.stats}
//                             </div> */}
//                                                     </div>

//                                                     <p className="text-gray-600 font-bangla leading-relaxed">
//                                                         {option.description}
//                                                     </p>
//                                                 </div>
//                                             </div>

//                                             {/* Features List - Compact */}
//                                             <div className="mb-8">
//                                                 <div className="flex flex-wrap gap-3">
//                                                     {option.features.map((feature, idx) => (
//                                                         <div
//                                                             key={idx}
//                                                             className="
//                                 px-3 py-1.5 rounded-full text-sm
//                                 bg-gray-50 text-gray-700 font-bangla
//                                 border border-gray-100
//                               "
//                                                         >
//                                                             {feature}
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             </div>

//                                             {/* Action Button */}
//                                             <div className="flex items-center justify-between pt-6 border-t border-gray-100">
//                                                 <span className="text-emerald-600 font-semibold font-bangla">
//                                                     বিস্তারিত জানুন
//                                                 </span>
//                                                 <Button
//                                                     className={`
//                             group/btn relative overflow-hidden
//                             bg-white hover:bg-gray-50 text-gray-900
//                             border border-gray-200 hover:border-gray-300
//                             px-6 py-2.5 font-bangla font-medium
//                             transition-all duration-300
//                           `}
//                                                 >
//                                                     <span>{option.cta}</span>
//                                                     <ChevronRight className="
//                             w-4 h-4 ml-2
//                             group-hover/btn:translate-x-1
//                             transition-transform duration-300
//                           " />
//                                                 </Button>
//                                             </div>
//                                         </div>

//                                         {/* Hover Effect Overlay */}
//                                         <div className="
//                       absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/0 to-emerald-500/0
//                       group-hover:from-emerald-500/5 group-hover:to-emerald-500/5
//                       transition-all duration-500 pointer-events-none
//                     " />
//                                     </div>

//                                     {/* Subtle Background Glow on Hover */}
//                                     <div className="
//                     absolute inset-0 rounded-2xl
//                     bg-gradient-to-br from-emerald-500/0 to-green-500/0
//                     group-hover:from-emerald-500/10 group-hover:to-green-500/10
//                     blur-xl transition-all duration-500 -z-10
//                     opacity-0 group-hover:opacity-100
//                   " />
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>

//                 {/* CTA Section - Clean & Bold */}
//                 <div className="relative">
//                     <div className="
//             bg-gradient-to-r from-emerald-50 to-blue-50
//             rounded-2xl p-8 md:p-12 text-center
//             border border-gray-100
//           ">
//                         {/* Star Icon Decoration */}
//                         <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full mb-6 shadow-lg">
//                             <Star className="w-6 h-6 text-emerald-600" />
//                         </div>

//                         <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-bangla">
//                             শুরু করুন আজই
//                         </h3>

//                         <p className="text-gray-600 mb-8 max-w-2xl mx-auto font-bangla">
//                             আপনার একটি সিদ্ধান্ত অনেক মানুষের জীবন বদলে দিতে পারে
//                         </p>

//                         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                             <Button
//                                 size="lg"
//                                 className="
//                   group bg-gradient-to-r from-emerald-500 to-green-600
//                   hover:from-emerald-600 hover:to-green-700 text-white
//                   px-8 py-6 text-lg font-semibold rounded-xl
//                   shadow-lg hover:shadow-xl transition-all duration-300 font-bangla
//                 "
//                             >
//                                 <span>অনুদান করুন</span>
//                                 <ChevronRight className="
//                   w-5 h-5 ml-2
//                   group-hover:translate-x-1
//                   transition-transform duration-300
//                 " />
//                             </Button>

//                             <Button
//                                 variant="outline"
//                                 size="lg"
//                                 className="
//                   border-2 border-emerald-500 text-emerald-600
//                   hover:bg-emerald-50 px-8 py-6 text-lg font-semibold
//                   rounded-xl font-bangla transition-all duration-300
//                 "
//                             >
//                                 যোগাযোগ করুন
//                             </Button>
//                         </div>

//                         {/* Subtle Bottom Pattern */}
//                         <div className="
//               absolute bottom-0 left-0 right-0 h-px
//               bg-gradient-to-r from-transparent via-emerald-200 to-transparent
//             " />
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }


'use client';

import { Heart, Users, Target, Briefcase, Star, Shield, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const involvementOptions = [
  {
    id: 1,
    title: 'নিয়মিত দাতা',
    description: 'মাসিক/বাৎসরিক অনুদানের মাধ্যমে আমাদের স্থায়ী সেবার অংশীদার হোন',
    icon: Heart,
    // color: 'from-rose-500 to-pink-500',
    // bgColor: 'bg-rose-50',
    // borderColor: 'border-rose-200',
      color: 'from-emerald-500 to-green-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    features: ['মাসিক অনুদান', 'বাৎসরিক প্ল্যান', 'স্বয়ংক্রিয় পেমেন্ট', 'আপডেট রিপোর্ট'],
    stats: '৫০০+ নিয়মিত দাতা'
  },
  {
    id: 2,
    title: 'আজীবন ও দাতা সদস্য',
    description: 'আজীবন সদস্যপদের মাধ্যমে স্থায়ীভাবে মানবসেবার অংশীদার হোন',
    icon: Users,
    color: 'from-emerald-500 to-green-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    features: ['আজীবন মেম্বারশিপ', 'বিশেষ প্রিভিলেজ', 'নাম অন্তর্ভুক্তি', 'অনুষ্ঠানে আমন্ত্রণ'],
    stats: '২০০+ আজীবন সদস্য'
  },
  {
    id: 3,
    title: 'স্বেচ্ছাসেবক',
    description: 'আপনার সময় ও শ্রম দিয়ে সরাসরি মানবসেবার কাজে অংশ নিন',
    icon: Target,
    // color: 'from-blue-500 to-cyan-500',
    // bgColor: 'bg-blue-50',
    // borderColor: 'border-blue-200',
      color: 'from-emerald-500 to-green-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    features: ['ফিল্ড ভলান্টিয়ার', 'অনলাইন স্বেচ্ছাসেবক', 'বিশেষ দক্ষতা', 'প্রশিক্ষণ সুযোগ'],
    stats: '১০০০+ স্বেচ্ছাসেবক'
  },
  {
    id: 4,
    title: 'ক্যারিয়ার',
    description: 'আমাদের টিমের অংশ হয়ে পেশাদারি দক্ষতা নিয়ে মানবসেবায় যুক্ত হোন',
    icon: Briefcase,
    // color: 'from-amber-500 to-orange-500',
    // bgColor: 'bg-amber-50',
    // borderColor: 'border-amber-200',
      color: 'from-emerald-500 to-green-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    features: ['ফুলটাইম চাকরি', 'পার্টটাইম চাকরি', 'ইন্টার্নশিপ', 'প্রজেক্ট ভিত্তিক'],
    stats: '৫০+ কর্মী'
  }
];

export default function GetInvolved() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="relative py-10 bg-gradient-to-b from-white via-emerald-50/5 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-br from-rose-100/30 to-pink-100/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-tr from-emerald-100/30 to-blue-100/20 rounded-full blur-3xl" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />

        {/* Floating Elements */}
        <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-emerald-400/30 rounded-full animate-bounce" />
        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-rose-400/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-blue-400/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          {/* Decorative Badge */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-white/80 to-emerald-50/80 backdrop-blur-sm rounded-2xl px-6 py-3 border border-emerald-200/50 mb-8 shadow-sm">
            <div className="relative">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <div className="absolute inset-0 bg-emerald-400/30 rounded-full animate-ping" />
            </div>
            <span className="text-emerald-700 font-semibold text-sm tracking-wide font-bangla">
              মানবতার সেবায় একত্রিত
            </span>
          </div>

          {/* Main Title with Gradient */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-bangla leading-tight">
            <span className="relative inline-block">
              আমাদের সাথে
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></span>
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
              যুক্ত হোন
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-bangla leading-relaxed">
            নিচের যে কোনো পদ্ধতিতে আমাদের সঙ্গে যুক্ত হয়ে আর্তমানবতার সেবায় ভূমিকা রাখতে পারেন।
          </p>
        </div>

        {/* Involvement Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {involvementOptions.map((option) => {
            const Icon = option.icon;

            return (
              <div
                key={option.id}
                className="relative group"
                onMouseEnter={() => setHoveredCard(option.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card Container */}
                <div className={`
                  relative h-full rounded-3xl overflow-hidden
                  bg-white border-2 ${option.borderColor}
                  shadow-xl shadow-gray-200/50
                  transition-all duration-500 ease-out
                  hover:shadow-2xl hover:shadow-gray-300/50
                  hover:-translate-y-3
                  flex flex-col
                  ${hoveredCard === option.id ? 'scale-105 z-10' : ''}
                `}>
                  {/* Animated Top Gradient Bar */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${option.color} animate-pulse`} />

                  {/* Card Content */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    {/* Icon Circle */}
                    <div className="relative mb-6">
                      <div className={`
                        w-16 h-16 rounded-2xl flex items-center justify-center mb-4
                        bg-gradient-to-br ${option.color}
                        group-hover:scale-110 group-hover:rotate-12 transition-all duration-500
                        shadow-lg
                      `}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      {/* Floating Stats */}
                      <div className="absolute top-0 right-0">
                        <div className={`
                          px-3 py-1.5 rounded-full text-xs font-semibold
                          ${option.bgColor} border ${option.borderColor} text-gray-700
                          backdrop-blur-sm
                        `}>
                          {option.stats}
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className={`
                      text-xl md:text-2xl font-bold text-gray-900 mb-3 font-bangla
                      leading-tight group-hover:text-gray-800 transition-colors duration-300
                    `}>
                      {option.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed mb-6 font-bangla text-md line-clamp-2">
                      {option.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-3 mb-8 flex-grow">
                      {option.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2"
                        >
                          <div className={`
                            w-2 h-2 rounded-full bg-gradient-to-r ${option.color}
                            flex-shrink-0
                          `} />
                          <span className="text-sm text-gray-700 font-bangla">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <Button
                      className={`
                        w-full mt-auto
                        bg-gradient-to-r ${option.color}
                        hover:opacity-90 text-white
                        rounded-xl py-6 font-semibold font-bangla
                        transition-all duration-300 transform
                        hover:scale-[1.02] hover:shadow-lg
                      `}
                    >
                      যুক্ত হন
                    </Button>
                  </div>

                  {/* Corner Accents */}
                  <div className={`absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 ${option.borderColor} rounded-tr-2xl opacity-50`} />
                  <div className={`absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 ${option.borderColor} rounded-bl-2xl opacity-50`} />

                  {/* Hover Glow Effect */}
                  <div className={`
                    absolute inset-0 rounded-3xl bg-gradient-to-br ${option.color}
                    opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10
                  `} />
                </div>

                {/* Floating Glow Effect */}
                <div className={`
                  absolute -inset-4 rounded-3xl bg-gradient-to-br ${option.color}
                  opacity-0 group-hover:opacity-10 blur-xl transition-all duration-700 -z-20
                  ${hoveredCard === option.id ? 'scale-110' : ''}
                `} />
              </div>
            );
          })}
        </div>

        {/* CTA Section */}

      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, #00000003 1px, transparent 1px),
            linear-gradient(to bottom, #00000003 1px, transparent 1px);
          background-size: 40px 40px;
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% 200%;
        }

        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

