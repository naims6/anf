'use client';

import { ActivityDetailPreviewProps } from '@/types/activity';
import { Users, Calendar, MapPin, Target } from 'lucide-react';



export default function ActivityDetailPreview({ activity }: ActivityDetailPreviewProps) {
  const stats = [
    {
      icon: Users,
      label: 'সুবিধাভোগী',
      value: activity.beneficiaries,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: Calendar,
      label: 'সময়কাল',
      value: activity.timeline,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      icon: MapPin,
      label: 'অবস্থান',
      value: activity.location,
      color: 'bg-amber-50 text-amber-600'
    },
    {
      icon: Target,
      label: 'লক্ষ্যমাত্রা',
      value: activity.goal,
      color: 'bg-rose-50 text-rose-600'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-white to-emerald-50/30 rounded-3xl border border-gray-100 p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 font-bangla">
          কার্যক্রম বিবরণ
        </h2>
        <p className="text-gray-700 leading-relaxed font-bangla">
          {activity.description}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2  gap-4 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          
          return (
            <div
              key={idx}
              className={`rounded-2xl p-4 ${stat.color.split(' ')[0]} border border-gray-100`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg ${stat.color.split(' ')[0]} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 font-bangla">
                    {stat.label}
                  </div>
                  <div className="font-bold text-gray-900 font-bangla">
                    {stat.value}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Key Features */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-4 font-bangla">
          প্রধান বৈশিষ্ট্য
        </h3>
        <div className="space-y-3">
          {[
            '১০০% স্বচ্ছতা নিশ্চিত',
            'সরাসরি সুবিধাভোগীর কাছে পৌঁছানো',
            'নিয়মিত মনিটরিং',
            'বিস্তারিত প্রতিবেদন'
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-500" />
              <span className="text-gray-700 font-bangla">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}