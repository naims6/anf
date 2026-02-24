'use client';

import { Heart, Users, Target, Briefcase, Star, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import SectionHeader from '@/components/shared/SectionHeader/SectionHeader';

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
    <section className="relative py-10 bg-linear-to-b from-white via-emerald-50/5 to-white overflow-hidden">

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          badgeText='মানবতার সেবায় একত্রিত'
          title='আমরা সবাই মানবতার তরে'
          subtitle='আমাদের সাথে যুক্ত হবেন যেভাবে'
          description='নিচের যেকোন পদ্ধতিতে আমাদের সঙ্গে আপনিও যুক্ত হতে পারেন'
          icon={Star}
        />

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
                <div className={` relative h-full rounded-xl overflow-hidden bg-white border shadow-xl shadow-gray-200/50 transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-gray-300/50 hover:-translate-y-3 flex flex-col ${hoveredCard === option.id ? 'scale-105 z-10' : ''} `}>

                  {/* Card Content */}
                  <div className="p-6 md:p-8 flex flex-col grow">
                    {/* Icon Circle */}
                    <div className="relative mb-6">
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-linear-to-br ${option.color} group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      {/* Floating Stats */}
                      <div className="absolute top-0 right-0">
                        <div
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold ${option.bgColor} border ${option.borderColor} text-gray-700 backdrop-blur-sm`}>
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
                    <div className="space-y-3 mb-8 grow">
                      {option.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2"
                        >
                          <Check
                            className={`w-4 h-4 rounded-full p-0.5`}
                          />
                          <span className="text-sm text-gray-700 font-bangla">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <Button
                      variant="custom"
                      size="lg"
                    >
                      যুক্ত হন
                    </Button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
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

