'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Clock, ArrowRight, BookOpen, TrendingUp, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const blogPosts = [
  {
    id: 1,
    title: 'দুর্যোগে মানবতার বার্তা: আস-সুন্নাহ ফাউন্ডেশনের ত্রাণ কার্যক্রম',
    excerpt: 'প্রাকৃতিক দুর্যোগের সময় মানুষের পাশে দাঁড়ানো আমাদের দায়িত্ব। দেখুন কিভাবে আমরা বন্যা কবলিত অঞ্চলে সহায়তা করছি।',
    author: 'ড. আহমাদ রহমান',
    date: '২০২৪ ডিসেম্বর ১৫',
    readTime: '৫ মিনিট',
    category: 'সেবা কার্যক্রম',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    views: '২.৫K',
    comments: 45,
    slug: 'disaster-relief-bangladesh'
  },
  {
    id: 2,
    title: 'দক্ষতা উন্নয়নে আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউটের ভূমিকা',
    excerpt: 'যুবসমাজের দক্ষতা উন্নয়নে আমাদের ইনস্টিটিউট কিভাবে পরিবর্তন আনছে, জানুন সরাসরি প্রশিক্ষণার্থীদের কাছ থেকে।',
    author: 'প্রফেসর মোঃ আলী হোসেন',
    date: '২০২৪ ডিসেম্বর ১২',
    readTime: '৭ মিনিট',
    category: 'শিক্ষা',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    views: '১.৮K',
    comments: 32,
    slug: 'skill-development-institute-impact'
  },
  {
    id: 3,
    title: 'রমজানে ইফতার বিতরণ: সমাজের সুবিধাবঞ্চিতদের পাশে',
    excerpt: 'প্রতি বছর রমজান মাসে আমরা কিভাবে হাজারো দুস্থ রোযাদারকে ইফতার প্রদান করি, জানুন আমাদের বিশেষ প্রতিবেদনে।',
    author: 'শেখ মোঃ রফিকুল ইসলাম',
    date: '২০২৪ ডিসেম্বর ১০',
    readTime: '৪ মিনিট',
    category: 'রমজান',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    views: '৩.২K',
    comments: 67,
    slug: 'ramadan-iftar-distribution'
  },
  {
    id: 4,
    title: 'পরিবেশ রক্ষায় বৃক্ষরোপণ: সবুজ বাংলাদেশ গড়ার অঙ্গীকার',
    excerpt: 'জলবায়ু পরিবর্তনের প্রভাব মোকাবেলায় আমাদের বৃক্ষরোপণ কর্মসূচির সাফল্য ও ভবিষ্যৎ পরিকল্পনা।',
    author: 'ড. সুমনা আক্তার',
    date: '২০২৪ ডিসেম্বর ০৮',
    readTime: '৬ মিনিট',
    category: 'পরিবেশ',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    views: '২.১K',
    comments: 28,
    slug: 'tree-plantation-environment'
  },
  {
    id: 5,
    title: 'স্বাবলম্বীকরণ প্রকল্প: দারিদ্র্য বিমোচনে কার্যকরী পদক্ষেপ',
    excerpt: 'দরিদ্র পরিবারগুলোকে কিভাবে স্বাবলম্বী করে তোলা যায়, আমাদের প্রকল্পের সাফল্যের গল্প জানুন এখানে।',
    author: 'মোঃ আব্দুল কাদের',
    date: '২০২৪ ডিসেম্বর ০৫',
    readTime: '৮ মিনিট',
    category: 'উন্নয়ন',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    views: '১.৫K',
    comments: 39,
    slug: 'self-reliance-project-success'
  },
  {
    id: 6,
    title: 'বিশুদ্ধ পানির অধিকার: গ্রামীণ এলাকায় নলকূপ স্থাপন',
    excerpt: 'দূরবর্তী গ্রামীণ এলাকায় বিশুদ্ধ পানির সংকট নিরসনে আমাদের পদক্ষেপ ও তার সামাজিক প্রভাব বিশ্লেষণ।',
    author: 'ইঞ্জিনিয়ার রোকনুজ্জামান',
    date: '২০২৪ ডিসেম্বর ০৩',
    readTime: '৫ মিনিট',
    category: 'সেবা',
    image: 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    views: '২.৩K',
    comments: 41,
    slug: 'clean-water-project-rural'
  }
];

