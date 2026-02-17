'use client';

import { useState } from 'react';
import { 
  BookOpen, Heart, TreePine, Home, Users, GraduationCap, 
  Droplets, ShoppingBag, Shield, Calendar, HandHeart, 
  LucideIcon
} from 'lucide-react';

import ActivitiesHeader from '@/components/view/Activities/ActivitiesHeader';
import ActivityDetailPreview from '@/components/view/Activities/ActivityDetailPreview';
import ActivityCard from '@/components/shared/Card/ActivityCard';
export const activities = [
  {
    slug: 'skill-development-institute',
    title: 'আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট',
    description: 'জাতীয় দক্ষতা উন্নয়ন কর্তৃপক্ষ কর্তৃক নিবন্ধিত একটি আত্ম-উন্নয়ন ও দক্ষতা বৃদ্ধিমূলক প্রতিষ্ঠান।',
    tag: 'নিয়মিত কার্যক্রম',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
    icon: GraduationCap,
    category: 'education',
    beneficiaries: '৫০০+ শিক্ষার্থী',
    timeline: 'সারা বছর',
    location: 'ঢাকা ও বিভাগীয় শহর',
    goal: '২০৩০ সাল নাগাদ ১ লক্ষ কর্মসংস্থান'
  },
  {
    slug: 'emergency-relief',
    title: 'দুর্যোগে ত্রাণ ও পুনর্বাসন',
    description: 'বন্যা, ঘূর্ণিঝড়, অগ্নিকাণ্ড—প্রতিটি দুর্যোগে অসহায় মানুষের পাশে আছে আস-সুন্নাহ ফাউন্ডেশন।',
    tag: 'নিয়মিত কার্যক্রম',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
    icon: Shield,
    category: 'relief',
    beneficiaries: '১০,০০০+ পরিবার',
    timeline: 'জরুরি অবস্থা',
    location: 'সমগ্র বাংলাদেশ',
    goal: 'অবিলম্বে ত্রাণ পৌঁছানো'
  },
  {
    slug: 'skill-based-entrepreneurship',
    title: 'দক্ষতাভিত্তিক উদ্যোক্তা তৈরি',
    description: 'দক্ষতা থাকা সত্ত্বেও শুধু পুঁজির অভাবে যারা উদ্যোগ নিতে পারছেন না, তাদের পাশে দাঁড়ানোর একটি মানবিক প্রয়াস।',
    tag: 'নিয়মিত কার্যক্রম',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
    icon: ShoppingBag,
    category: 'education',
    beneficiaries: '২০০+ উদ্যোক্তা',
    timeline: 'সারা বছর',
    location: 'গ্রামীণ এলাকা',
    goal: '৫০০+ উদ্যোক্তা তৈরি'
  },
  {
    slug: 'self-reliance',
    title: 'স্বাবলম্বীকরণ',
    description: 'এই কার্যক্রমের আওতায় কর্মক্ষম দরিদ্রদের উপার্জন উপকরণ দেয়া হয়।',
    tag: 'নিয়মিত কার্যক্রম',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80',
    icon: Users,
    category: 'service',
    beneficiaries: '১,০০০+ পরিবার',
    timeline: 'সারা বছর',
    location: 'দূরবর্তী গ্রাম',
    goal: 'স্থায়ী স্বাবলম্বিতা'
  },
  {
    slug: 'meritorious',
    title: 'মেধাবী কার্যক্রম',
    description: 'সৎ, দক্ষ ও মানবিক মূল্যবোধসম্পন্ন প্রজন্ম বিনির্মাণের প্রয়াস।',
    tag: 'নিয়মিত কার্যক্রম',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    icon: Heart,
    category: 'education',
    beneficiaries: '৩০০+ শিক্ষার্থী',
    timeline: 'শিক্ষাবর্ষ',
    location: 'সারাদেশ',
    goal: '৫০০+ মেধাবী শিক্ষার্থী'
  },
  {
    slug: 'dawah-education',
    title: 'দাওয়াহ কার্যক্রম',
    description: 'বিশুদ্ধ জ্ঞান ছড়িয়ে দিয়ে ইসলামী চেতনায় উজ্জীবিত করতে আস-সুন্নাহ ফাউন্ডেশনের দাওয়াহমূলক উদ্যোগ।',
    tag: 'নিয়মিত কার্যক্রম',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    icon: BookOpen,
    category: 'education',
    beneficiaries: '৫,০০০+ মানুষ',
    timeline: 'সারা বছর',
    location: 'মসজিদ ও প্রতিষ্ঠান',
    goal: '১০,০০০+ মানুষ'
  },
  {
    slug: 'tree-plantation',
    title: 'বৃক্ষরোপণ',
    description: 'গাছ লাগিয়ে সবুজ পৃথিবী গড়ার এই মহতী উদ্যোগে শামিল হতে পারেন আপনিও।',
    tag: 'নিয়মিত কার্যক্রম',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    icon: TreePine,
    category: 'seasonal',
    beneficiaries: 'পরিবেশ',
    timeline: 'বর্ষাকাল',
    location: 'উপকূলীয় এলাকা',
    goal: '১০,০০০+ গাছ'
  },
  {
    slug: 'qurbani',
    title: 'সবার জন্য কুরবানী',
    description: 'প্রান্তিক মানুষের আমিষের ঘাটতি পূরণ, ঈদের হাসি ছড়িয়ে দেয়া এবং সর্বোপরি আল্লাহর সন্তুষ্টির জন্য একটি কুরবানী করতে পারেন।',
    tag: 'ঋতুভিত্তিক',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
    icon: HandHeart,
    category: 'seasonal',
    beneficiaries: '৫,০০০+ পরিবার',
    timeline: 'ঈদুল আজহা',
    location: 'দরিদ্র অঞ্চল',
    goal: '১০,০০০ কেজি গোশত'
  },
  {
    slug: 'iftar',
    title: 'ইফতার বিতরণ',
    description: 'আপনার সহযোগিতায় আমরা দুস্থ রোযাদারদের জন্য ইফতার আয়োজন করি। আমাদের এই কল্যাণকর্মে আপনিও শরিক হোন।',
    tag: 'ঋতুভিত্তিক',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80',
    icon: Calendar,
    category: 'seasonal',
    beneficiaries: '২০,০০০+ রোযাদার',
    timeline: 'রমজান মাস',
    location: 'মসজিদ ও কমিউনিটি',
    goal: '৫০,০০০+ ইফতার'
  },
  {
    slug: 'winter-relief',
    title: 'শীতবস্ত্র বিতরণ',
    description: 'দরিদ্র মানুষের শরীরে উষ্ণতা ছড়িয়ে দিতে আমাদের আন্তরিক প্রয়াস।',
    tag: 'ঋতুভিত্তিক',
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=800&q=80',
    icon: Home,
    category: 'seasonal',
    beneficiaries: '১৫,০০০+ মানুষ',
    timeline: 'শীতকাল',
    location: 'উত্তরাঞ্চল',
    goal: '২০,০০০+ শীতবস্ত্র'
  },
  {
    slug: 'safe-drinking-water',
    title: 'নলকূপ ও পানি শোধনাগার স্থাপন',
    description: 'আপনাদের সহযোগিতায় আমরা দরিদ্র মানুষের জন্য বিশুদ্ধ পানীয় জল নিশ্চিত করছি। এই মানবিক উদ্যোগে আপনিও অংশ নিন।',
    tag: 'নিয়মিত কার্যক্রম',
    image: 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?auto=format&fit=crop&w=800&q=80',
    icon: Droplets,
    category: 'service',
    beneficiaries: '২৫,০০০+ মানুষ',
    timeline: 'সারা বছর',
    location: 'পানি সংকট এলাকা',
    goal: '১০০+ নলকূপ'
  }
];


