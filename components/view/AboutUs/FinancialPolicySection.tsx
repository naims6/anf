'use client';

import { useState } from 'react';
import { DollarSign, Heart, Briefcase, Shield, Target, PieChart } from 'lucide-react';

const policies = [
  {
    id: 'income',
    label: 'আয়ের উৎস',
    icon: DollarSign,
    color: 'green',
    items: [
      "বিভিন্ন ব্যক্তি ও প্রতিষ্ঠান থেকে প্রাপ্ত স্বেচ্ছা অনুদান ও অর্থসহায়তা।",
      "সদস্য, সমর্থক ও শুভাকাঙ্ক্ষীদের এককালীন ও নিয়মিত অনুদান।",
      "ফাউন্ডেশনের যে কোনো প্রকল্পের জন্য সংগৃহীত অর্থ।",
      "সচ্ছল মুসলিমদের প্রদেয় যাকাত।",
      "ইফতার ও কুরবানীসহ বিশেষ বিশেষ খাতে উসুলকৃত অর্থ।",
      "ফাউন্ডেশনের বিভিন্ন অঙ্গপ্রতিষ্ঠানের আয়।"
    ],
    note: "আমরা সব ধরনের আয় স্বচ্ছভাবে রেকর্ড রাখি এবং যথাযথভাবে ব্যবহার করি।"
  },
  {
    id: 'service',
    label: 'সেবামূলক ব্যয়',
    icon: Heart,
    color: 'emerald',
    items: [
      "দাতাগণের দানের অর্থ শরয়ী নীতিমালা ও দেশীয় আইনের আলোকে ব্যয় করা হয়।",
      "দাতাগণ যে খাতের জন্য দান করে থাকেন, সে খাতেই ব্যয় করা হয়। এক খাতের অর্থ অন্য খাতে ব্যয় করা হয় না।",
      "যাকাত তহবিলে সংগৃহীত অর্থের শতভাগ হকদারদের মাঝে বণ্টন করা হয়। ব্যবস্থাপনার কাজে যাকাতের অর্থ ব্যয় করা হয় না। এক্ষেত্রে সাধারণ খাতের অর্থ ব্যয় করা হয়।",
      "প্রতিটি প্রকল্প সম্পন্ন হওয়ার পর আয়-ব্যয়ের বিস্তারিত হিসাব আন্তর্জাতিক মানদণ্ড অনুসরণ করে সংরক্ষণ করা হয়।",
      "বছরে একবার চার্টার্ড অ্যাকাউন্টেন্ট দ্বারা ফাউন্ডেশনের আয়-ব্যয়ের হিসাব নীরিক্ষণ করা হয় এবং প্রতিবেদন প্রকাশ করা হয়।",
      "জাতীয় ও আন্তর্জাতিক পর্যায়ে বিশেষজ্ঞ উপদেষ্টামণ্ডলীর সমন্বয়ে গঠিত টিমের তত্ত্বাবধানে আস-সুন্নাহ ফাউন্ডেশনের সকল আর্থিক কার্যক্রম মনিটরিং করা হয়।"
    ],
    note: "প্রতিটি টাকা সঠিকভাবে সেবামূলক কাজে ব্যয় হয় তা নিশ্চিত করাই আমাদের দায়িত্ব।"
  },
  {
    id: 'management',
    label: 'ব্যবস্থাপনা ব্যয়',
    icon: Briefcase,
    color: 'blue',
    sections: [
      {
        title: "সরাসরি ব্যবস্থাপনা",
        items: [
          "পরিবহন ব্যয়: প্রকল্প সংশ্লিষ্ট মালামাল পরিবহন, কর্মী ও স্বেচ্ছাসেবকদের যাতায়াতের খরচ।",
          "খাবার: প্রকল্প বাস্তবায়নে নিয়োজিত কর্মী ও স্বেচ্ছাসেবকদের কার্যক্রম পরিচালনাকালীন খাবারের খরচ।",
          "শ্রমিক বিল: প্রয়োজনীয় ক্ষেত্রে শ্রমিকদের পারিশ্রমিক।",
          "প্যাকেজিং সামগ্রী: উপকরণ সুষ্ঠুভাবে বিতরণের জন্য প্রয়োজনীয় প্যাকেজিং খরচ।"
        ]
      },
      {
        title: "পরোক্ষ ব্যবস্থাপনা",
        description: "প্রকল্প বাস্তবায়নের ক্ষেত্রে সুষ্ঠু ব্যবস্থাপনার স্বার্থে অ্যাডমিনেস্ট্রেটিভ বডির প্রয়োজন হয়। অ্যাডমিনেস্ট্রেটিভ বডির প্রয়োজনীয় খরচ বা দাফতরিক ব্যয় পরোক্ষ ব্যবস্থাপনা ব্যয়ের অন্তর্ভুক্ত, যা সর্বোচ্চ ৭ শতাংশের মধ্যে সীমাবদ্ধ রাখা হয়।",
        items: [
          "কর্মীদের বেতন: ব্যবস্থাপনা কর্মী ও অন্যান্য প্রশাসনিক কর্মীদের বেতন।",
          "প্রাত্যহিক দাফতরিক খরচ: দফতরের বিদ্যুৎ, পানি, ইন্টারনেট, টেলিফোন বিল ইত্যাদি।",
          "সরঞ্জাম ও আসবাবপত্র: কম্পিউটার, প্রিন্টার, ফার্নিচার, স্টেশনারি ও অন্যান্য প্রয়োজনীয় উপকরণ।",
          "আইনি ও হিসাবরক্ষণ খরচ: অডিট ফি, আইনজীবী ফি, লিগ্যাল পরামর্শ ও ট্যাক্স সংক্রান্ত ব্যয়।",
          "পরিবহন ও সরবরাহ ব্যয়: প্রতিষ্ঠানের স্টাফ বা ম্যানেজমেন্ট টিমের যাতায়াত ও অফিসিয়াল কাজের জন্য প্রয়োজনীয় পরিবহন খরচ।",
          "ফান্ডরেইজিং ও মার্কেটিং খরচ: দাতাদের কাছ থেকে অনুদান সংগ্রহের জন্য বিভিন্ন প্রচার-প্রচারণা, ওয়েবসাইট রক্ষণাবেক্ষণ, সোশ্যাল মিডিয়া মার্কেটিং ইত্যাদির ব্যয়।",
          "প্রশিক্ষণ ও দক্ষতা উন্নয়ন খরচ: প্রতিষ্ঠানের কর্মীদের দক্ষতা বৃদ্ধির জন্য প্রশিক্ষণ ও কর্মশালা আয়োজনের ব্যয়।",
          "নিরাপত্তা খরচ: অফিসের নিরাপত্তা, অগ্নি নিরাপত্তা ইত্যাদি।",
          "আইটি ও সফটওয়্যার খরচ: অ্যাকাউন্টিং সফটওয়্যার, ক্লাউড স্টোরেজ, ইমেইল সার্ভিস ইত্যাদির জন্য সাবস্ক্রিপশন ফি।"
        ]
      }
    ],
    note: "আমরা নিশ্চিত করি যে, প্রতিটি অনুদান যেন যথাযথভাবে ব্যবহৃত হয় এবং প্রকৃত সুবিধাভোগীদের কাছে পৌঁছে যায়।"
  }
];

