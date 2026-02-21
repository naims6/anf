import React from 'react';
import { BlogPost } from '@/types/blog';
import Image from 'next/image';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-56 w-full overflow-hidden">
       <Image
          src={post.image}
          alt={post.title}
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          priority={post.id <= 3}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col grow">
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime} পড়া</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-700 transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">✍️ {post.author}</span>
          <div className="flex items-center gap-3 text-gray-400 text-xs">
            <span>👁️ {post.views}</span>
            <span>💬 {post.comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;