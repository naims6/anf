// import { BookOpen, HeartHandshake, Users, ArrowRight, GraduationCap, Shield, MessageCircle } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';

// const services = [
//   {
//     id: 1,
//     title: 'শিক্ষা',
//     icon: GraduationCap,
//     description: 'দ্বীনি ও সাধারণ শিক্ষার সমন্বিত সিলেবাসের মাদরাসা প্রতিষ্ঠা; স্কুল, কলেজ ও বিশ্ববিদ্যালয়সহ বিভিন্ন সাধারণ ও কারিগরি বিদ্যালয় প্রতিষ্ঠা; এছাড়া অপ্রাতিষ্ঠানিক শিক্ষার উদ্যোগ গ্রহণ',
//     color: 'from-blue-500 to-cyan-500',
//     bgColor: 'bg-blue-50',
//     borderColor: 'border-blue-200',
//     iconColor: 'text-blue-600'
//   },
//   {
//     id: 2,
//     title: 'সেবা',
//     icon: HeartHandshake,
//     description: 'দরিদ্রদের স্বাবলম্বীকরণ, বন্যার্তদের ত্রাণ ও পুনর্বাসন, নলকূপ ও পানি শোধনাগার স্থাপন, বৃক্ষরোপণ, শীতবস্ত্র বিতরণ, ইফতার বিতরণ, সবার জন্য কুরবানীসহ বিভিন্ন সেবামূলক কার্যক্রম',
//     color: 'from-emerald-500 to-green-500',
//     bgColor: 'bg-emerald-50',
//     borderColor: 'border-emerald-200',
//     iconColor: 'text-emerald-600'
//   },
//   {
//     id: 3,
//     title: 'দাওয়াহ',
//     icon: MessageCircle,
//     description: 'বই-পুস্তক রচনা ও প্রকাশনা, মসজিদ ও অডিটোরিয়ামভিত্তিক দ্বীনি হালাকাহ, দাওয়াহ বিষয়ক প্রশিক্ষণ ও কর্মশালাসহ অনলাইন-অফলাইনভিত্তিক বহুমাত্রিক কার্যক্রম',
//     color: 'from-amber-500 to-orange-500',
//     bgColor: 'bg-amber-50',
//     borderColor: 'border-amber-200',
//     iconColor: 'text-amber-600'
//   }
// ];

// export default function ServiceSection() {
//   return (
//     <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50/30 relative overflow-hidden">
//       {/* Background Elements */}
//       <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-emerald-200 mb-6 shadow-sm">
//             <Shield className="w-5 h-5 text-emerald-600" />
//             <span className="text-emerald-700 font-semibold text-sm font-bangla">
//               উম্মাহর সেবায় নিবেদিত
//             </span>
//           </div>

//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-bangla leading-tight">
//             উম্মাহর স্বার্থে,{' '}
//             <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
//               সুন্নাহর সাথে
//             </span>
//           </h2>

//           <p className="text-xl text-gray-600 max-w-3xl mx-auto font-bangla leading-relaxed">
//             ইসলামের সুমহান শিক্ষা ও মানবসেবার আলোকে আমরা পরিচালনা করি বহুমুখী কার্যক্রম, 
//             যার মাধ্যমে প্রতিষ্ঠিত হয় সমাজের সার্বিক উন্নয়ন ও ইসলামের প্রচার-প্রসার
//           </p>
//         </div>

//         {/* Services Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
//           {services.map((service, index) => {
//             const Icon = service.icon;
//             return (
//               <div 
//                 key={service.id}
//                 className="group relative"
//                 style={{ animationDelay: `${index * 200}ms` }}
//               >
//                 {/* Card */}
//                 <div className={`
//                   relative bg-white rounded-3xl shadow-lg hover:shadow-2xl 
//                   border ${service.borderColor} 
//                   transition-all duration-500 ease-out 
//                   transform group-hover:-translate-y-2 
//                   h-full flex flex-col overflow-hidden
//                 `}>
//                   {/* Header with Gradient */}
//                   <div className={`
//                     relative p-8 pb-6 
//                     bg-gradient-to-br ${service.color}
//                   `}>
//                     {/* Icon Container */}
//                     <div className={`
//                       w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm 
//                       flex items-center justify-center mb-4 
//                       border border-white/30
//                       group-hover:scale-110 transition-transform duration-300
//                     `}>
//                       <Icon className={`w-8 h-8 ${service.iconColor}`} />
//                     </div>

