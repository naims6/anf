'use client';

import { CreditCard, Smartphone, Banknote, QrCode, Shield, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const paymentMethods = [
  {
    id: 'bkash',
    name: 'বিকাশ',
    icon: Smartphone,
    description: 'সর্বাধিক জনপ্রিয় মোবাইল ব্যাংকিং',
    color: 'from-pink-500 to-rose-500',
    steps: ['বিকাশ এপ ওপেন করুন', '*247# ডায়াল করুন', 'আমাদের মার্চেন্ট নম্বর ব্যবহার করুন'],
    number: '০১৭১১-২৩৪৫৬৭',
    type: 'Personal'
  },
  {
    id: 'nagad',
    name: 'নগদ',
    icon: Smartphone,
    description: 'দ্রুত ও নিরাপদ লেনদেন',
    color: 'from-red-500 to-orange-500',
    steps: ['নগদ অ্যাপ ওপেন করুন', 'Send Money সিলেক্ট করুন', 'আমাদের নম্বরে পাঠান'],
    number: '০১৮১১-৯৮৭৬৫৪',
    type: 'Personal'
  },
  {
    id: 'rocket',
    name: 'রকেট',
    icon: Smartphone,
    description: 'DBBL মোবাইল ব্যাংকিং',
    color: 'from-blue-500 to-cyan-500',
    steps: ['রকেট অ্যাপ ব্যবহার করুন', 'Send Money সিলেক্ট করুন', 'আমাদের একাউন্টে পাঠান'],
    number: '০১৭৩০-১২৩৪৫৬',
    type: 'Merchant'
  },
  {
    id: 'card',
    name: 'ক্রেডিট/ডেবিট কার্ড',
    icon: CreditCard,
    description: 'আন্তর্জাতিক কার্ড গ্রহণযোগ্য',
    color: 'from-purple-500 to-violet-500',
    steps: ['কার্ড নম্বর দিন', 'CVV ও এক্সপায়ারি তারিখ', 'OTP এর মাধ্যমে নিশ্চিত করুন'],
    number: '',
    type: 'Secure'
  },
  {
    id: 'bank',
    name: 'ব্যাংক ট্রান্সফার',
    icon: Banknote,
    description: 'সরাসরি ব্যাংক একাউন্টে',
    color: 'from-emerald-500 to-green-500',
    steps: ['আমাদের ব্যাংক একাউন্টে টাকা পাঠান', 'রেফারেন্স হিসেবে আপনার নাম দিন', 'স্লিপটি আমাদের পাঠান'],
    number: '',
    type: 'Direct'
  }
];

export default function DonationMethods() {
  const [selectedMethod, setSelectedMethod] = useState('bkash');

  const selectedPayment = paymentMethods.find(method => method.id === selectedMethod);
  const Icon = selectedPayment?.icon || Smartphone;

  return (
    <section className="py-5 bg-gradient-to-b from-white to-rose-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-6 border border-rose-100 shadow-sm">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-primary font-semibold text-sm font-bangla">
                নিরাপদ পেমেন্ট
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-bangla">
              <span className="bg-primary bg-clip-text text-transparent">
                দানের মাধ্যম
              </span>
            </h2>
            
            <p className="text-gray-600 max-w-2xl mx-auto font-bangla">
              আপনার পছন্দের মাধ্যম বেছে নিয়ে সহজেই দান করুন
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Payment Methods */}
            <div>
              <div className="space-y-4">
                {paymentMethods.map((method) => {
                  const MethodIcon = method.icon;
                  const isSelected = selectedMethod === method.id;

                  return (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`w-full text-left rounded-2xl p-5 border transition-all duration-300 ${isSelected ? 'border-rose-300 bg-gradient-to-r from-rose-50 to-pink-50 shadow-md' : 'border-gray-200 hover:border-rose-200 hover:bg-rose-50/30'}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center`}>
                            <MethodIcon className="w-6 h-6 text-white" />
                          </div>
                          
                          <div>
                            <h3 className="font-bold text-gray-900 mb-1 font-bangla">
                              {method.name}
                            </h3>
                            <p className="text-sm text-gray-600 font-bangla">
                              {method.description}
                            </p>
                          </div>
                        </div>
                        
                        {isSelected && (
                          <CheckCircle className="w-6 h-6 text-rose-500" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Security Features */}
              <div className="mt-8 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-emerald-600" />
                  <h4 className="font-bold text-gray-900 font-bangla">
                    নিরাপত্তা গ্যারান্টি
                  </h4>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span className="text-sm text-gray-700 font-bangla">
                      ২৫৬-বিট SSL এনক্রিপশন
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span className="text-sm text-gray-700 font-bangla">
                      PCI DSS কমপ্লায়েন্ট
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span className="text-sm text-gray-700 font-bangla">
                      নিরাপদ পেমেন্ট গেটওয়ে
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Selected Method Instructions */}
            <div>
              <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-lg sticky top-24">
                {selectedPayment && (
                  <>
                    {/* Method Header */}
                    <div className="text-center mb-8">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedPayment.color} mb-4`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 font-bangla">
                        {selectedPayment.name}
                      </h3>
                      <p className="text-gray-600 font-bangla">
                        {selectedPayment.description}
                      </p>
                    </div>

                    {/* Account Number */}
                    {selectedPayment.number && (
                      <div className="mb-8">
                        <div className="text-center">
                          <div className="text-sm text-gray-500 mb-2 font-bangla">
                            আমাদের {selectedPayment.name} নম্বর
                          </div>
                          <div className="text-2xl font-bold text-gray-900 bg-gray-50 rounded-xl py-3 px-4 font-bangla">
                            {selectedPayment.number}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Steps */}
                    <div className="mb-8">
                      <h4 className="font-bold text-gray-900 mb-4 font-bangla">
                        কিভাবে দান করবেন:
                      </h4>
                      <div className="space-y-4">
                        {selectedPayment.steps.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-r from-rose-50 to-pink-50 flex items-center justify-center">
                              <div className="text-sm font-bold text-rose-600">
                                {idx + 1}
                              </div>
                            </div>
                            
                            <p className="text-gray-700 leading-relaxed font-bangla">
                              {step}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* QR Code Section */}
                    <div className="mb-8">
                      <div className="bg-gray-50 rounded-2xl p-6 text-center">
                        <div className="inline-flex items-center justify-center w-40 h-40 bg-white rounded-xl mb-4 mx-auto border border-gray-200">
                          <QrCode className="w-32 h-32 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-600 font-bangla">
                          QR কোড স্ক্যান করে সহজেই দান করুন
                        </p>
                      </div>
                    </div>

                    {/* Important Notes */}
                    <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                            <span className="text-white text-sm font-bold">!</span>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-amber-800 mb-1 font-bangla">
                            দ্রষ্টব্য
                          </h5>
                          <p className="text-sm text-amber-700 font-bangla">
                            লেনদেন শেষে রেফারেন্স হিসেবে "দান" লিখুন এবং রসিদের জন্য রিসিপ্ট নম্বর আমাদের ইমেইল করুন।
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}