'use client'
import { BookOpen, Heart, TreePine, Home, Users, GraduationCap, Droplets, ShoppingBag, Shield, Leaf, Calendar, HandHeart, LucideIcon, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import DefaultWeight from '@/components/shared/DefaultWeight/DefaultWeight';
import SectionHeader from '@/components/shared/SectionHeader/SectionHeader';
import { useLanguage } from '@/contexts/LanguageContext';
import bnHomepageMessages from '@/messages/bn/homepage.json'
import enHomepageMessages from '@/messages/en/homepage.json'

// Map activity slugs to icons and images

type Activity = {
  slug: string
  title: string
  description: string
  tag: string
  image: string
  icon: LucideIcon
}

const activityIcons: Record<string, any> = {
  'dawah-education': BookOpen,
  'emergency-relief': Shield,
  'iftar': Calendar,
  'winter-relief': Home,
  'tree-plantation': TreePine,
  'skill-development-institute': GraduationCap,
  'skill-based-entrepreneurship': ShoppingBag,
  'self-reliance': Users,
  'safe-drinking-water': Droplets,
  'qurbani': HandHeart,
  'meritorious': Heart
};

const activities: Activity[] = [
  {
    slug: 'skill-development-institute',
    title: 'স্কিলস ডেভেলপমেন্ট প্রজেক্ট',
    description:
      'দেশের তারুণ্য শক্তিকে কাজে লাগিয়ে দক্ষতাবৃদ্ধির মাধ্যমে সম্ভাবনার দ্বার খুলছে আন-নুসরা ফাউন্ডেশন।',
    tag: 'নিয়মিত কার্যক্রম',
    image:
      'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
    icon: GraduationCap
  },
  {
    slug: 'emergency-relief',
    title: 'ত্রাণ কার্যক্রম পুনর্বাসন প্রক্রিয়া',
    description:
      'দুর্যোগকবলিত এলাকায় প্রয়োজনীয় ত্রাণসামগ্রী পৌঁছে দিতে এবং বাস্তুহারা ও ক্ষতিগ্রস্ত মানুষের পুনর্বাসনে আন-নুসরা ফাউন্ডেশন।',
    tag: 'নিয়মিত কার্যক্রম',
    image:
      'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
    icon: Shield
  },
  {
    slug: 'skill-based-entrepreneurship',
    title: 'মক্তব পরিচালনা',
    description: 'শিশু কিশোরদের কুরআন পাঠে উপযোগী করে তোলতে মক্তবভিত্তিক শিক্ষা প্রতিষ্ঠা ও পরিচালনা করছে আন-নুসরা ফাউন্ডেশন।',
    tag: 'নিয়মিত কার্যক্রম',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
    icon: ShoppingBag
  },
  {
    slug: 'self-reliance',
    title: 'উদ্যোক্তা তৈরি ও অর্থ সহায়তা',
    description: 'হস্তশিল্প, যন্ত্রশিল্প, কারিগরি, কৃষি, খামার ব্যবস্থাপনা প্রশিক্ষণের পাশাপাশি আত্মনির্ভরশীলতার জন্য অর্থ সহায়তা প্রদান।',
    tag: 'নিয়মিত কার্যক্রম',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80',
    icon: Users
  },
  {
    slug: 'meritorious',
    title: 'দাওয়াহ কার্যক্রম',
    description: 'কুরআন-সুন্নাহ দৃষ্টিভঙ্গি সমাজের সকল শ্রেণী-পেশার মানুষের মাঝে তুলে ধরার জন্য সাপ্তাহিক, মাসিক, বার্ষিক বিষয় ভিত্তিক সভা, সেমিনার ও পাঠচক্র বৈঠক আয়োজন এবং মৌলিক ও প্রমাণ্য বইপত্র প্রকাশ ও প্রচার।',
    tag: 'নিয়মিত কার্যক্রম',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    icon: Heart
  },
  {
    slug: 'dawah-education',
    title: 'বৃক্ষরোপন',
    description: 'পরিবেশ সুরক্ষা ও স্বাবলম্বীকরণের লক্ষ্যে অধিক ফলনশীন, ঔষধি বৃক্ষরোপণ কার্যক্রম পরিচালনা।',
    tag: 'নিয়মিত কার্যক্রম',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    icon: BookOpen
  },
  {
    slug: 'tree-plantation',
    title: 'ঈদসামগ্রী',
    description:
      'পবিত্র ঈদুল ফিতর ও ঈদুল আযহার আনন্দ সবার মাঝে ছড়িয়ে দিতে পোশাক, খাদ্যদ্রব্য, কুরবানির মাংস ইত্যাদি ঈদসামগ্রী প্রদান।',
    tag: 'নিয়মিত কার্যক্রম',
    image:
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    icon: TreePine
  },
  {
    slug: 'qurbani',
    title: 'ইফতার সামগ্রী',
    description:
      'পবিত্র রমজান মাস উপলক্ষে গরীব দুঃস্থ মানুষের মাঝে ইফতার সামগ্রী বিতরণ।',
    tag: 'নিয়মিত কার্যক্রম',
    image:
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
    icon: HandHeart
  },
  {
    slug: 'iftar',
    title: 'শীতবস্ত্র বিতরণ',
    description:
      'শীতার্ত মানুষের কল্যানে কম্বল, জ্যাকেট, মাফলার, টুপি, সুয়েটারসহ নানান শীতবস্ত্র বিতরণ।',
    tag: 'নিয়মিত কার্যক্রম',
    image:
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80',
    icon: Calendar
  }
]


export default function ActivitiesSection() {

  const { locale } = useLanguage();

  const t = locale === 'bn' ? bnHomepageMessages.HomePage.ActivitiesSection : enHomepageMessages.HomePage.ActivitiesSection;

  return (
    <section>
      <DefaultWeight>

        <div className="relative bg-linear-to-b from-white via-emerald-50/10 to-white overflow-hidden">
          <div className=" relative z-10 mx-auto">
            {/* Section Header */}
            <SectionHeader
              badgeText={t.badgeText}
              title={t.title}
              description={t.description}
              icon={Star}
            />

            {/* Activities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {activities?.map((activity) => {
                const Icon = activity.icon || Heart;

                return (
                  <Link
                    key={activity.slug}
                    href={`/activities/${activity.slug}`}
                    className='group'
                  >
                    {/* Card Container */}
                    <div
                      className={`relative h-full min-h-87.5 rounded-xl overflow-hidden bg-white border shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-300/50 hover:-translate-y-2 duration-300 flex flex-col`}>
                      {/* Image Section */}
                      <div className="relative h-48 shrink-0 overflow-hidden rounded-t-xl">
                        <Image
                          src={activity?.image}
                          alt={activity.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />

                        {/* Image Overlay Gradient */}
                        <div className="absolute inset-0 bg-linear-to-t from-emerald-900/40 to-transparent" />

                        {/* Tag on Image */}
                        <div className="absolute top-4 right-4">
                          <span
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm border `}>
                            {activity.tag}
                          </span>
                        </div>

                        {/* Icon on Image */}
                        <div className="absolute bottom-4 left-4">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white/90 backdrop-blur-sm border group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-6 h-6 group-hover:text-emerald-600" />
                          </div>
                        </div>
                      </div>

                      {/* Card Content  */}
                      <div className="p-6 flex flex-col grow">
                        {/* Title */}
                        <h3
                          className={`text-xl font-bold text-gray-900 mb-3 font-bangla leading-tight line-clamp-2`}>
                          {activity.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-700 leading-relaxed mb- font-bangla text-md line-clamp-3 grow">
                          {activity.description}
                        </p>

                        {/* Action Indicator */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">

                          <span className={`text-sm font-semibold group-hover:text-emerald-600 font-bangla`}>
                            বিস্তারিত দেখুন
                          </span>
                          <div
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent text-inherit transition-all duration-300 ease-in-out group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-110"
                          >
                            <ArrowRight className="w-5 h-5 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>

                      {/* Hover Overlay */}
                      <div
                        className={` absolute inset-0 rounded-3xl bg-linear-to-br from-emerald-500 to-green-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10 `} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Custom CSS for Grid Pattern */}
          <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, #0000000a 1px, transparent 1px),
            linear-gradient(to bottom, #0000000a 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% 200%;
        }
        
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        
        .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
      `}</style>
        </div>

      </DefaultWeight>
    </section>
  );
}