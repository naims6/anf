'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import enHomepageMessages from '@/messages/en/homepage.json';
import bnHomepageMessages from '@/messages/bn/homepage.json';

export default function DonationCard() {
  const [selectedFund, setSelectedFund] = useState('');
  const [amount, setAmount] = useState('');
  const [contact, setContact] = useState('');

  const { locale } = useLanguage();
  const t = locale === 'bn' ? bnHomepageMessages.HomePage.DonationCard : enHomepageMessages.HomePage.DonationCard;

  const donationFunds = [
    { value: 'zakat', label: t.funds?.zakat || (locale === 'bn' ? 'যাকাত' : 'Zakat') },
    { value: 'sadaqah', label: t.funds?.sadaqah || (locale === 'bn' ? 'সাদাকাহ' : 'Sadaqah') },
    { value: 'education', label: t.funds?.education || (locale === 'bn' ? 'শিক্ষা তহবিল' : 'Education Fund') },
    { value: 'emergency', label: t.funds?.emergency || (locale === 'bn' ? 'জরুরী তহবিল' : 'Emergency Fund') },
    { value: 'winter', label: t.funds?.winter || (locale === 'bn' ? 'শীতবার্তা তহবিল' : 'Winter Relief Fund') },
    { value: 'qurbani', label: t.funds?.qurbani || (locale === 'bn' ? 'কুরবানি তহবিল' : 'Qurbani Fund') },
  ];

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ selectedFund, amount, contact });
  };

  return (
    <div className="bg-white rounded-2xl border border-primary/20 shadow-lg p-6 md:w-[65%] mx-auto pb-10 relative overflow-hidden group">

      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 font-bangla">
          {t.title}
        </h3>
      </div>

      <form onSubmit={handleDonate} className="space-y-4 md:space-y-0 md:flex md:items-end md:gap-4">
        {/* Fund Selection */}
        <div className="space-y-2 md:flex-1">
          <Label htmlFor="fund" className="text-sm font-semibold text-gray-700 font-bangla">
            {t.fundSelectionLabel}
          </Label>
          <Select value={selectedFund} onValueChange={setSelectedFund}>
            <SelectTrigger className="w-full h-12 rounded-xl border-gray-300 bg-white font-bangla text-gray-700 shadow-xs transition-all">
              <SelectValue placeholder={t.fundPlaceholder} />
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
            {t.contactLabel}
          </Label>
          <Input
            id="contact"
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder={t.contactPlaceholder}
            className="h-12 rounded-xl border-gray-300 bg-white font-bangla text-gray-700 shadow-xs"
            required
          />
        </div>

        {/* Amount Input */}
        <div className="space-y-2 md:flex-1">
          <Label htmlFor="amount" className="text-sm font-semibold text-gray-700 font-bangla">
            {t.amountLabel}
          </Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600 font-bold text-sm z-10">
              ৳
            </div>
            <Input
              id="amount"
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={t.amountPlaceholder}
              className="pl-8 h-12 rounded-xl border-gray-300 bg-white text-lg font-semibold font-bangla text-gray-700 shadow-xs"
              min="1"
              required
            />
          </div>
        </div>

        {/* Donate Button */}
        <Button
          type="submit"
          className="w-full h-12 md:w-auto md:flex-1 bg-linear-to-r from-emerald-500 to-green-600 text-white rounded-xl text-lg font-semibold font-bangla shadow-sm hover:from-emerald-600 hover:to-green-700 transition-all duration-200"
        >
          <Heart className="w-5 h-5 mr-2" />
          {t.donateButton}
        </Button>
      </form>
    </div>
  );
}
