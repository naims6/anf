'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare, Phone, Mail, Users, Heart, BookOpen } from 'lucide-react';

const faqCategories = [
  {
    id: 'general',
    label: 'সাধারণ প্রশ্ন',
    icon: HelpCircle
  },
  {
    id: 'donation',
    label: 'অনুদান সংক্রান্ত',
    icon: Heart
  },
  {
    id: 'volunteer',
    label: 'স্বেচ্ছাসেবক',
    icon: Users
  },
  {
    id: 'programs',
    label: 'কার্যক্রম',
    icon: BookOpen
  }
];

const faqItems = {
  general: [
    {
      question: 'আস-সুন্নাহ ফাউন্ডেশন কি?',
      answer: 'আস-সুন্নাহ ফাউন্ডেশন শিক্ষা, দাওয়াহ ও পূর্ণ মানবকল্যাণে নিবেদিত একটি অরাজনৈতিক, অলাভজনক সেবামূলক সরকার নিবন্ধিত প্রতিষ্ঠান। নিবন্ধন নম্বর: এস-১৩১১১/২০১৯।'
    },
    {
      question: 'প্রতিষ্ঠানটি কবে শুরু হয়?',
      answer: '২০১৭ সালে শায়খ আহমাদুল্লাহ ফাউন্ডেশনটি প্রতিষ্ঠা করেন এবং বর্তমানে চেয়ারম্যান হিসেবে প্রত্যক্ষভাবে পরিচালনা করছেন।'
    },
    {
      question: 'কিভাবে যোগাযোগ করব?',
      answer: 'ফোন: +৮৮ ০১৭১১-২৩৪৫৬৭, ইমেইল: info@assunnahfoundation.org, অথবা ওয়েবসাইটের ফর্ম ব্যবহার করে যোগাযোগ করতে পারেন।'
    },
    {
      question: 'অফিসের ঠিকানা কোথায়?',
      answer: 'বাড়ি ১২, রোড ৮, সেক্টর ১৪, উত্তরা, ঢাকা-১২৩০। রবি-বৃহস্পতি: সকাল ৯টা - সন্ধ্যা ৬টা পর্যন্ত খোলা।'
    }
  ],
  donation: [
    {
      question: 'কিভাবে অনলাইনে দান করব?',
      answer: 'আমাদের ওয়েবসাইটের "দান করুন" পেজ থেকে অনলাইন পেমেন্টের মাধ্যমে সহজেই দান করতে পারেন। বিকাশ, নগদ, রকেট ও কার্ড পেমেন্ট সাপোর্ট করা হয়।'
    },
    {
      question: 'দানের অর্থ কিভাবে ব্যয় হয়?',
      answer: 'দাতাগণ যে খাতের জন্য দান করে থাকেন, সে খাতেই ১০০% ব্যয় করা হয়। এক খাতের অর্থ অন্য খাতে ব্যয় করা হয় না।'
    },
    {
      question: 'যাকাত দিতে চাই, কিভাবে দেব?',
      answer: 'যাকাতের জন্য আলাদা তহবিল রয়েছে। যাকাতের অর্থের ১০০% হকদারদের মাঝে বণ্টন করা হয়। ব্যবস্থাপনা খরচে যাকাতের অর্থ ব্যবহার করা হয় না।'
    },
    {
      question: 'দানের রসিদ পাবো কি?',
      answer: 'হ্যাঁ, প্রতিটি দানের জন্য আমরা আনুষ্ঠানিক রসিদ প্রদান করি যা ইমেইলে পাঠানো হয় এবং প্রয়োজন হলে হার্ড কপিও দেয়া হয়।'
    }
  ],
  volunteer: [
    {
      question: 'কিভাবে স্বেচ্ছাসেবক হব?',
      answer: 'ওয়েবসাইটের "যুক্ত হোন" পেজ থেকে স্বেচ্ছাসেবক হিসেবে রেজিস্ট্রেশন করতে পারেন অথবা সরাসরি অফিসে যোগাযোগ করতে পারেন।'
    },
    {
      question: 'স্বেচ্ছাসেবকদের কি প্রশিক্ষণ দেয়া হয়?',
      answer: 'হ্যাঁ, সব স্বেচ্ছাসেবকদের বিনামূল্যে প্রশিক্ষণ প্রদান করা হয় এবং প্রয়োজনীয় উপকরণ সরবরাহ করা হয়।'
    },
    {
      question: 'শিক্ষার্থীরা স্বেচ্ছাসেবক হতে পারবে?',
      answer: 'হ্যাঁ, শিক্ষার্থীরা স্বেচ্ছাসেবক হতে পারবে। তাদের পড়ালেখার সাথে সামঞ্জস্য রেখে কাজের সময় নির্ধারণ করা হয়।'
    },
    {
      question: 'স্বেচ্ছাসেবকদের কি সুবিধা আছে?',
      answer: 'প্রশিক্ষণ, সার্টিফিকেট, অভিজ্ঞতা সার্টিফিকেট এবং বিশেষ অনুষ্ঠানে আমন্ত্রণের সুবিধা রয়েছে।'
    }
  ],
  programs: [
    {
      question: 'কি কি কার্যক্রম চালু আছে?',
      answer: 'শিক্ষা, দাওয়াহ, ত্রাণ ও পুনর্বাসন, স্বাবলম্বীকরণ, বৃক্ষরোপণ, ইফতার বিতরণ, কুরবানি, শীতবস্ত্র বিতরণসহ ১০+ কার্যক্রম চালু আছে।'
    },
    {
      question: 'কার্যক্রমে অংশগ্রহণ কিভাবে করব?',
      answer: 'ওয়েবসাইটের কার্যক্রম পৃষ্ঠা থেকে আপনার পছন্দের কার্যক্রম নির্বাচন করে অংশগ্রহণ ফর্ম পূরণ করতে পারেন।'
    },
    {
      question: 'কার্যক্রমের আপডেট কিভাবে পাব?',
      answer: 'আমাদের ওয়েবসাইট, ফেসবুক পেজ এবং ইমেইল নিউজলেটারের মাধ্যমে সব আপডেট পেতে পারেন।'
    },
    {
      question: 'বিশেষ প্রকল্পের জন্য দান করতে চাই?',
      answer: 'হ্যাঁ, আপনি নির্দিষ্ট প্রকল্পের জন্য দান করতে পারেন। দান করার সময় প্রকল্পের নাম উল্লেখ করুন।'
    }
  ]
};

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const currentFaqs = faqItems[activeCategory as keyof typeof faqItems];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-emerald-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-6 border border-emerald-100 shadow-sm">
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 font-semibold text-sm font-bangla">
                সাধারণ জিজ্ঞাসা
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-bangla">
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                সচরাচর জিজ্ঞাসিত প্রশ্ন
              </span>
            </h2>
            
            <p className="text-gray-600 max-w-2xl mx-auto font-bangla">
              আমাদের সাথে সম্পর্কিত সাধারণ প্রশ্ন ও উত্তরসমূহ
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {faqCategories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-3 px-5 py-3 rounded-xl font-semibold transition-all duration-300 font-bangla ${isActive ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'}`}
                >
                  <Icon className="w-5 h-5" />
                  {category.label}
                </button>
              );
            })}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {currentFaqs.map((faq, index) => {
              const isOpen = openItems.includes(index);

              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-50 to-green-50 flex items-center justify-center">
                          <HelpCircle className="w-4 h-4 text-emerald-600" />
                        </div>
                      </div>
                      
                      <div className="text-left">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 font-bangla">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                    
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
                  </button>
                  
                  <div className={`px-6 overflow-hidden transition-all duration-300 ${isOpen ? 'pb-5' : 'max-h-0'}`}>
                    <div className="pl-12">
                      <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                        <p className="text-gray-700 leading-relaxed font-bangla">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Still Have Questions */}
          <div className="mt-16">
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-3xl p-8 border border-emerald-100">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 font-bangla">
                    এখনও প্রশ্ন আছে?
                  </h3>
                  <p className="text-gray-700 mb-6 font-bangla">
                    আপনার প্রশ্নের উত্তর না পেলে সরাসরি আমাদের সাথে যোগাযোগ করুন। আমরা আনন্দের সাথে আপনার সব প্রশ্নের উত্তর দেব।
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="tel:+8801711234567"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold hover:opacity-90 transition-all duration-300 font-bangla"
                    >
                      <Phone className="w-5 h-5" />
                      কল করুন
                    </a>
                    
                    <a
                      href="mailto:info@assunnahfoundation.org"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-emerald-600 font-semibold border border-emerald-200 hover:bg-emerald-50 transition-all duration-300 font-bangla"
                    >
                      <Mail className="w-5 h-5" />
                      ইমেইল করুন
                    </a>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-40 h-40 rounded-full bg-gradient-to-r from-emerald-500/10 to-green-500/10 flex items-center justify-center">
                      <MessageSquare className="w-20 h-20 text-emerald-600" />
                    </div>
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