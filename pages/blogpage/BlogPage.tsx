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

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl text-gray-500">আপনার সার্চের সাথে মিলে এমন কোনো ব্লগ পাওয়া যায়নি।</h3>
          </div>
        )}

      </div>
    </main>
  );
}