//                     {/* Title */}
//                     <h3 className="text-2xl font-bold text-white font-bangla mb-2">
//                       {service.title}
//                     </h3>

//                     {/* Decorative Line */}
//                     <div className="w-12 h-1 bg-white/50 rounded-full mb-4"></div>
//                   </div>

//                   {/* Content */}
//                   <div className="flex-1 p-8 pt-6">
//                     <p className="text-gray-700 leading-relaxed font-bangla text-lg">
//                       {service.description}
//                     </p>
//                   </div>

//                   {/* Hover Effect Overlay */}
//                   <div className={`
//                     absolute inset-0 rounded-3xl 
//                     bg-gradient-to-br ${service.color} 
//                     opacity-0 group-hover:opacity-5 
//                     transition-opacity duration-300
//                   `}></div>
//                 </div>

//                 {/* Floating Elements */}
//                 <div className={`
//                   absolute -top-2 -right-2 w-6 h-6 
//                   bg-gradient-to-br ${service.color} 
//                   rounded-full opacity-0 
//                   group-hover:opacity-100 
//                   transition-all duration-500 delay-200
//                   transform group-hover:scale-110
//                 `}></div>
//                 <div className={`
//                   absolute -bottom-2 -left-2 w-4 h-4 
//                   bg-gradient-to-br ${service.color} 
//                   rounded-full opacity-0 
//                   group-hover:opacity-100 
//                   transition-all duration-500 delay-300
//                   transform group-hover:scale-110
//                 `}></div>
//               </div>
//             );
//           })}
//         </div>

//         {/* CTA Section */}
//         <div className="text-center">
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg max-w-2xl mx-auto">
//             <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-bangla">
//               আমাদের কার্যক্রমে অংশগ্রহণ করুন
//             </h3>
//             <p className="text-gray-600 mb-8 text-lg font-bangla">
//               আপনার অংশগ্রহণ ও সমর্থন আমাদের কার্যক্রমকে আরও বিস্তৃত করতে সাহায্য করবে
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Button 
//                 size="lg"
//                 className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-6 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-bangla group"
//               >
//                 <span>আরও জানুন</span>
//                 <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
//               </Button>

//               <Button 
//                 variant="outline"
//                 size="lg"
//                 className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-8 py-6 text-lg font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 font-bangla"
//               >
//                 স্বেচ্ছাসেবক হোন
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Stats */}
//         <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto mt-16 pt-8 border-t border-gray-200/50">
//           <div className="text-center">
//             <div className="text-3xl font-bold text-emerald-600 mb-2">৫০+</div>
//             <div className="text-gray-600 font-bangla">সক্রিয় প্রকল্প</div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-bold text-emerald-600 mb-2">১০০+</div>
//             <div className="text-gray-600 font-bangla">নিবেদিত কর্মী</div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-bold text-emerald-600 mb-2">২৫+</div>
//             <div className="text-gray-600 font-bangla">বছরের অভিজ্ঞতা</div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


'use client';

