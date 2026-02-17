'use client'
import { BookOpen, Heart, TreePine, Home, Users, GraduationCap, Droplets, ShoppingBag, Shield, Leaf, Calendar, HandHeart, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

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
    title: 'আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট',
    description:
      'জাতীয় দক্ষতা উন্নয়ন কর্তৃপক্ষ কর্তৃক নিবন্ধিত একটি আত্ম-উন্নয়ন ও দক্ষতা বৃদ্ধিমূলক প্রতিষ্ঠান।',
    tag: 'নিয়মিত কার্যক্রম',
    image:
      'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
    icon: GraduationCap
  },
  {
    slug: 'emergency-relief',
    title: 'দুর্যোগে ত্রাণ ও পুনর্বাসন',
    description:
      'বন্যা, ঘূর্ণিঝড়, অগ্নিকাণ্ড—প্রতিটি দুর্যোগে অসহায় মানুষের পাশে আছে আস-সুন্নাহ ফাউন্ডেশন।',
    tag: 'নিয়মিত কার্যক্রম',
    image:
      'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
    icon: Shield
  },
  { slug: 'skill-based-entrepreneurship', title: 'দক্ষতাভিত্তিক উদ্যোক্তা তৈরি', description: 'দক্ষতা থাকা সত্ত্বেও শুধু পুঁজির অভাবে যারা উদ্যোগ নিতে পারছেন না, তাদের পাশে দাঁড়ানোর একটি মানবিক প্রয়াস।', tag: 'নিয়মিত কার্যক্রম', image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80', icon: ShoppingBag },

  { slug: 'self-reliance', title: 'স্বাবলম্বীকরণ', description: 'এই কার্যক্রমের আওতায় কর্মক্ষম দরিদ্রদের উপার্জন উপকরণ দেয়া হয়।', tag: 'নিয়মিত কার্যক্রম', image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80', icon: Users },

  { slug: 'meritorious', title: 'মেধাবী কার্যক্রম', description: 'সৎ, দক্ষ ও মানবিক মূল্যবোধসম্পন্ন প্রজন্ম বিনির্মাণের প্রয়াস।', tag: 'নিয়মিত কার্যক্রম', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80', icon: Heart },

  { slug: 'dawah-education', title: 'দাওয়াহ কার্যক্রম', description: 'বিশুদ্ধ জ্ঞান ছড়িয়ে দিয়ে ইসলামী চেতনায় উজ্জীবিত করতে আস-সুন্নাহ ফাউন্ডেশনের দাওয়াহমূলক উদ্যোগ।', tag: 'নিয়মিত কার্যক্রম', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80', icon: BookOpen },

  {
    slug: 'tree-plantation',
    title: 'বৃক্ষরোপণ',
    description:
      'গাছ লাগিয়ে সবুজ পৃথিবী গড়ার এই মহতী উদ্যোগে শামিল হতে পারেন আপনিও।',
    tag: 'নিয়মিত কার্যক্রম',
    image:
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    icon: TreePine
  },
  {
    slug: 'qurbani',
    title: 'সবার জন্য কুরবানী',
    description:
      'প্রান্তিক মানুষের আমিষের ঘাটতি পূরণ, ঈদের হাসি ছড়িয়ে দেয়া এবং সর্বোপরি আল্লাহর সন্তুষ্টির জন্য একটি কুরবানী করতে পারেন।',
    tag: 'নিয়মিত কার্যক্রম',
    image:
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
    icon: HandHeart
  },
  {
    slug: 'iftar',
    title: 'ইফতার বিতরণ',
    description:
      'আপনার সহযোগিতায় আমরা দুস্থ রোযাদারদের জন্য ইফতার আয়োজন করি। আমাদের এই কল্যাণকর্মে আপনিও শরিক হোন।',
    tag: 'নিয়মিত কার্যক্রম',
    image:
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80',
    icon: Calendar
  },
  {
    slug: 'winter-relief',
    title: 'শীতবস্ত্র বিতরণ',
    description:
      'দরিদ্র মানুষের শরীরে উষ্ণতা ছড়িয়ে দিতে আমাদের আন্তরিক প্রয়াস।',
    tag: 'নিয়মিত কার্যক্রম',
    image:
      'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=800&q=80',
    icon: Home
  },
  {
    slug: 'safe-drinking-water',
    title: 'নলকূপ ও পানি শোধনাগার স্থাপন',
    description:
      'আপনাদের সহযোগিতায় আমরা দরিদ্র মানুষের জন্য বিশুদ্ধ পানীয় জল নিশ্চিত করছি। এই মানবিক উদ্যোগে আপনিও অংশ নিন।',
    tag: 'নিয়মিত কার্যক্রম',
    image:
      'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?auto=format&fit=crop&w=800&q=80',
    icon: Droplets
  }
]



export default function ActivitiesSection() {
  return (
    <section className="relative py-10 bg-gradient-to-b from-white via-emerald-50/10 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 -left-20 w-80 h-80 bg-gradient-to-br from-blue-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-gradient-to-tr from-emerald-100/30 to-transparent rounded-full blur-3xl" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

        {/* Decorative Lines */}
        <div className="absolute top-40 left-10 right-10 h-px bg-gradient-to-r from-transparent via-emerald-200/50 to-transparent" />
        <div className="absolute bottom-40 left-10 right-10 h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent" />
      </div>

      <div className=" relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl px-6 py-3 border border-emerald-200 mb-4">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-emerald-700 font-semibold text-sm tracking-wide font-bangla">
              মানুষের সেবায় নিরলস
            </span>
          </div>

          {/* Main Title */}
          <h2 className="text-5xl font-bold text-gray-900 mb-8 font-bangla leading-tight">
            <span className="block pb-4 border-b-4 border-emerald-500/30 inline-block">
              চলমান
            </span>
            <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 bg-clip-text text-transparent">
              কার্যক্রমসমূহ
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-bangla leading-relaxed">
            মানুষের সার্বিক কল্যাণ ও সামাজিক উন্নয়নে আস-সুন্নাহ ফাউন্ডেশনের নানা রকম কার্যক্রম চলমান রয়েছে।
            প্রতিটি কার্যক্রম পরিচালিত হয় স্বচ্ছতা, জবাবদিহিতা ও সর্বোচ্চ মানের নিশ্চয়তা নিয়ে।
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {activities.map((activity) => {
            const Icon = activity.icon || Heart;

            return (
              <Link
                key={activity.slug}
                href={`/activities/${activity.slug}`}
                className="group block"
              >
                {/* Card Container */}
                <div className={`
                  relative h-full min-h-[350px] rounded-3xl overflow-hidden
                  bg-white border-2 border-emerald-200
                  shadow-xl shadow-gray-200/50
                  transition-all duration-300 ease-in-out
                  hover:shadow-2xl hover:shadow-gray-300/50
                  hover:-translate-y-2
                  bg-emerald-50 flex flex-col
                `}>
                  {/* Image Section */}
                  <div className="relative h-48 flex-shrink-0 overflow-hidden rounded-t-3xl">
                    <Image
                      src={activity?.image}
                      alt={activity.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Image Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent" />

                    {/* Tag on Image */}
                    <div className="absolute top-4 right-4">
                      <span className={`
                        px-4 py-1.5 rounded-full text-xs font-semibold
                        bg-white/90 backdrop-blur-sm border border-emerald-200 text-emerald-700
                      `}>
                        {activity.tag}
                      </span>
                    </div>

                    {/* Icon on Image */}
                    <div className="absolute bottom-4 left-4">
                      <div className={`
                        w-12 h-12 rounded-xl flex items-center justify-center
                        bg-white/90 backdrop-blur-sm border border-emerald-200
                        group-hover:scale-110 transition-transform duration-300
                      `}>
                        <Icon className="w-6 h-6 text-emerald-600" />
                      </div>
                    </div>
                  </div>

                  {/* Gradient Top Bar */}
                  <div className={`h-1 w-full bg-gradient-to-r from-emerald-500 to-green-500 flex-shrink-0`} />

                  {/* Card Content - Flex column to push action indicator to bottom */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Title */}
                    <h3 className={`
                      text-xl font-bold text-gray-900 mb-3 font-bangla
                      leading-tight group-hover:text-emerald-600 transition-colors duration-300
                      line-clamp-2
                    `}>
                      {activity.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed mb- font-bangla text-md line-clamp-3 flex-grow">
                      {activity.description}
                    </p>

                    {/* Action Indicator - This will now be at the bottom */}
                    <div className="flex items-center justify-between  pt-4 border-t border-gray-100">
                      <span className={`text-sm font-semibold text-emerald-600 font-bangla`}>
                        বিস্তারিত দেখুন
                      </span>
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        bg-gradient-to-r from-emerald-500 to-green-500
                        text-white group-hover:scale-110 transition-all duration-300
                      `}>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Corner Accents */}
                  <div className={`absolute top-52 right-4 w-12 h-12 border-t-2 border-r-2 border-emerald-200 rounded-tr-3xl`} />
                  <div className={`absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-emerald-200 rounded-bl-3xl`} />

                  {/* Hover Overlay */}
                  <div className={`
                    absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500 to-green-500
                    opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10
                  `} />
                </div>

                {/* Background Glow on Hover */}
                <div className={`
                  absolute -inset-4 rounded-3xl bg-gradient-to-br from-emerald-500 to-green-500
                  opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 -z-20
                `} />
              </Link>
            );
          })}
        </div>

        {/* CTA Section */}
        <Link className='flex justify-center items-center' href="/activities">
          <Button
            size="lg"
            className="group bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-12 py-7 text-xl font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 font-bangla min-w-[230px]"
          >
            <span>কার্যক্রমসমূহ</span>
            <svg className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Button>
        </Link>
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
    </section>
  );
}