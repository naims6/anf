'use client';

import { Heart, Shield, Target, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DonateHero() {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-rose-50 via-white to-pink-25">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-100/20 rounded-full blur-3xl" />

      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-5 py-3 border border-rose-100 shadow-sm mb-8">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary font-semibold text-sm font-bangla">
                সাদাকাহে জারিয়াহ
              </span>
            </div>
            <div className="w-1 h-1 bg-primary/70 rounded-full" />
            <div className="text-primary text-sm font-bangla">
              চলমান নেকি
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-bangla leading-tight">
                <span className="block mb-3">মানবতার সেবায়</span>
                <span className="relative inline-block">
                  <span className="bg-primary bg-clip-text text-transparent">
                    আপনার দান
                  </span>
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-primary rounded-full" />
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 font-bangla leading-relaxed">
                আপনার একটি দান অসংখ্য মানুষের জীবনে পরিবর্তন আনতে পারে। আসুন, আমরা একত্রে একটি সুন্দর সমাজ গড়ি।
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: '১০০%', label: 'সঠিক ব্যবহার', color: 'bg-emerald-500' },
                  { value: '৫০,০০০+', label: 'সেবাপ্রাপ্ত', color: 'bg-emerald-500' },
                  { value: '১০০%', label: 'স্বচ্ছতা', color: 'bg-emerald-500' }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-2 h-2 rounded-full ${stat.color}`} />
                      <div className="text-2xl font-bold text-gray-900 font-bangla">
                        {stat.value}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 font-bangla">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="group bg-primary text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-bangla"
                >
                  <Heart className="w-6 h-6 mr-3" />
                  দান করুন এখনই
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-primary text-primary hover:bg-primary/90 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300 font-bangla hover:text-white"
                >
                  <Shield className="w-6 h-6 mr-3" />
                  নীতিমালা দেখুন
                </Button>
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative">
              <div className="bg-primary rounded-3xl p-8 shadow-2xl">
                <div className="text-center text-white">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 font-bangla">
                    আজকের লক্ষ্যমাত্রা
                  </h3>
                  
                  <div className="mb-6">
                    <div className="text-5xl font-bold mb-2 font-bangla">৳ ৫,০০,০০০</div>
                    <div className="text-rose-100 font-bangla">মাসিক তহবিল সংগ্রহ</div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-bangla">সংগৃহীত</span>
                      <span className="font-bangla">৳ ৩,২৫,০০০ (৬৫%)</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3">
                      <div 
                        className="bg-white h-3 rounded-full transition-all duration-1000"
                        style={{ width: '65%' }}
                      />
                    </div>
                  </div>
                  
                  <div className="text-sm text-rose-100 font-bangla">
                    আর মাত্র ৩৫% লক্ষ্যমাত্রা বাকি
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                <div className="text-white text-center">
                  <div className="text-2xl font-bold">+৫</div>
                  <div className="text-xs">বছরের বিশ্বস্ততা</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}