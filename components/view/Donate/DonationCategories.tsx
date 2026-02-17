'use client';

import { BookOpen, Home, Users, GraduationCap, Droplets, Calendar, TreePine, Shield } from 'lucide-react';
import { useState } from 'react';

const categories = [
  {
    id: 'education',
    title: 'শিক্ষা',
    icon: GraduationCap,
    description: 'দরিদ্র মেধাবী শিক্ষার্থীদের শিক্ষাবৃত্তি ও উপকরণ',
    amount: '৳ ৫,০০০',
    monthly: '৳ ৫০০',
    color: 'from-blue-500 to-cyan-500',
    projects: ['শিক্ষাবৃত্তি', 'উপকরণ', 'প্রশিক্ষণ']
  },
  {
    id: 'relief',
    title: 'দুর্যোগ ত্রাণ',
    icon: Shield,
    description: 'বন্যা, ঘূর্ণিঝড় ও দুর্যোগ কবলিতদের জন্য ত্রাণ',
    amount: '৳ ১০,০০০',
    monthly: '৳ ১,০০০',
    color: 'from-emerald-500 to-green-500',
    projects: ['জরুরি ত্রাণ', 'পুনর্বাসন', 'স্বাস্থ্যসেবা']
  },
  {
    id: 'water',
    title: 'নলকূপ স্থাপন',
    icon: Droplets,
    description: 'সুপেয় পানির সংকট নিরসনে নলকূপ স্থাপন',
    amount: '৳ ২৫,০০০',
    monthly: '৳ ২,৫০০',
    color: 'from-blue-500 to-indigo-500',
    projects: ['নলকূপ স্থাপন', 'পানি শোধনাগার', 'রক্ষণাবেক্ষণ']
  },
  {
    id: 'iftar',
    title: 'ইফতার বিতরণ',
    icon: Calendar,
    description: 'রমজানে দুস্থ রোযাদারদের ইফতার বিতরণ',
    amount: '৳ ৩,০০০',
    monthly: '৳ ৩০০',
    color: 'from-amber-500 to-orange-500',
    projects: ['ইফতার প্যাক', 'বিতরণ', 'আয়োজন']
  },
  {
    id: 'tree',
    title: 'বৃক্ষরোপণ',
    icon: TreePine,
    description: 'পরিবেশ রক্ষায় বৃক্ষরোপণ ও পরিচর্যা',
    amount: '৳ ৫০০',
    monthly: '৳ ৫০',
    color: 'from-green-500 to-emerald-500',
    projects: ['গাছের চারা', 'রোপণ', 'পরিচর্যা']
  },
  {
    id: 'skill',
    title: 'দক্ষতা উন্নয়ন',
    icon: Users,
    description: 'যুবক-যুবতীদের দক্ষতা উন্নয়ন প্রশিক্ষণ',
    amount: '৳ ১৫,০০০',
    monthly: '৳ ১,৫০০',
    color: 'from-violet-500 to-purple-500',
    projects: ['প্রশিক্ষণ', 'সরঞ্জাম', 'কর্মসংস্থান']
  },
  {
    id: 'orphan',
    title: 'এতিম প্রতিপালন',
    icon: Home,
    description: 'এতিম শিশুদের শিক্ষা, খাদ্য ও বাসস্থান',
    amount: '৳ ২০,০০০',
    monthly: '৳ ২,০০০',
    color: 'from-rose-500 to-pink-500',
    projects: ['শিক্ষা', 'খাদ্য', 'বাসস্থান']
  },
  {
    id: 'dawah',
    title: 'দাওয়াহ কার্যক্রম',
    icon: BookOpen,
    description: 'ইসলামী জ্ঞানের প্রচার ও প্রসার',
    amount: '৳ ৮,০০০',
    monthly: '৳ ৮০০',
    color: 'from-cyan-500 to-blue-500',
    projects: ['বই প্রকাশনা', 'সেমিনার', 'প্রশিক্ষণ']
  }
];

export default function DonationCategories() {
  const [selectedCategory, setSelectedCategory] = useState('education');

  const selectedCat = categories.find(cat => cat.id === selectedCategory);

  return (
    <section className="py-4 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6 border border-primary">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-primary font-semibold text-sm font-bangla">
                আপনার পছন্দের খাত
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-bangla">
              <span className="bg-primary bg-clip-text text-transparent">
                দানের খাত সমূহ
              </span>
            </h2>
            
            <p className="text-gray-600 max-w-2xl mx-auto font-bangla">
              আপনার দান যে খাতে ব্যয় করতে চান, সেটি নির্বাচন করুন
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left - Categories List */}
            <div className="lg:col-span-2">
              <div className="grid sm:grid-cols-2 gap-4">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isSelected = selectedCategory === category.id;

                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`relative group text-left rounded-2xl p-4 border transition-all duration-300 ${isSelected ? 'border-rose-300 bg-gradient-to-br from-rose-50 to-pink-50 shadow-md' : 'border-gray-200 hover:border-rose-200 hover:bg-rose-50/50'}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-gray-900 font-bangla">
                              {category.title}
                            </h3>
                            {isSelected && (
                              <div className="w-2 h-2 bg-rose-500 rounded-full" />
                            )}
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-3 font-bangla">
                            {category.description}
                          </p>
                          
                          <div className="flex items-center gap-4">
                            <div className="text-sm">
                              <div className="text-gray-500 font-bangla">এককালীন</div>
                              <div className="font-bold text-gray-900 font-bangla">
                                {category.amount}
                              </div>
                            </div>
                            
                            <div className="text-sm">
                              <div className="text-gray-500 font-bangla">মাসিক</div>
                              <div className="font-bold text-gray-900 font-bangla">
                                {category.monthly}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Hover Effect */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right - Selected Category Details */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-200 p-6 shadow-lg">
                {selectedCat && (
                  <>
                    {/* Selected Category Header */}
                    <div className="text-center mb-6">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedCat.color} mb-4 mx-auto`}>
                        <selectedCat.icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2 font-bangla">
                        {selectedCat.title}
                      </h3>
                      <p className="text-gray-600 text-sm font-bangla">
                        {selectedCat.description}
                      </p>
                    </div>

                    {/* Projects List */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 font-bangla">
                        প্রকল্পসমূহ
                      </h4>
                      <div className="space-y-2">
                        {selectedCat.projects.map((project, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedCat.color}`} />
                            <span className="text-gray-700 text-sm font-bangla">
                              {project}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pricing Options */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 font-bangla">
                        দানের পরিমাণ
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <button className="bg-white border border-gray-300 rounded-xl py-3 font-semibold text-gray-900 hover:border-rose-300 hover:bg-rose-50 transition-all duration-300 font-bangla">
                          {selectedCat.monthly}
                        </button>
                        <button className="bg-white border border-gray-300 rounded-xl py-3 font-semibold text-gray-900 hover:border-rose-300 hover:bg-rose-50 transition-all duration-300 font-bangla">
                          {selectedCat.amount}
                        </button>
                        <button className="col-span-2 bg-primary/10 border border-primary rounded-xl py-3 font-semibold text-primary hover:border-rose-300 transition-all duration-300 font-bangla">
                          কাস্টম অ্যামাউন্ট
                        </button>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full bg-primary hover:from-rose-600 hover:to-pink-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:shadow-lg font-bangla">
                      এই খাতে দান করুন
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}