import { useState } from 'react';
import { GraduationCap, HeartHandshake, MessageCircle, Shield, ArrowRight, Sparkles, Target, CheckCircle2, Users, Clock, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    id: 1,
    title: 'শিক্ষা',
    icon: GraduationCap,
    description: 'দ্বীনি ও সাধারণ শিক্ষার সমন্বিত সিলেবাসের মাদরাসা প্রতিষ্ঠা; স্কুল, কলেজ ও বিশ্ববিদ্যালয়সহ বিভিন্ন সাধারণ ও কারিগরি বিদ্যালয় প্রতিষ্ঠা; এছাড়া অপ্রাতিষ্ঠানিক শিক্ষার উদ্যোগ গ্রহণ',
    stats: '৫০০+ শিক্ষার্থী',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
    projects: ['মাদরাসা প্রতিষ্ঠা', 'শিক্ষা বৃত্তি', 'কারিগরি প্রশিক্ষণ'],
    bgColor: 'bg-blue-500/5',
    borderColor: 'border-blue-500/20'
  },
  {
    id: 2,
    title: 'সেবা',
    icon: HeartHandshake,
    description: 'দরিদ্রদের স্বাবলম্বীকরণ, বন্যার্তদের ত্রাণ ও পুনর্বাসন, নলকূপ ও পানি শোধনাগার স্থাপন, বৃক্ষরোপণ, শীতবস্ত্র বিতরণ, ইফতার বিতরণ, সবার জন্য কুরবানীসহ বিভিন্ন সেবামূলক কার্যক্রম',
    stats: '১০,০০০+ পরিবার',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    projects: ['জরুরি ত্রাণ', 'স্বাস্থ্য সেবা', 'কুরবানি কার্যক্রম'],
    bgColor: 'bg-emerald-500/5',
    borderColor: 'border-emerald-500/20'
  },
  {
    id: 3,
    title: 'দাওয়াহ',
    icon: MessageCircle,
    description: 'বই-পুস্তক রচনা ও প্রকাশনা, মসজিদ ও অডিটোরিয়ামভিত্তিক দ্বীনি হালাকাহ, দাওয়াহ বিষয়ক প্রশিক্ষণ ও কর্মশালাসহ অনলাইন-অফলাইনভিত্তিক বহুমাত্রিক কার্যক্রম',
    stats: '১০০+ প্রকাশনা',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    projects: ['বই প্রকাশনা', 'ওয়েবিনার', 'মসজিদ প্রোগ্রাম'],
    bgColor: 'bg-amber-500/5',
    borderColor: 'border-amber-500/20'
  }
];

