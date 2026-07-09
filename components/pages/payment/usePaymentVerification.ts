"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getPaymentDetails } from "@/services/paymentService";
import { mapApiStatus } from "@/types/payment";
import type { PaymentData, PaymentStatusType } from "@/types/payment";

export function usePaymentVerification(expectedStatus: PaymentStatusType) {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId");

  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [isLoading, setIsLoading] = useState(!!transactionId);
  const [actualStatus, setActualStatus] = useState<PaymentStatusType>(expectedStatus);

  const fetchDetails = useCallback(async () => {
    if (!transactionId) return;
    setIsLoading(true);
    const res = await getPaymentDetails(transactionId);
    if (res.data) {
      setPaymentData(res.data);
      const apiStatus = mapApiStatus(res.data.status);
      setActualStatus(apiStatus);
    }
    setIsLoading(false);
  }, [transactionId]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return {
    transactionId,
    paymentData,
    isLoading,
    actualStatus,
  };
}
