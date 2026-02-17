'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const contactInfo = [
  {
    icon: Phone,
    title: 'ফোন নম্বর',
    details: ['+৮৮ ০১৭১১-২৩৪৫৬৭', '+৮৮ ০১৮১১-৯৮৭৬৫৪'],
    description: 'সকাল ৯টা থেকে রাত ৯টা পর্যন্ত'
  },
  {
    icon: Mail,
    title: 'ইমেইল ঠিকানা',
    details: ['info@assunnahfoundation.org', 'support@assunnahfoundation.org'],
    description: '২৪ ঘণ্টার মধ্যে উত্তর পাবেন'
  },
  {
    icon: MapPin,
    title: 'অফিসের ঠিকানা',
    details: ['বাড়ি ১২, রোড ৮, সেক্টর ১৪', 'উত্তরা, ঢাকা-১২৩০'],
    description: 'রবি-বৃহস্পতি: সকাল ৯টা - সন্ধ্যা ৬টা'
  },
  {
    icon: Clock,
    title: 'কর্মঘণ্টা',
    details: ['শনি-বৃহস্পতি: সকাল ৯টা - সন্ধ্যা ৬টা', 'শুক্রবার: বন্ধ'],
    description: 'জরুরি অবস্থায় ২৪/৭'
  }
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className="py-4 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Form */}
            <div>
              <div className="sticky top-24">
                {/* Form Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center">
                      <Send className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 font-bangla">
                        বার্তা পাঠান
                      </h2>
                      <p className="text-gray-600 font-bangla">
                        আপনার যেকোনো প্রশ্ন বা মতামত জানাতে ফর্মটি পূরণ করুন
                      </p>
                    </div>
                  </div>
                </div>

                {/* Success Message */}
                {isSubmitted && (
                  <div className="mb-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-4 border border-emerald-200">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-emerald-600" />
                      <div>
                        <div className="font-semibold text-emerald-700 font-bangla">
                          বার্তা সফলভাবে পাঠানো হয়েছে!
                        </div>
                        <div className="text-sm text-emerald-600 font-bangla">
                          আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email */}
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
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 outline-none font-bangla bg-gray-50/50"
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
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 outline-none font-bangla bg-gray-50/50"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>

                  {/* Phone & Subject */}
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
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 outline-none font-bangla bg-gray-50/50"
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
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 outline-none font-bangla bg-gray-50/50"
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
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 outline-none resize-none font-bangla bg-gray-50/50"
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
                      <span className="flex items-center justify-center gap-3">
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

                {/* Privacy Note */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500 font-bangla">
                    আমরা আপনার গোপনীয়তা রক্ষা করি। আপনার তথ্য শুধুমাত্র যোগাযোগের জন্য ব্যবহৃত হবে।
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Map & Contact Info */}
            <div className="space-y-8">
              {/* Interactive Map */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
                {/* Map Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 font-bangla">
                        আমাদের অবস্থান
                      </h3>
                      <p className="text-gray-600 font-bangla text-sm">
                        ঢাকার উত্তরা থানাধীন, সেক্টর ১৪
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map Container */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200">
                  {/* Map SVG */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='%2394a3b8' stroke-width='1' opacity='0.3'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='%23f8fafc'/%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3Ccircle cx='50%25' cy='50%25' r='20' fill='%2310b981' opacity='0.8'/%3E%3Ccircle cx='50%25' cy='50%25' r='10' fill='white'/%3E%3C/svg%3E")`,
                      backgroundSize: 'cover'
                    }}
                  />

                  {/* Location Marker */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="w-16 h-16 bg-emerald-500/20 rounded-full animate-pulse" />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Actions */}
                <div className="p-6 border-t border-gray-200">
                  <div className="flex gap-4">
                    <a
                      href="https://maps.google.com/?q=উত্তরা,+ঢাকা"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-4 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold transition-all duration-300 font-bangla"
                    >
                      দিকনির্দেশনা
                    </a>
                    <a
                      href="#"
                      className="flex-1 text-center px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:opacity-90 font-semibold transition-all duration-300 font-bangla"
                    >
                      শেয়ার করুন
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Information Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  const colorClasses = [
                    'bg-emerald-50 border-emerald-100 text-emerald-600',
                    'bg-blue-50 border-blue-100 text-blue-600',
                    'bg-green-50 border-green-100 text-green-600',
                    'bg-amber-50 border-amber-100 text-amber-600'
                  ];

                  return (
                    <div
                      key={index}
                      className={`rounded-2xl border p-6 ${colorClasses[index]} hover:shadow-sm transition-all duration-300`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${colorClasses[index]} bg-white/50`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-2 font-bangla">
                            {info.title}
                          </h4>
                          
                          <div className="space-y-1 mb-3">
                            {info.details.map((detail, idx) => (
                              <p key={idx} className="text-gray-700 font-bangla text-sm">
                                {detail}
                              </p>
                            ))}
                          </div>

                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span className="font-bangla">{info.description}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Emergency Contact */}
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-3xl border border-rose-100 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1 font-bangla">
                      জরুরি যোগাযোগ
                    </h4>
                    <p className="text-gray-700 text-sm mb-2 font-bangla">
                      জরুরি প্রয়োজনে ২৪/৭ কল করুন
                    </p>
                    <div className="text-lg font-bold text-rose-600 font-bangla">
                      +৮৮ ০১৭১১-৯৮৭৬৫৪
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}