export default function ActivitiesPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedActivity, setSelectedActivity] = useState(activities[0]);

  const filteredActivities = activities.filter(activity => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'regular') return activity.tag === 'নিয়মিত কার্যক্রম';

    if (activeFilter === 'seasonal') return activity.tag === 'ঋতুভিত্তিক';

    if (activeFilter === 'education') return activity.category === 'education';

    if (activeFilter === 'relief') return activity.category === 'relief';

    if (activeFilter === 'service') return activity.category === 'service';
    return true;
  });

  const handleActivityClick = (slug: string) => {
    const activity = activities.find(a => a.slug === slug);
    if (activity) {
      setSelectedActivity(activity);
    }
  };

  return (
    <main>
      {/* Header */}
      <ActivitiesHeader
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Grid Layout */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Activities Grid - 2/3 width */}
              <div className="lg:col-span-2">
                <div className="grid sm:grid-cols-2 gap-6">
                  {filteredActivities.map((activity) => (
                    <div
                      key={activity.slug}
                      onClick={() => handleActivityClick(activity.slug)}
                    >
                      <ActivityCard {...activity} />
                    </div>
                  ))}
                </div>

                {/* Results Count */}
                <div className="mt-12 text-center">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl px-6 py-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span className="text-emerald-700 font-semibold font-bangla">
                      {filteredActivities.length}টি কার্যক্রম পাওয়া গেছে
                    </span>
                  </div>
                </div>
              </div>

              {/* Activity Preview - 1/3 width */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <ActivityDetailPreview activity={selectedActivity} />

                  {/* Support CTA */}
                  <div className="mt-8 bg-gradient-to-r from-rose-50 to-pink-50 rounded-3xl p-6 border border-rose-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 font-bangla">
                      এই কার্যক্রমে সহযোগিতা করুন
                    </h3>
                    <p className="text-gray-700 mb-6 font-bangla">
                      আপনার দান অসংখ্য মানুষের জীবনে পরিবর্তন আনতে পারে
                    </p>

                    <button className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:shadow-lg font-bangla">
                      সহযোগিতা করুন
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-emerald-50 to-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-bangla">
                আরও কার্যক্রমে অংশগ্রহণ করতে চান?
              </h2>

              <p className="text-gray-600 mb-8 max-w-2xl mx-auto font-bangla">
                আমাদের সাথে স্বেচ্ছাসেবক হিসেবে যুক্ত হয়ে সরাসরি মানবসেবায় অংশ নিন
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg font-bangla">
                  স্বেচ্ছাসেবক হোন
                </button>

                <button className="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl border border-emerald-300 hover:bg-emerald-50 transition-all duration-300 font-bangla">
                  যোগাযোগ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}