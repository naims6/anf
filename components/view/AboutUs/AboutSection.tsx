'use client';

import { Users, Book, Heart, Target } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="py-6 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-50 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              <span className="text-emerald-700 font-semibold text-sm font-bangla">
                পরিচিতি
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-bangla">
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                আমাদের সম্পর্কে
              </span>
            </h2>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Description */}
            <div>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6 font-bangla text-lg">
                  <span className="font-semibold text-emerald-700">আস-সুন্নাহ ফাউন্ডেশন</span> শিক্ষা, দাওয়াহ ও পূর্ণ মানবকল্যাণে নিবেদিত একটি অরাজনৈতিক ও অলাভজনক সেবামূলক সরকার নিবন্ধিত প্রতিষ্ঠান। যার নিবন্ধন নম্বর: এস-১৩১১১/২০১৯। ২০১৭ সালে শায়খ আহমাদুল্লাহ এটি প্রতিষ্ঠা করেন।
                </p>
                
                <p className="text-gray-700 leading-relaxed mb-6 font-bangla">
                  তিনি প্রতিষ্ঠানটির চেয়ারম্যান হিসেবে প্রত্যক্ষভাবে পরিচালনা করছেন। এই প্রতিষ্ঠান মানবতার শিক্ষক, মানুষের মুক্তি ও শান্তির দূত, মানবসেবার আদর্শ, মহানবী মুহাম্মাদ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম)-এর পদাঙ্ক অনুসরণ করে আর্তমানবতার সেবা, সমাজ-সংস্কার, মহোত্তম নীতিচেতনার সঞ্চার, পরিচ্ছন্ন মানসিকতা গঠনে নিরন্তর নানা কর্মসূচি পালন করছে।
                </p>
                
                <p className="text-gray-700 leading-relaxed font-bangla">
                  সর্বোপরি একটি আদর্শ কল্যাণসমাজ বিনির্মাণে যথাশক্তি প্রচেষ্টা চালিয়ে যাচ্ছে। কুরআন ও সুন্নাহ ভিত্তিক জীবন ও সমাজ গঠন করা এবং বিশুদ্ধ ইলমের প্রচার ও বিস্তার আস-সুন্নাহ ফাউন্ডেশনের অন্যতম লক্ষ্য। সালাফে সালিহীনের পথ ধরে কুরআন ও সুন্নাহ ভিত্তিক মধ্যমপন্থা অবলম্বন করা আমাদের নীতি।
                </p>
              </div>
            </div>

            {/* Right Column - Key Points */}
            <div className="space-y-6">
              {[
                {
                  icon: Book,
                  title: "আমাদের আদর্শ",
                  description: "কুরআন ও সুন্নাহ ভিত্তিক জীবন গঠন এবং বিশুদ্ধ ইলমের প্রচার",
                  color: "emerald"
                },
                {
                  icon: Users,
                  title: "আমাদের লক্ষ্য",
                  description: "আদর্শ কল্যাণসমাজ বিনির্মাণে নিরন্তর প্রচেষ্টা",
                  color: "green"
                },
                {
                  icon: Heart,
                  title: "আমাদের সেবা",
                  description: "আর্তমানবতার সেবা ও সমাজ সংস্কারে নিবেদিত",
                  color: "rose"
                },
                {
                  icon: Target,
                  title: "আমাদের নীতি",
                  description: "সালাফে সালিহীনের পথে মধ্যমপন্থা অবলম্বন",
                  color: "blue"
                }
              ].map((item, idx) => {
                const Icon = item.icon;
                const colorClasses = {
                  emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
                  green: "bg-green-50 text-green-600 border-green-100",
                  rose: "bg-rose-50 text-rose-600 border-rose-100",
                  blue: "bg-blue-50 text-blue-600 border-blue-100"
                };

                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-14 h-14 rounded-xl ${colorClasses[item.color as keyof typeof colorClasses]} flex items-center justify-center`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 font-bangla">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 font-bangla leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}