export default function ServiceSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden py-10 bg-gradient-to-b from-white via-emerald-50/20 to-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-100/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tr from-amber-100/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-emerald-100/30 to-transparent rounded-full blur-3xl" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0001_1px,transparent_1px),linear-gradient(to_bottom,#0001_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-emerald-200/50 mb-8">
              <div className="relative">
                <Shield className="w-5 h-5 text-emerald-600" />
                <div className="absolute inset-0 bg-emerald-400/30 rounded-full blur-sm" />
              </div>
              <span className="text-emerald-700 font-semibold text-sm tracking-wide font-bangla">
                উম্মাহর সেবায় নিবেদিত প্রাণ
              </span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 font-bangla leading-tight">
            <span className="relative inline-block">
              উম্মাহর স্বার্থে
              <div className="absolute bottom-2 left-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
              সুন্নাহর সাথে
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-bangla leading-relaxed">
            ইসলামের সুমহান শিক্ষা ও মানবসেবার আলোকে আমরা পরিচালনা করি বহুমুখী কার্যক্রম,
            যার মাধ্যমে প্রতিষ্ঠিত হয় সমাজের সার্বিক উন্নয়ন ও ইসলামের প্রচার-প্রসার
          </p>
        </div>

        {/* Interactive Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10 ">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="relative group "
              onMouseEnter={() => setActiveCard(service.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Card Container with Glass Effect */}
              <div className={`
                relative h-full rounded-3xl overflow-hidden
                bg-white/80 backdrop-blur-xl
                border border-primary
                shadow-lg shadow-gray-200/50
                transition-all duration-500 ease-out
                ${activeCard === service.id ? 'scale-105 shadow-2xl shadow-emerald-200/30' : ''}
                ${service.bgColor}
              `}>
                {/* Animated Border */}
                <div
                  className={`absolute inset-0 rounded-3xl p-[2px] transition-opacity duration-300 ${activeCard === service.id ? 'opacity-100' : 'opacity-0'}`}
                  style={{ background: service.gradient }}
                >
                  <div className="w-full h-full bg-white/80 backdrop-blur-xl rounded-3xl" />
                </div>

                {/* Card Content */}
                <div className="relative p-8 h-full flex flex-col">
                  {/* Icon */}
                  <div className="relative mb-">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 ${activeCard === service.id ? 'rotate-360' : ''}`}
                      style={{ background: service.gradient }}
                    >
                      <service.icon className="w-10 h-10 text-white" />
                    </div>

                    {/* Floating Badge */}
                    <div className="absolute top-0 right-0">
                      <div className={`px-3 py-1.5 rounded-full text-xs font-semibold ${service.borderColor.replace('border-', 'bg-').replace('/20', '/10')} border ${service.borderColor}`}>
                        {service.stats}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 font-bangla">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-2 leading-relaxed flex-grow font-bangla">
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
                        <CheckCircle2 className={`w-4 h-4 ${service.borderColor.replace('border-', 'text-')}`} />
                        <span className="text-sm text-gray-700 font-bangla">{project}</span>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Button */}
                  {/* <div className={`mt-auto transition-transform duration-300 ${activeCard === service.id ? 'translate-y-0' : 'translate-y-2'}`}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-between group/btn ${service.borderColor.replace('border-', 'hover:bg-').replace('/20', '/10')}`}
                    >
                      <span className="font-bangla">বিস্তারিত দেখুন</span>
                      <div className={`transition-transform duration-300 ${activeCard === service.id ? 'translate-x-1' : ''}`}>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </div>
                    </Button>
                  </div> */}

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                    <span className={`text-sm font-semibold text-emerald-600 font-bangla`}>
                      বিস্তারিত দেখুন
                    </span>
                    <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                    
                        bg-gradient-to-r from-emerald-500 to-green-500
                        text-white transition-all duration-300
                      `}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-3xl blur-xl transition-opacity duration-300 ${activeCard === service.id ? 'opacity-30' : 'opacity-0'}`}
                  style={{ background: service.gradient }}
                />
              </div>

              {/* Floating Particles */}
              {activeCard === service.id && (
                <>
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        background: service.gradient.split(' ')[2],
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
          <div className="bg-gradient-to-r from-white/80 to-emerald-50/60 backdrop-blur-sm rounded-3xl border border-gray-200/50 p-8 ">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Target, value: '৫০+', label: 'সক্রিয় প্রকল্প', color: 'text-blue-600' },
                { icon: Users, value: '১০০+', label: 'নিবেদিত কর্মী', color: 'text-emerald-600' },
                { icon: Clock, value: '২৫+', label: 'বছরের অভিজ্ঞতা', color: 'text-amber-600' },
                { icon: Globe, value: '১০+', label: 'বিভাগে কার্যক্রম', color: 'text-purple-600' }
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="text-center transition-transform duration-300 hover:scale-105"
                >
                  <div className={`w-16 h-16 rounded-2xl ${stat.color.replace('text-', 'bg-').replace('600', '50')} flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-bangla">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl blur-xl opacity-20" />
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-200/50 p-12 shadow-2xl">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-bangla">
                ইসলামী সমাজ গঠনে অংশগ্রহণ করুন
              </h3>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto font-bangla">
                আপনার সমর্থন ও অংশগ্রহণ আমাদের কার্যক্রমকে আরও বিস্তৃত করে উম্মাহর সার্বিক কল্যাণে ভূমিকা রাখতে সাহায্য করবে
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="transition-transform duration-300 hover:scale-105 active:scale-95">
                  <Button
                    size="lg"
                    className="group bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-10 py-7 text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 font-bangla"
                  >
                    <span>কার্যক্রমে অংশগ্রহণ করুন</span>
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </div>

                <div className="transition-transform duration-300 hover:scale-105 active:scale-95">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-10 py-7 text-xl font-semibold rounded-2xl transition-all duration-300 font-bangla"
                  >
                    ডোনার হোন
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% 200%;
        }
        
        @keyframes rotate-360 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .rotate-360 {
          animation: rotate-360 0.6s ease;
        }
      `}</style>
    </section>
  );
}