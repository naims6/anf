"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowLeft,
  RotateCcw,
  IndianRupee,
  Building2,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import type { PaymentData, PaymentStatusType } from "@/types/payment";

interface PaymentStatusProps {
  status: PaymentStatusType;
  title: string;
  description: string;
  badgeLabel: string;
  labels: {
    amount: string;
    donation: string;
    method: string;
    purpose: string;
    transactionId: string;
  };
  isLoading?: boolean;
  paymentData?: PaymentData | null;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
}

const statusConfig: Record<PaymentStatusType, {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  gradientFrom: string;
  badgeBg: string;
  badgeText: string;
}> = {
  success: {
    icon: <CheckCircle className="h-16 w-16" />,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-500",
    gradientFrom: "from-emerald-50",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-700",
  },
  fail: {
    icon: <XCircle className="h-16 w-16" />,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    gradientFrom: "from-red-50",
    badgeBg: "bg-red-100",
    badgeText: "text-red-700",
  },
  cancel: {
    icon: <AlertCircle className="h-16 w-16" />,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
    gradientFrom: "from-amber-50",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-700",
  },
};

export function PaymentStatus({
  status,
  title,
  description,
  badgeLabel,
  labels,
  isLoading,
  paymentData,
  primaryAction,
  secondaryAction,
}: PaymentStatusProps) {
  const config = statusConfig[status];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${config.gradientFrom} to-white flex items-center justify-center p-4`}>
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 md:p-10 flex flex-col items-center text-center">
          {isLoading ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <Skeleton className="h-28 w-28 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-8 w-56" />
              <Skeleton className="h-4 w-72" />
              <Skeleton className="h-4 w-48" />
            </div>
          ) : (
            <>
              <div className={`w-28 h-28 ${config.iconBg} rounded-full flex items-center justify-center mb-6`}>
                <div className={config.iconColor}>{config.icon}</div>
              </div>

              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${config.badgeBg} ${config.badgeText} mb-4`}>
                {badgeLabel}
              </span>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {title}
              </h1>

              <p className="text-gray-600 mb-6 max-w-sm leading-relaxed">
                {description}
              </p>

              {paymentData && (
                <div className="w-full bg-gray-50 rounded-xl p-4 mb-6 space-y-3 text-left">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-2">
                      <IndianRupee className="h-4 w-4" />
                      {labels.amount}
                    </span>
                    <span className="font-semibold text-gray-900">
                      ৳{paymentData.amount.toLocaleString()}
                    </span>
                  </div>
                  {paymentData.donation?.tohbil?.name && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        {labels.donation}
                      </span>
                      <span className="font-medium text-gray-900">
                        {paymentData.donation.tohbil.name}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-2">
                      <Wallet className="h-4 w-4" />
                      {labels.method}
                    </span>
                    <span className="font-medium text-gray-900">
                      {paymentData.paymentMethod}
                    </span>
                  </div>
                  {status === "success" && paymentData.purpose && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{labels.purpose}</span>
                      <span className="font-medium text-gray-900 capitalize">
                        {paymentData.purpose.toLowerCase()}
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Button asChild className="gap-2 bg-primary hover:bg-primary/90 flex-1">
                  <Link href={primaryAction.href}>
                    {status === "success" ? (
                      <ArrowLeft className="h-4 w-4" />
                    ) : (
                      <RotateCcw className="h-4 w-4" />
                    )}
                    {primaryAction.label}
                  </Link>
                </Button>

                {secondaryAction && (
                  <Button asChild variant="outline" className="gap-2 border-primary text-primary hover:bg-primary/10 flex-1">
                    <Link href={secondaryAction.href}>
                      {secondaryAction.label}
                    </Link>
                  </Button>
                )}
              </div>
            </>
          )}
        </div>

        {paymentData && (
          <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-100">
            <p className="text-xs text-gray-400">
              {labels.transactionId}{" "}
              <span className="font-mono text-gray-500">{paymentData.tranId}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
