'use client';

import { Shield, Target, Award } from 'lucide-react';


export default function AboutHero() {
  return (
    <section className="relative pt-20 bg-gradient-to-br from-emerald-50 via-white to-emerald-25">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-100/20 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(90deg, #000 1px, transparent 1px), linear-gradient(180deg, #000 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Badge Row */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-5 py-3 border border-emerald-100 shadow-sm">
              <div className="w-3 h-3 bg-emerald-500 rounded-full" />
              <span className="text-emerald-700 font-semibold text-sm font-bangla">
                সরকার নিবন্ধিত
              </span>
              <Shield className="w-4 h-4 text-emerald-600" />
            </div>
            
            <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-5 py-3 border border-emerald-100 shadow-sm">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-emerald-700 font-semibold text-sm font-bangla">
                প্রতিষ্ঠা ২০১৭
              </span>
              <Award className="w-4 h-4 text-green-600" />
            </div>
            
            <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-5 py-3 border border-emerald-100 shadow-sm">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-emerald-700 font-semibold text-sm font-bangla">
                নিবন্ধন: এস-১৩১১১/২০১৯
              </span>
              <Target className="w-4 h-4 text-blue-600" />
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-bangla leading-tight">
              <span className="block mb-3">আস-সুন্নাহ</span>
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 bg-clip-text text-transparent">
                  ফাউন্ডেশন
                </span>
                <div className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-400 rounded-full" />
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-bangla leading-relaxed">
              শিক্ষা, দাওয়াহ ও পূর্ণ মানবকল্যাণে নিবেদিত একটি অরাজনৈতিক, অলাভজনক সেবামূলক প্রতিষ্ঠান
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {[
              { value: '২০১৭', label: 'প্রতিষ্ঠাকাল', color: 'bg-emerald-500' },
              { value: '১০০০+', label: 'সেবাপ্রকল্প', color: 'bg-green-500' },
              { value: '৫০+', label: 'জেলায় কার্যক্রম', color: 'bg-blue-500' },
              { value: '২০৩০', label: 'লক্ষ্যমাত্রা', color: 'bg-amber-500' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-3 h-3 rounded-full ${stat.color}`} />
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
        </div>
      </div>
    </section>
  );
}