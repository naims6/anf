'use client';

import { useState } from 'react';
import { Phone, Mail, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import enMessages from '@/messages/en.json';
import bnMessages from '@/messages/bn.json';

const donationFunds = [
  { value: 'zakat', label: 'যাকাত' },
  { value: 'sadaqah', label: 'সাদাকাহ' },
  { value: 'education', label: 'শিক্ষা তহবিল' },
  { value: 'emergency', label: 'জরুরী তহবিল' },
  { value: 'winter', label: 'শীতবার্তা তহবিল' },
  { value: 'qurbani', label: 'কুরবানি তহবিল' },
];

export default function DonationCard() {
  const [selectedFund, setSelectedFund] = useState('');
  const [amount, setAmount] = useState('');
  const [contact, setContact] = useState('');

  // Get translations based on current locale
  const { locale } = useLanguage();
  const t = locale === 'bn' ? bnMessages.HomePage.DonationCard : enMessages.HomePage.DonationCard;

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ selectedFund, amount, contact });
    // Handle donation logic
  };

  return (
    <div className="bg-white/75 backdrop-blur-xl rounded-2xl border border-primary p-6 md:w-[90%] mx-auto pb-10 relative overflow-hidden group">

      {/* Modern Badge & Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/10 backdrop-blur-[2px]">
        <div className="bg-emerald-600/90 backdrop-blur-md text-white px-6 py-2 rounded-full shadow-xl border border-white/20 flex items-center gap-2 transform transition-transform duration-300 hover:cursor-wait">
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-200"></span>
          <p className="font-bangla text-sm font-medium">
            {t.alert}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="blur-[1px] opacity-80">
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 font-bangla">
            আপনার অনুদান প্রদান করুন
          </h3>
        </div>

        <form onSubmit={handleDonate} className="space-y-4 md:space-y-0 md:flex md:items-end md:gap-4">
          {/* Fund Selection */}
          <div className="space-y-2 md:flex-1">
            <Label htmlFor="fund" className="text-sm font-semibold text-gray-700 font-bangla">
              তহবিল নির্বাচন করুন
            </Label>
            <Select value={selectedFund} onValueChange={setSelectedFund}>
              <SelectTrigger className="w-full h-12 rounded-xl border-gray-300 bg-white/80 font-bangla text-gray-700 shadow-sm transition-all">
                <SelectValue placeholder="তহবিল নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border border-gray-200 shadow-lg bg-white font-bangla">
                {donationFunds?.map((fund) => (
                  <SelectItem key={fund.value} value={fund.value} className="font-bangla text-gray-700 hover:bg-emerald-50 focus:bg-emerald-50 cursor-pointer">
                    {fund.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Contact Input */}
          <div className="space-y-2 md:flex-1">
            <Label htmlFor="contact" className="text-sm font-semibold text-gray-700 font-bangla">
              ফোন নম্বর বা ইমেইল
            </Label>
            <div className="relative">
              <Input
                id="contact"
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="pl-11 h-12 rounded-xl border-gray-300 bg-white/80 font-bangla text-gray-700 shadow-sm"
                required
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {contact.includes('@') ? <Mail className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
              </div>
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2 md:flex-1">
            <Label htmlFor="amount" className="text-sm font-semibold text-gray-700 font-bangla">
              পরিমাণ (টাকা)
            </Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="1000"
              className="h-12 rounded-xl border-gray-300 bg-white/80 text-lg font-semibold font-bangla text-gray-700 shadow-sm"
              min="1"
              required
            />
          </div>

          {/* Donate Button */}
          <Button
            type="submit"
            disabled
            className="w-full h-12 md:w-auto md:flex-1 bg-linear-to-r from-emerald-500/50 to-green-600/50 text-white rounded-xl text-lg font-semibold font-bangla cursor-not-allowed"
          >
            <Heart className="w-5 h-5 mr-2" />
            দান করুন
          </Button>
        </form>
      </div>
    </div>
  );
}