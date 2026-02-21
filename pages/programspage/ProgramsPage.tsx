"use client";

import React from 'react';
import { 
  BookOpen, 
  HeartPulse, 
  Briefcase, 
  Leaf, 
  Droplets, 
  Users,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

// প্রোগ্রামের ডাটা স্ট্রাকচার
const programs = [
  {
    id: 1,
    title: "শিক্ষা ও দক্ষতা উন্নয়ন",
    description: "দরিদ্র ও মেধাবী শিক্ষার্থীদের বৃত্তি এবং আস-সুন্নাহ স্কিল ডেভেলপমেন্টের মাধ্যমে কারিগরি প্রশিক্ষণ প্রদান।",
    icon: <BookOpen className="w-8 h-8" />,
    color: "bg-blue-50 text-blue-600",
    link: "/programs/education"
  },
  {
    id: 2,
    title: "স্বাবলম্বীকরণ প্রকল্প",
    description: "দরিদ্র পরিবারগুলোকে রিকশা, সেলাই মেশিন বা ক্ষুদ্র ব্যবসার পুঁজি দিয়ে স্থায়ীভাবে অভাবমুক্ত করা।",
    icon: <Briefcase className="w-8 h-8" />,
    color: "bg-orange-50 text-orange-600",
    link: "/programs/self-reliance"
  },
  {
    id: 3,
    title: "স্বাস্থ্য ও চিকিৎসা সেবা",
    description: "অসহায় রোগীদের চিকিৎসা সহায়তা, ফ্রি মেডিকেল ক্যাম্প এবং জরুরি ঔষধ সরবরাহ নিশ্চিত করা।",
    icon: <HeartPulse className="w-8 h-8" />,
    color: "bg-red-50 text-red-600",
    link: "/programs/health"
  },
  {
    id: 4,
    title: "বিশুদ্ধ পানি প্রকল্প",
    description: "দেশের প্রত্যন্ত ও উপকূলীয় অঞ্চলে আর্সেনিকমুক্ত বিশুদ্ধ পানির জন্য গভীর নলকূপ স্থাপন।",
    icon: <Droplets className="w-8 h-8" />,
    color: "bg-sky-50 text-sky-600",
    link: "/programs/water"
  },
  {
    id: 5,
    title: "পরিবেশ ও বৃক্ষরোপণ",
    description: "জলবায়ু পরিবর্তনের প্রভাব মোকাবিলায় প্রতি বছর দেশব্যাপী লক্ষাধিক ফলজ ও বনজ বৃক্ষরোপণ।",
    icon: <Leaf className="w-8 h-8" />,
    color: "bg-green-50 text-green-600",
    link: "/programs/environment"
  },
  {
    id: 6,
    title: "দুর্যোগ ব্যবস্থাপনা",
    description: "বন্যা, ঘূর্ণিঝড় বা যেকোনো প্রাকৃতিক দুর্যোগে ক্ষতিগ্রস্তদের কাছে দ্রুত ত্রাণ ও সহায়তা পৌঁছে দেওয়া।",
    icon: <Users className="w-8 h-8" />,
    color: "bg-purple-50 text-purple-600",
    link: "/programs/relief"
  }
];

const ProgramsPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-50 py-16 md:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
            আমাদের <span className="text-green-600">স্থায়ী প্রকল্পসমূহ</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            আস-সুন্নাহ ফাউন্ডেশন কেবল সাময়িক সহায়তা নয়, বরং মানুষের জীবনমান উন্নয়নে টেকসই ও দীর্ঘমেয়াদী পরিকল্পনা নিয়ে কাজ করে যাচ্ছে।
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs?.map((program) => (
            <div 
              key={program.id}
              className="group p-8 rounded-3xl border border-gray-100 bg-white hover:border-green-200 hover:shadow-2xl hover:shadow-green-100 transition-all duration-300 flex flex-col items-start"
            >
              {/* Icon Container */}
              <div className={`p-4 rounded-2xl mb-6 transition-transform group-hover:scale-110 duration-300 ${program.color}`}>
                {program.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-700 transition-colors">
                {program.title}
              </h3>

              <p className="text-gray-600 leading-relaxed mb-6">
                {program.description}
              </p>

              <Link 
                href={program.link}
                className="mt-auto flex items-center font-semibold text-green-600 hover:text-green-700 transition-all group/link"
              >
                বিস্তারিত দেখুন
                <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Section / Call to Action */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto bg-green-600 rounded-[2.5rem] p-8 md:p-16 text-center text-white shadow-xl shadow-green-100">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">
            মানবতার সেবায় আপনিও আমাদের অংশীদার হোন
          </h2>
          <p className="text-green-50 mb-10 text-lg opacity-90">
            আপনার ছোট একটি অবদান বদলে দিতে পারে একটি অবহেলিত মানুষের ভবিষ্যৎ। আজই আপনার পছন্দের প্রজেক্টে ডোনেট করুন।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg active:scale-95">
              অনদান দিন
            </button>
            <button className="bg-green-700 border border-green-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-800 transition-all active:scale-95">
              ভলান্টিয়ার হিসেবে যুক্ত হোন
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramsPage;