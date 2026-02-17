'use client';

import { Target, TrendingUp, Users, CheckCircle, Receipt, Eye } from 'lucide-react';

const transparencyItems = [
  {
    icon: Receipt,
    title: 'সম্পূর্ণ রসিদ',
    description: 'প্রতিটি দানের জন্য আনুষ্ঠানিক রসিদ প্রদান',
    color: 'bg-blue-50 text-blue-600'
  },
  {
    icon: Eye,
    title: '১০০% স্বচ্ছতা',
    description: 'সকল আয়-ব্যয়ের খতিয়ান অনলাইনে প্রকাশ',
    color: 'bg-emerald-50 text-emerald-600'
  },
  {
    icon: CheckCircle,
    title: 'যাচাইকৃত হিসাব',
    description: 'চার্টার্ড অ্যাকাউন্টেন্ট দ্বারা বার্ষিক অডিট',
    color: 'bg-green-50 text-green-600'
  },
  {
    icon: TrendingUp,
    title: 'প্রকৃত প্রভাব',
    description: 'দানের প্রভাবের বিস্তারিত প্রতিবেদন',
    color: 'bg-rose-50 text-rose-600'
  }
];

const impactStories = [
  {
    category: 'শিক্ষা',
    story: 'আমাদের শিক্ষাবৃত্তি পেয়ে ৫০০+ শিক্ষার্থী উচ্চশিক্ষা গ্রহণ করছে',
    impact: '৫০০+ পরিবার'
  },
  {
    category: 'ত্রাণ',
    story: 'বন্যা কবলিত ১০,০০০+ মানুষের মাঝে ত্রাণ বিতরণ',
    impact: '১০,০০০+ মানুষ'
  },
  {
    category: 'নলকূপ',
    story: '৫০+ গ্রামে বিশুদ্ধ পানির ব্যবস্থা করা হয়েছে',
    impact: '২৫,০০০+ মানুষ'
  },
  {
    category: 'প্রশিক্ষণ',
    story: '১,২০০+ যুবক-যুবতীকে দক্ষতা উন্নয়ন প্রশিক্ষণ',
    impact: '১,২০০+ যুবক'
  }
];

export default function TransparencySection() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-bangla">
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                স্বচ্ছতা ও প্রভাব
              </span>
            </h2>
            
            <p className="text-gray-600 max-w-2xl mx-auto font-bangla">
              আপনার প্রতিটি টাকা কিভাবে পরিবর্তন আনছে তা জানুন
            </p>
          </div>

          {/* Transparency Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {transparencyItems.map((item, idx) => {
              const Icon = item.icon;

              return (
                <div
                  key={idx}
                  className={`rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300 ${item.color.split(' ')[0]}`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-14 h-14 rounded-xl ${item.color.split(' ')[0]} flex items-center justify-center mb-4`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    
                    <h3 className="font-bold text-gray-900 mb-2 font-bangla">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-bangla">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Impact Stories */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-8">
              <Target className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold text-gray-900 font-bangla">
                আমাদের প্রভাবের গল্প
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {impactStories.map((story, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-5 border border-gray-100 hover:border-emerald-200 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-50 to-green-50 flex items-center justify-center">
                        <Users className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-emerald-700 font-bangla">
                          {story.category}
                        </div>
                        <div className="text-xs text-gray-500 font-bangla">
                          প্রভাব: {story.impact}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 font-bangla leading-relaxed">
                    {story.story}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Annual Report */}
          <div className="mt-12 bg-primary/10 rounded-3xl p-8 border border-primary/70">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-bangla">
                  বার্ষিক প্রতিবেদন
                </h3>
                <p className="text-gray-700 mb-6 font-bangla leading-relaxed">
                  আমাদের সাম্প্রতিক বার্ষিক প্রতিবেদন ডাউনলোড করে দেখুন কিভাবে আপনার দান সমাজে পরিবর্তন আনছে।
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <button className="bg-primary hover:from-rose-600 hover:to-pink-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg font-bangla">
                    প্রতিবেদন ডাউনলোড
                  </button>
                  
                  <button className="bg-white text-primary font-semibold px-6 py-3 rounded-xl border border-primary/60 hover:bg-primary/10 transition-all duration-300 font-bangla">
                    আর্থিক প্রতিবেদন
                  </button>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-48 h-64 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-200 flex flex-col items-center justify-center p-6">
                    <Receipt className="w-16 h-16 text-primary mb-4" />
                    <div className="text-center">
                      <div className="font-bold text-gray-900 mb-2 font-bangla">
                        ২০২৪ প্রতিবেদন
                      </div>
                      <div className="text-sm text-gray-600 font-bangla">
                        সম্পূর্ণ আয়-ব্যয় বিশ্লেষণ
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center text-white text-xs font-bold">
                    PDF
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}