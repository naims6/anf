"use server"

import { apiClient } from "@/lib/api-client"
import type { PaymentDetailsResponse } from "@/types/payment"

interface PaymentInitData {
  amount: number
  paymentPurpose: string
  email?: string
  phone?: string
  tohbilId: string
}

interface PaymentInitResponse {
  success: boolean
  message: string
  data: { paymentUrl: string }
}

export async function getPaymentDetails(tranId: string) {
  try {
    const res = await apiClient.get<PaymentDetailsResponse>(
      `/payment/details/${tranId}`
    )
    return { data: res.data }
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch payment details"
    return { error: message }
  }
}

export async function initPayment(data: PaymentInitData) {
  try {
    const res = await apiClient.post<PaymentInitResponse>("/payment/init", data)
    return { data: res }
  } catch (error: any) {
    return { error: error.message || "Payment initiation failed" }
  }
}
