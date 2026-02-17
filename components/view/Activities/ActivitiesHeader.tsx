'use client';

import { Activity, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActivitiesHeaderProps {
  title?: string;
  description?: string;
  showFilters?: boolean;
  onFilterChange?: (filter: string) => void;
  activeFilter?: string;
}

export default function ActivitiesHeader({
  title = "কার্যক্রমসমূহ",
  description = "মানুষের সার্বিক কল্যাণ ও সামাজিক উন্নয়নে আস-সুন্নাহ ফাউন্ডেশনের নানা রকম কার্যক্রম চলমান রয়েছে। প্রতিটি কার্যক্রম পরিচালিত হয় স্বচ্ছতা, জবাবদিহিতা ও সর্বোচ্চ মানের নিশ্চয়তা নিয়ে।",
  showFilters = true,
  onFilterChange,
  activeFilter = 'all'
}: ActivitiesHeaderProps) {
  const filters = [
    { id: 'all', label: 'সকল কার্যক্রম' },
    { id: 'regular', label: 'নিয়মিত কার্যক্রম' },
    { id: 'seasonal', label: 'ঋতুভিত্তিক' },
    { id: 'education', label: 'শিক্ষা' },
    { id: 'relief', label: 'ত্রাণ' },
    { id: 'service', label: 'সেবা' }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-50 py-10">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-100/20 rounded-full blur-3xl" />
        
        {/* Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%2310b981' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: '300px 300px'
            }}
          />
        </div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Content */}
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-5 py-3 border border-emerald-100 shadow-sm mb-8">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" />
              <span className="text-emerald-700 font-semibold text-sm font-bangla">
                মানুষের সেবায় নিরলস
              </span>
            </div>
            <div className="w-1 h-1 bg-emerald-300 rounded-full" />
            <div className="text-emerald-600 text-sm font-bangla">
              ১১+ সক্রিয় কার্যক্রম
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-bangla leading-tight">
            <span className="block mb-3">আমাদের</span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 bg-clip-text text-transparent">
                {title}
              </span>
              <div className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-400 rounded-full" />
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-bangla leading-relaxed">
            {description}
          </p>
        </div>

        {/* Filter Section */}
        {showFilters && (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold text-gray-700 font-bangla">
                  ফিল্টার করুন:
                </span>
              </div>
              
              <div className="text-sm text-gray-500 font-bangla">
                ১১টি কার্যক্রম
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => onFilterChange?.(filter.id)}
                  className={`
                    px-5 py-2.5 rounded-xl font-medium transition-all duration-300 font-bangla
                    ${activeFilter === filter.id 
                      ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg' 
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'
                    }
                  `}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}