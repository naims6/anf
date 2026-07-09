"use client";

import { useTranslations } from "next-intl";
import { PaymentStatus } from "@/components/shared/PaymentStatus";
import { usePaymentVerification } from "./usePaymentVerification";

export default function PaymentFailPage() {
  const t = useTranslations("Payment");
  const { paymentData, isLoading, actualStatus } = usePaymentVerification("fail");
  const s = actualStatus;

  return (
    <PaymentStatus
      status={s}
      title={t(`${s}.title`)}
      description={t(`${s}.description`)}
      badgeLabel={t(`${s}.badge`)}
      labels={{
        amount: t("details.amount"),
        donation: t("details.donation"),
        method: t("details.method"),
        purpose: t("details.purpose"),
        transactionId: t("details.transactionId"),
      }}
      isLoading={isLoading}
      paymentData={paymentData}
      primaryAction={{
        label: s === "success" ? t("backToHome") : t("tryAgain"),
        href: s === "success" ? "/" : "/donate",
      }}
      secondaryAction={{
        label: s === "success" ? t("viewDonations") : t("backToHome"),
        href: s === "success" ? "/donate" : "/",
      }}
    />
  );
}
