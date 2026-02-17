'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const contactInfo = [
  {
    icon: Phone,
    title: 'ফোন নম্বর',
    // +880 1817-536363
    details: ['+৮৮ ০১৮১৭-৫৩৬৩৬৩'],
    // description: 'সকাল ৯টা থেকে রাত ৯টা পর্যন্ত'
  },
  {
    icon: Mail,
    title: 'ইমেইল ঠিকানা',
    details: ['info@assunnahfoundation.org'],
    // description: '২৪ ঘণ্টার মধ্যে উত্তর পাবেন'
  },
  {
    icon: MapPin,
    title: 'অফিসের ঠিকানা',
    details: ['বিল্ডিং ১২, রোড ৮,', 'মোহাম্মদপুর, ঢাকা-১২০৭'],
    // description: 'রবি-বৃহস্পতি: সকাল ৯টা - সন্ধ্যা ৬টা'
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    
    alert('আপনার বার্তা সফলভাবে পাঠানো হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।');
  };

  return (
    <section className="relative py-10 bg-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-50/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-50/30 rounded-full blur-3xl" />
        
        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(90deg, transparent 95%, #000 100%)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-50 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
            <span className="text-emerald-700 font-semibold text-sm font-bangla">
              যোগাযোগ করুন
            </span>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-bangla leading-tight">
            <span className="block mb-3">আমাদের সাথে</span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 bg-clip-text text-transparent">
                যোগাযোগ করুন
              </span>
              <div className="absolute -bottom-2 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 font-bangla leading-relaxed max-w-2xl mx-auto">
            আপনার যেকোনো প্রশ্ন, মতামত বা সহযোগিতার জন্য আমরা সবসময় প্রস্তুত
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Contact Info & Map */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                
                return (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl border border-primary p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon Container */}
                      <div className={`
                        flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center
                        ${index === 0 ? 'bg-blue-500/10 text-blue-600' : 
                          index === 1 ? 'bg-emerald-500/10 text-emerald-600' : 
                          'bg-amber-500/10 text-amber-600'}
                      `}>
                        <Icon className="w-7 h-7" />
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 font-bangla">
                          {info.title}
                        </h3>
                        
                        <div className="space-y-1 mb-2">
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-gray-700 font-bangla">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Compact Map Section */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-bold text-gray-900 font-bangla">
                    আমাদের অবস্থান
                  </h3>
                </div>
              </div>
              
              {/* Map Container */}
              <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
                {/* Static Map Image - Replace with actual Map component */}
                <div 
                  className="absolute inset-0 bg-gray-200 flex items-center justify-center"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='%23e5e7eb' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='%23f9fafb'/%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3Ccircle cx='50%25' cy='50%25' r='12' fill='%2310b981' opacity='0.8'/%3E%3Ccircle cx='50%25' cy='50%25' r='8' fill='white'/%3E%3Ctext x='50%25' y='55%25' font-family='system-ui, sans-serif' font-size='14' text-anchor='middle' fill='%230f766e' font-weight='bold'%3Eআমরা এখানে%3C/text%3E%3C/svg%3E")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Map Pin Marker */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="w-24 h-24 bg-emerald-500/20 rounded-full animate-ping" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <p className="text-sm text-gray-700 font-bangla text-center">
                      ঢাকার উত্তরা থানাধীন, সেক্টর ১৪
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-6 border-t border-gray-100">
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="flex-1 border-emerald-500 text-emerald-600 hover:bg-emerald-50 font-bangla"
                  >
                    দিকনির্দেশনা
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:opacity-90 font-bangla"
                  >
                    শেয়ার করুন
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-8">
            {/* Form Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="w-6 h-6 text-emerald-600" />
                <h3 className="text-2xl font-bold text-gray-900 font-bangla">
                  বার্তা পাঠান
                </h3>
              </div>
              <p className="text-gray-600 font-bangla">
                নিচের ফর্মটি পূরণ করে আপনার বার্তা আমাদের কাছে পাঠিয়ে দিন
              </p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 font-bangla">
                    আপনার নাম *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 outline-none font-bangla"
                    placeholder="আপনার পূর্ণ নাম"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 font-bangla">
                    ইমেইল ঠিকানা *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 outline-none font-bangla"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              {/* Phone & Subject Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 font-bangla">
                    ফোন নম্বর *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 outline-none font-bangla"
                    placeholder="+৮৮ ০১৭১১-২৩৪৫৬৭"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 font-bangla">
                    বিষয় *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 outline-none font-bangla"
                    placeholder="বার্তার বিষয়"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 font-bangla">
                  আপনার বার্তা *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 outline-none resize-none font-bangla"
                  placeholder="আপনার বার্তাটি এখানে লিখুন..."
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full group bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-6 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl disabled:opacity-50 font-bangla"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    পাঠানো হচ্ছে...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    বার্তা পাঠান
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                )}
              </Button>
            </form>

            {/* Form Footer */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <p className="text-sm text-gray-500 text-center font-bangla">
                আমরা আপনার গোপনীয়তা রক্ষা করি। আপনার তথ্য শুধুমাত্র যোগাযোগের জন্য ব্যবহৃত হবে।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}