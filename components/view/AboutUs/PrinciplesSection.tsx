'use client';

import { BookOpen, Users, Heart, Shield, Target, CheckCircle } from 'lucide-react';

const principles = [
  {
    icon: BookOpen,
    title: "আদর্শের ভিত্তি",
    description: "পবিত্র কুরআন ও আল্লাহর রাসূল মুহাম্মাদ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম)-এর সুন্নাহ তথা কর্মনীতিই আস-সুন্নাহ ফাউন্ডেশনের মূল আদর্শ।",
    color: "emerald"
  },
  {
    icon: Target,
    title: "মধ্যমপন্থা",
    description: "ইসলামের প্রাথমিক যুগের শ্রেষ্ঠ মুসলিমদের অনুসৃত পদ্ধতির আলোকে কুরআন ও সুন্নাহভিত্তিক মধ্যমপন্থা অবলম্বন করা আমাদের নীতি।",
    color: "green"
  },
  {
    icon: Users,
    title: "ঐক্য ও ভ্রাতৃত্ব",
    description: "উম্মাহর ঐক্য, সংহতি ও পারস্পরিক ভ্রাতৃত্বের নীতি মেনে চলা।",
    color: "blue"
  },
  {
    icon: Heart,
    title: "সামাজিক মূল্যবোধ",
    description: "সৎকাজে উৎসাহ দান ও অসৎকাজ থেকে বিরত রাখার মাধ্যমে সামাজিক ও ধর্মীয় মূল্যবোধ সংহতকরণ এবং মানবিক চেতনার জাগরণ।",
    color: "rose"
  },
  {
    icon: Shield,
    title: "উদারতা ও সহনশীলতা",
    description: "ইসলামী দাওয়াহ এবং কার্যক্রমের ক্ষেত্রে উগ্রতা বা কঠোরতা পরিহার করে উদারতা ও সহনশীলতার নীতি অবলম্বন করা।",
    color: "amber"
  },
  {
    icon: CheckCircle,
    title: "আমানতের দায়িত্ব",
    description: "জনগণের প্রদত্ত দান অর্থ ও সম্পদকে আল্লাহ তাআলার পক্ষ থেকে আমানত হিসেবে গণ্য করা এবং এর যথাযথ ব্যবহার নিশ্চিত করা।",
    color: "violet"
  }
];

const additionalPrinciples = [
  "ধর্ম, বর্ণ, গোত্র নির্বিশেষে সকল মানুষের জন্য দাওয়াহ ও সেবামূলক কার্যক্রম পরিচালনা করা।",
  "সংগৃহীত তহবিল এবং ব্যয়ের প্রতিটি হিসাবের ক্ষেত্রে স্বচ্ছতা নিশ্চিত করা।",
  "পরিচালনা পর্ষদ এবং কর্মীদের সকল কাজের জবাবদিহিতা নিশ্চিত করা।",
  "প্রতিষ্ঠানের অভ্যন্তরীণ ও বাহ্যিক নিরীক্ষণের ব্যবস্থা রাখা।",
  "প্রতিষ্ঠানের সকল স্তরের কর্মীদের মধ্যে সর্বোচ্চ সততা ও নৈতিকতার মান বজায় রাখা।",
  "সকল ক্ষেত্রে পেশাদারিত্ব নিশ্চিত করা; শিক্ষা, দাওয়াহ ও সেবামূলক কার্যক্রমে গুণগত মান বজায় রাখা।",
  "রাজনৈতিক কর্ম ও অবস্থান গ্রহণ থেকে বিরত থাকা এবং নিরপেক্ষভাবে কাজ করা।",
  "দক্ষ ও যোগ্য কর্মী নিয়োগ করা এবং তাদের নিয়মিত প্রশিক্ষণের মাধ্যমে কর্মদক্ষতা বৃদ্ধি করা।",
  "সেবা কার্যক্রমের ক্ষেত্রে দরিদ্র, অসহায়, এতিম, বিধবা এবং দুর্যোগ কবলিত মানুষকে অগ্রাধিকার দেওয়া।",
  "সাময়িক সহযোগিতার তুলনায় স্থায়ী দারিদ্র্য বিমোচন ও টেকসই উন্নয়ন আমাদের নীতি।"
];

export default function PrinciplesSection() {
  return (
    <section className="py-bg-gradient-to-b from-white to-emerald-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-green-50 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full" />
              <span className="text-emerald-700 font-semibold text-sm font-bangla">
                আমাদের নীতিমালা
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-bangla">
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                নীতি ও আদর্শ
              </span>
            </h2>
            
            <p className="text-gray-600 max-w-3xl mx-auto font-bangla">
              আমাদের কার্যক্রম পরিচালনার মৌলিক নীতিমালা যা আমাদের প্রতিটি সিদ্ধান্ত ও কাজের ভিত্তি
            </p>
          </div>

          {/* Main Principles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {principles.map((principle, idx) => {
              const Icon = principle.icon;
              const colorMap = {
                emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
                green: "bg-green-50 text-green-600 border-green-100",
                blue: "bg-blue-50 text-blue-600 border-blue-100",
                rose: "bg-rose-50 text-rose-600 border-rose-100",
                amber: "bg-amber-50 text-amber-600 border-amber-100",
                violet: "bg-violet-50 text-violet-600 border-violet-100"
              };

              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${colorMap[principle.color as keyof typeof colorMap]} flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 font-bangla">
                        {principle.title}
                      </h3>
                      <p className="text-gray-600 text-sm font-bangla leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional Principles List */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <div className="grid md:grid-cols-2 gap-6">
              {additionalPrinciples.map((principle, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    </div>
                  </div>
                  
                  <p className="text-gray-700 font-bangla leading-relaxed">
                    {principle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
