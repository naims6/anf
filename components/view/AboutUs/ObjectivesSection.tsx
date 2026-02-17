'use client';

import { useState } from 'react';
import { GraduationCap, MessageCircle, Heart, Book, Users, Target, Award, Lightbulb } from 'lucide-react';

const objectives = [
  {
    id: 'education',
    label: 'শিক্ষা',
    icon: GraduationCap,
    color: 'blue',
    items: [
      "কুরআন ও সুন্নাহভিত্তিক বিশুদ্ধ ইসলামী জ্ঞানের প্রসার।",
      "জাতীয় ও আন্তর্জাতিক পর্যায়ে যোগ্য ইসলামী আলোচক ও দা'য়ী তৈরি করা।",
      "কুরআন-সুন্নাহভিত্তিক যুগোপযোগী শিক্ষা গবেষণাকেন্দ্র স্থাপন, পাঠক্রম ও শিক্ষাপ্রতিষ্ঠান প্রতিষ্ঠা ও পরিচালনা।",
      "আস-সুন্নাহ ফাউন্ডেশনের চেতনাকে কেন্দ্রে রেখে স্কুল, কলেজ, বিশ্ববিদ্যালয় ও কারিগরি বিদ্যালয় প্রতিষ্ঠা ও পরিচালনা।",
      "আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউটের মাধ্যমে বিভিন্ন কারিগরি প্রশিক্ষণ প্রদানের মাধ্যমে ২০৩০ সাল নাগাদ বছরে ১ লক্ষ বেকার তরুণের কর্মসংস্থান সৃষ্টি।",
      "অসহায় ও দরিদ্র নারীদের কারিগরি প্রশিক্ষণ দিয়ে স্বাবলম্বী করা।",
      "দরিদ্র ও অসচ্ছল মেধাবী শিক্ষার্থীদের শিক্ষাবৃত্তি, শিক্ষা উপকরণ প্রদান ও সহায়ক কার্যক্রম পরিচালনা।",
      "শিক্ষা, সংস্কৃতি ও নানা সামাজিক ও জীবনমুখী বিষয়ের ওপর প্রতিযোগিতার আয়োজন।"
    ]
  },
  {
    id: 'dawah',
    label: 'দাওয়াহ',
    icon: MessageCircle,
    color: 'emerald',
    items: [
      "কুরআন ও সুন্নাহর আলোকে একত্ববাদ প্রতিষ্ঠা।",
      "শিরক-বিদআদ এবং প্রান্তিকতা দূরকরণে দাওয়াহ কার্যক্রম পরিচালনা।",
      "সৎকাজে উৎসাহ দান এবং অসৎকাজ থেকে বিরত রাখার লক্ষ্যে সুপরিকল্পিত দাওয়াতি কার্যক্রম পরিচালনা।",
      "নবী কারীম (সা.)-এর মসজিদের আদলে শান্তিপূর্ণ ও কল্যাণকর সমাজ গঠনে সহায়ক আদর্শ মসজিদ নির্মাণ ও পরিচালনা।",
      "বিষয়বিশেষে ইসলামের দৃষ্টিভঙ্গি তুলে ধরার লক্ষ্যে বিভিন্ন এলাকার মসজিদ, মাদরাসা, অডিটোরিয়াম প্রভৃতি সমাগমস্থলে সাপ্তাহিক, মাসিক, বার্ষিক ও উপলক্ষ-সাময়িক দ্বীনি হালাকাহ, মুক্ত মতবিনিময় ও আলোচনা-সভা আয়োজন।",
      "বিশুদ্ধ ইসলামিক জ্ঞান, আকীদা, কর্মনীতি ও দৃষ্টিভঙ্গি তুলে ধরে মৌলিক ও প্রামাণ্য বইপত্র প্রকাশ ও প্রচার।",
      "ইমাম, খতীব ও দা'য়ীদের জন্য দাওয়াহ প্রশিক্ষণ।",
      "ফাউন্ডেশন কর্তৃক পরিচালিত বিভিন্ন সেবামূলক কার্যক্রমের পাশাপাশি নির্ধারিত সিলেবাসের ভিত্তিতে দাওয়াহ প্রদান।"
    ]
  },
  {
    id: 'service',
    label: 'সেবা',
    icon: Heart,
    color: 'rose',
    items: [
      "দারিদ্র্য বিমোচন, আর্তমানবতার সেবা ও সমৃদ্ধ দেশ গঠন।",
      "প্রাকৃতিক দুর্যোগকালে উপদ্রুত অঞ্চলে ত্রাণ বিতরণ ও দুর্যোগ পরবর্তীতে পুনর্বাসন কার্যক্রম পরিচালনা।",
      "সুপেয় পানির সুবিধাবঞ্চিত এলাকায় নলকূপ ও পানি শোধনাগার স্থাপন।",
      "সাদাকায়ে জারিয়াহ, পরিবেশ সুরক্ষা ও স্বাবলম্বীকরণের লক্ষ্যে অধিক ফলনশীল বৃক্ষরোপণ ও পরিচর্যা।",
      "রমযান মাসে অভাবগ্রস্তদের মাঝে ইফতার সামগ্রী বিতরণ।",
      "সচ্ছলদের পক্ষ থেকে কুরবানীর আয়োজন করে অসচ্ছলদের মধ্যে বিতরণ।",
      "শিক্ষার্থীদের আত্মনির্ভরশীল করার জন্য প্রশিক্ষণ ও সহায়তা প্রদান।",
      "এতিমদের পরিণত হওয়ার পর্যন্ত অভিভাবকের দায়িত্বে শিক্ষাদান ও প্রতিপালন।",
      "উপযোগী উপার্জন উপকরণ প্রদানের মাধ্যমে স্থায়ী টেকসই স্বাবলম্বীকরণ কার্যক্রম পরিচালনা।"
    ]
  }
];