export default function FinancialPolicySection() {
  const [activeTab, setActiveTab] = useState('income');

  const activePolicy = policies.find(policy => policy.id === activeTab);
  const Icon = activePolicy?.icon || DollarSign;

  const colorMap = {
    green: {
      bg: 'bg-green-50',
      text: 'text-green-600',
      border: 'border-green-100',
      gradient: 'from-green-500 to-emerald-500'
    },
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-100',
      gradient: 'from-emerald-500 to-green-500'
    },
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-100',
      gradient: 'from-blue-500 to-cyan-500'
    }
  };

  return (
    <section className="py-8 bg-gradient-to-b from-white to-emerald-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-6 border border-emerald-100 shadow-sm">
              <PieChart className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 font-semibold text-sm font-bangla">
                আর্থিক স্বচ্ছতা
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-bangla">
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                আয়-ব্যয়ের নীতিমালা
              </span>
            </h2>
            
            <p className="text-gray-600 max-w-3xl mx-auto font-bangla">
              আমাদের আর্থিক ব্যবস্থাপনার স্বচ্ছতা ও জবাবদিহিতা নিশ্চিত করার নীতিমালা
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {policies.map((policy) => {
              const TabIcon = policy.icon;
              const colors = colorMap[policy.color as keyof typeof colorMap];
              const isActive = activeTab === policy.id;

              return (
                <button
                  key={policy.id}
                  onClick={() => setActiveTab(policy.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 font-bangla ${isActive ? colors.text + ' ' + colors.bg + ' border ' + colors.border + ' shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                >
                  <TabIcon className="w-5 h-5" />
                  {policy.label}
                </button>
              );
            })}
          </div>

          {/* Active Tab Content */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            {/* Tab Header */}
            <div className={`inline-flex items-center gap-3 ${colorMap[activePolicy?.color as keyof typeof colorMap]?.bg} rounded-xl px-4 py-3 mb-8`}>
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${colorMap[activePolicy?.color as keyof typeof colorMap]?.gradient} flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 font-bangla">
                  {activePolicy?.label}
                </h3>
                <p className="text-sm text-gray-600 font-bangla">
                  নীতি ও নির্দেশিকা
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              {/* Regular items list */}
              {
              //@ts-ignore
              'items' in activePolicy && (
                <div className="space-y-6">
                  {activePolicy.items?.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-lg ${colorMap[activePolicy?.color as keyof typeof colorMap]?.bg} flex items-center justify-center`}>
                        <Shield className="w-4 h-4" />
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed font-bangla">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Sections for management policy */}
              {
              //@ts-ignore
              'sections' in activePolicy && (
                <div className="space-y-8">
                  {activePolicy.sections?.map((section, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-2xl p-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-4 font-bangla">
                        {section.title}
                      </h4>
                      
                      {section.description && (
                        <p className="text-gray-700 mb-4 font-bangla leading-relaxed">
                          {section.description}
                        </p>
                      )}
                      
                      <div className="space-y-4">
                        {section.items?.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                              <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${colorMap[activePolicy?.color as keyof typeof colorMap]?.gradient} flex items-center justify-center`}>
                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                              </div>
                            </div>
                            
                            <p className="text-gray-700 font-bangla leading-relaxed">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Note */}
              {activePolicy?.note && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className={`${colorMap[activePolicy?.color as keyof typeof colorMap]?.bg} rounded-xl p-4 border ${colorMap[activePolicy?.color as keyof typeof colorMap]?.border}`}>
                    <p className="text-gray-700 font-bangla leading-relaxed">
                      <span className="font-semibold">দ্রষ্টব্য:</span> {activePolicy.note}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Trust Badge */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl px-6 py-4 border border-emerald-100">
              <Target className="w-6 h-6 text-emerald-600" />
              <div>
                <div className="font-semibold text-emerald-700 font-bangla">
                  সর্বোচ্চ স্বচ্ছতা ও জবাবদিহিতা
                </div>
                <div className="text-sm text-gray-600 font-bangla">
                  আপনার প্রতিটি অনুদান সঠিকভাবে ব্যয় হয় তা নিশ্চিত করি
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}