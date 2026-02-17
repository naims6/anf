'use client';

import { MessageSquare, MapPin, Phone, Mail } from 'lucide-react';

export default function ContactHero() {
  return (
    <section className="relative pt-12 mb-6 bg-gradient-to-br from-emerald-50 via-white to-emerald-25">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100/20 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-6 border border-emerald-100 shadow-sm">
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span className="text-emerald-700 font-semibold text-sm font-bangla">
              যোগাযোগ করুন
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-bangla leading-tight">
            <span className="block mb-3">আমাদের সাথে</span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 bg-clip-text text-transparent">
                যোগাযোগ করুন
              </span>
              <div className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-400 rounded-full" />
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-bangla leading-relaxed">
            আপনার যেকোনো প্রশ্ন, মতামত বা সহযোগিতার জন্য আমরা সবসময় প্রস্তুত
          </p>

          {/* Quick Contact Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-3xl mx-auto">
            {[
              {
                icon: Phone,
                label: 'কল করুন',
                value: '+৮৮ ০১৭১১-২৩৪৫৬৭',
                color: 'emerald'
              },
              {
                icon: Mail,
                label: 'ইমেইল',
                value: 'info@assunnah.org',
                color: 'blue'
              },
              {
                icon: MessageSquare,
                label: 'হোয়াটসঅ্যাপ',
                value: '+৮৮ ০১৮১১-৯৮৭৬৫৪',
                color: 'green'
              },
              {
                icon: MapPin,
                label: 'অবস্থান',
                value: 'উত্তরা, ঢাকা',
                color: 'amber'
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              const colorClasses = {
                emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
                blue: 'bg-blue-50 text-blue-600 border-blue-100',
                green: 'bg-green-50 text-green-600 border-green-100',
                amber: 'bg-amber-50 text-amber-600 border-amber-100'
              };

              return (
                <div
                  key={idx}
                  className={`rounded-2xl p-4 border ${colorClasses[item.color as keyof typeof colorClasses]} hover:shadow-sm transition-shadow duration-300`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${colorClasses[item.color as keyof typeof colorClasses]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-semibold font-bangla">
                      {item.label}
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 font-bangla truncate">
                    {item.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}