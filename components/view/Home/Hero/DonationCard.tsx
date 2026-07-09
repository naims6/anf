'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Heart, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { getActiveTohbilFunds } from '@/services/tohbilFundService';
import { initPayment } from '@/services/paymentService';
import { donationSchema, type DonationFormData } from '@/lib/validations/donation';
import enHomepageMessages from '@/messages/en/homepage.json';
import bnHomepageMessages from '@/messages/bn/homepage.json';

interface Fund {
  id: string
  name: string
}

export default function DonationCard() {
  const [funds, setFunds] = useState<Fund[]>([]);
  const [fundsLoading, setFundsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const { locale } = useLanguage();
  const t = locale === 'bn' ? bnHomepageMessages.HomePage.DonationCard : enHomepageMessages.HomePage.DonationCard;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
  });

  useEffect(() => {
    async function fetchFunds() {
      setFundsLoading(true);
      const result = await getActiveTohbilFunds();
      if (result.data) {
        setFunds(result.data);
      }
      setFundsLoading(false);
    }
    fetchFunds();
  }, []);

  async function onSubmit(data: DonationFormData) {
    setSubmitting(true);

    const isEmail = data.contact.includes('@');
    const payload = {
      amount: Number(data.amount),
      paymentPurpose: 'DONATION' as const,
      tohbilId: data.fund,
      ...(isEmail
        ? { email: data.contact }
        : { phone: data.contact }),
    };

    const result = await initPayment(payload);
    if (result.error) {
      alert(result.error);
      setSubmitting(false);
      return;
    }

    const gatewayUrl = result.data?.data.paymentUrl;
    if (gatewayUrl) {
      window.location.assign(gatewayUrl);
    }
  }

  return (
    <div className="bg-gradient-to-b from-emerald-50 to-white rounded-2xl border border-emerald-100 shadow-lg p-6 md:w-[55%] mx-auto pb-10 relative overflow-hidden">

      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-3 font-bangla">
          {t.title}
        </h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-0 md:flex md:items-end md:gap-4">
        {/* Fund Selection */}
        <div className="space-y-2 md:flex-1">
          <Label htmlFor="fund" className="text-sm font-semibold text-gray-700 font-bangla">
            {t.fundSelectionLabel}
          </Label>
          <div className="w-full">
            <Select
              onValueChange={(val) => setValue('fund', val, { shouldValidate: true })}
              disabled={fundsLoading}
            >
              <SelectTrigger
                id="fund"
                className={`w-full !h-12 rounded-xl border-gray-300 bg-white font-bangla text-gray-700 shadow-xs transition-all ${errors.fund ? 'ring-2 ring-red-400 border-red-400' : ''}`}
              >
                <SelectValue placeholder={fundsLoading ? 'Loading...' : t.fundPlaceholder} />
              </SelectTrigger>
              <SelectContent className="rounded-xl border border-gray-200 shadow-lg bg-white font-bangla">
                {funds?.map((fund) => (
                  <SelectItem key={fund.id} value={fund.id} className="font-bangla text-gray-700 hover:bg-emerald-50 focus:bg-emerald-50 cursor-pointer">
                    {fund.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {errors.fund && (
            <p className="text-red-500 text-xs mt-1">{errors.fund.message}</p>
          )}
        </div>

        {/* Contact Input */}
        <div className="space-y-2 md:flex-1">
          <Label htmlFor="contact" className="text-sm font-semibold text-gray-700 font-bangla">
            {t.contactLabel}
          </Label>
          <Input
            id="contact"
            type="text"
            {...register('contact')}
            placeholder={t.contactPlaceholder}
            className={`h-12 rounded-xl border-gray-300 bg-white font-bangla text-gray-700 shadow-xs ${errors.contact ? 'ring-2 ring-red-400 border-red-400' : ''}`}
          />
          {errors.contact && (
            <p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>
          )}
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
              {...register('amount')}
              placeholder={t.amountPlaceholder}
              className={`pl-8 h-12 rounded-xl border-gray-300 bg-white text-lg font-semibold font-bangla text-gray-700 shadow-xs ${errors.amount ? 'ring-2 ring-red-400 border-red-400' : ''}`}
            />
          </div>
          {errors.amount && (
            <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>
          )}
        </div>

        {/* Donate Button */}
        <Button
          type="submit"
          disabled={submitting}
          className="w-full h-12 md:w-auto md:flex-1 bg-linear-to-r from-emerald-500 to-green-600 text-white rounded-xl text-lg font-semibold shadow-sm hover:from-emerald-600 hover:to-green-700 transition-all duration-200 disabled:opacity-60"
        >
          {submitting ? (
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <Heart className="w-5 h-5 mr-2" />
          )}
          {submitting ? 'Processing...' : t.donateButton}
        </Button>
      </form>
    </div>
  );
}