export default function Blog() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'start',
      skipSnaps: false,
      duration: 30
    }, 
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const [selectedBlog, setSelectedBlog] = useState(0);

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  const scrollTo = (index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  };

  return (
    <section className="relative py-10 bg-gradient-to-b from-white via-emerald-50/5 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-50/30 to-emerald-50/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-tr from-amber-50/20 to-emerald-50/20 rounded-full blur-3xl" />
        
        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(45deg, transparent 48%, #000 50%, transparent 52%)`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 rounded-full px-4 py-2 mb-6 border border-emerald-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-semibold text-sm font-bangla">
                  সর্বশেষ আপডেট
                </span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-bangla leading-tight">
              <span className="block mb-3">আমাদের</span>
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 bg-clip-text text-transparent">
                  ব্লগ ও সংবাদ
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />
              </span>
            </h2>
            
            <p className="text-lg text-gray-600 font-bangla leading-relaxed">
              ফাউন্ডেশনের কার্যক্রম, সাফল্য ও সাম্প্রতিক সংবাদ সম্পর্কে জানুন
            </p>
          </div>

          {/* View All Button */}
          <Link 
            href="/blog"
            className="group inline-flex items-center gap-3 text-emerald-600 hover:text-emerald-700 font-semibold font-bangla text-lg transition-all duration-300"
          >
            <span>সমস্ত ব্লগ দেখুন</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>

        {/* Featured Blog Card */}
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl"
          >
            <div className="grid lg:grid-cols-2">
              {/* Image Side */}
              <div className="relative h-64 lg:h-auto">
                <Image
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 via-gray-900/20 to-transparent lg:bg-gradient-to-r lg:from-gray-900/60 lg:via-gray-900/30 lg:to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-6 left-6">
                  <div className="px-4 py-2 rounded-full bg-emerald-500/90 backdrop-blur-sm">
                    <span className="text-sm font-semibold text-white font-bangla">
                      {blogPosts[0].category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <div className="flex flex-wrap items-center gap-4 text-white/80 mb-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="text-sm font-bangla">{blogPosts[0].author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-bangla">{blogPosts[0].date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-bangla">{blogPosts[0].readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 font-bangla leading-tight">
                    {blogPosts[0].title}
                  </h3>
                  
                  <p className="text-white/90 mb-6 font-bangla leading-relaxed">
                    {blogPosts[0].excerpt}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span className="text-white/80 font-bangla">{blogPosts[0].views} দেখা</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span className="text-white/80 font-bangla">{blogPosts[0].comments} মন্তব্য</span>
                  </div>
                </div>

                {/* Read More */}
                <Link
                  href={`/blog/${blogPosts[0].slug}`}
                  className="group/btn inline-flex items-center justify-between w-full lg:w-auto px-6 py-4 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white font-semibold font-bangla transition-all duration-300 hover:shadow-xl"
                >
                  <span>সম্পূর্ণ পড়ুন</span>
                  <ArrowRight className="w-5 h-5 ml-3 group-hover/btn:translate-x-2 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Blog Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-8 z-10 w-12 h-12 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label="Previous blogs"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-8 z-10 w-12 h-12 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label="Next blogs"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-6">
              {blogPosts.slice(1).map((blog, index) => (
                <motion.div
                  key={blog.id}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <article className="group h-full">
                    {/* Blog Card */}
                    <div className="h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                      {/* Image Container */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <div className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm">
                            <span className="text-xs font-semibold text-gray-800 font-bangla">
                              {blog.category}
                            </span>
                          </div>
                        </div>
                        
                        {/* Stats Overlay */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/90">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              <span className="text-xs font-bangla">{blog.views}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="w-3 h-3" />
                              <span className="text-xs font-bangla">{blog.comments}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-600 font-bangla">{blog.author}</span>
                          </div>
                          <div className="w-1 h-1 bg-gray-300 rounded-full" />
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-600 font-bangla">{blog.date}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 font-bangla line-clamp-2 leading-tight">
                          {blog.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-gray-600 mb-6 font-bangla line-clamp-2 leading-relaxed">
                          {blog.excerpt}
                        </p>

                        {/* Read Time & CTA */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm text-gray-600 font-bangla">{blog.readTime}</span>
                          </div>
                          
                          <Link
                            href={`/blog/${blog.slug}`}
                            className="group/read inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold font-bangla transition-all duration-300"
                          >
                            <span>পড়ুন</span>
                            <ArrowRight className="w-4 h-4 group-hover/read:translate-x-1 transition-transform duration-300" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {blogPosts.slice(1).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === selectedBlog 
                    ? 'bg-emerald-600 w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}