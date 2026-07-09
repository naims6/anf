"use server";

import { apiClient } from "@/lib/api-client";
import type { PaymentDetailsResponse } from "@/types/payment";

export async function getPaymentDetails(tranId: string) {
  try {
    const res = await apiClient.get<PaymentDetailsResponse>(
      `/payment/details/${tranId}`
    );
    return { data: res.data };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch payment details";
    return { error: message };
  }
}