export default function ObjectivesSection() {
  const [activeTab, setActiveTab] = useState('education');

  const activeObjective = objectives.find(obj => obj.id === activeTab);
  const Icon = activeObjective?.icon || GraduationCap;

  const colorMap = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-100',
      gradient: 'from-blue-500 to-blue-600'
    },
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-100',
      gradient: 'from-emerald-500 to-green-500'
    },
    rose: {
      bg: 'bg-rose-50',
      text: 'text-rose-600',
      border: 'border-rose-100',
      gradient: 'from-rose-500 to-pink-500'
    }
  };

  return (
    <section className="py-2 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full" />
              <span className="text-emerald-700 font-semibold text-sm font-bangla">
                আমাদের লক্ষ্যসমূহ
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-bangla">
              <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-blue-600 bg-clip-text text-transparent">
                লক্ষ্য-উদ্দেশ্য
              </span>
            </h2>
            
            <p className="text-gray-600 max-w-3xl mx-auto font-bangla">
              তিনটি মূল খাতে আমাদের সুনির্দিষ্ট লক্ষ্য ও উদ্দেশ্য
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {objectives.map((obj) => {
              const TabIcon = obj.icon;
              const colors = colorMap[obj.color as keyof typeof colorMap];
              const isActive = activeTab === obj.id;

              return (
                <button
                  key={obj.id}
                  onClick={() => setActiveTab(obj.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 font-bangla ${isActive ? colors.text + ' ' + colors.bg + ' border ' + colors.border + ' shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                >
                  <TabIcon className="w-5 h-5" />
                  {obj.label}
                </button>
              );
            })}
          </div>

          {/* Active Tab Content */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-gray-100 p-8">
            {/* Tab Header */}
            <div className={`inline-flex items-center gap-3 ${colorMap[activeObjective?.color as keyof typeof colorMap]?.bg} rounded-xl px-4 py-3 mb-8`}>
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${colorMap[activeObjective?.color as keyof typeof colorMap]?.gradient} flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 font-bangla">
                  {activeObjective?.label} বিভাগ
                </h3>
                <p className="text-sm text-gray-600 font-bangla">
                  আমাদের প্রধান লক্ষ্য ও উদ্দেশ্য
                </p>
              </div>
            </div>

            {/* Objectives List */}
            <div className="space-y-6">
              {activeObjective?.items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg ${colorMap[activeObjective?.color as keyof typeof colorMap]?.bg} flex items-center justify-center`}>
                    <div className={`w-2 h-2 rounded-full ${colorMap[activeObjective?.color as keyof typeof colorMap]?.text}`} />
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed font-bangla">
                    {item}
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