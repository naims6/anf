"use client";

import React, { useState, useMemo } from 'react';
import { BlogPost } from '@/types/blog';
import blogDataRaw from '@/data/activities/blogs.json';
import BlogCard from '@/components/view/Blog/BlogCard';

// টাইপ কাস্টিং (JSON ডাটাকে ইন্টারফেসের সাথে মিলানো)
const blogData = blogDataRaw as BlogPost[];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // সার্চ লজিক (Title বা Category অনুযায়ী)
  const filteredPosts = useMemo(() => {
    return blogData.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header & Search Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              আমাদের ব্লগসমূহ
            </h1>
            <p className="text-gray-500 mt-2">ফাউন্ডেশনের কার্যক্রম ও গুরুত্বপূর্ণ আপডেট জানুন</p>
          </div>

          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="সার্চ করুন..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-4 top-3.5 text-gray-400">
              🔍
            </span>
          </div>
        </div>

        {/* Blog Grid logic */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          /* Clean & Professional Empty State */
          <div className="flex flex-col items-center justify-center py-24 px-6 text-center  rounded-3xl border border-dashed border-gray-300 shadow-sm">
            <div className="bg-gray-50 p-6 rounded-full mb-6">
              <svg
                className="w-16 h-16 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 4h.01"
                />
              </svg>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              কোনো ফলাফল পাওয়া যায়নি
            </h3>

            <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
              দুঃখিত, আপনার দেওয়া <span className="font-semibold text-green-600">{searchQuery}</span> শব্দের সাথে মিলে এমন কোনো ব্লগ খুঁজে পাওয়া যায়নি। দয়া করে সঠিক বানান চেক করুন অথবা ভিন্ন শব্দ ব্যবহার করুন।
            </p>

            <button
              onClick={() => setSearchQuery("")}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-green-600 hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              সার্চ ক্লিয়ার করুন
            </button>
          </div>
        )}

      </div>
    </main>
  );
}