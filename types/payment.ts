export interface PaymentDetailsResponse {
  success: boolean;
  message: string;
  data: PaymentData;
}

export interface PaymentData {
  amount: number;
  status: "SUCCESS" | "FAILED" | "CANCELLED";
  purpose: string;
  tranId: string;
  gateway: string;
  paymentMethod: string;
  donation: {
    id: string;
    tohbil: {
      name: string;
    };
  };
}

export type PaymentStatusType = "success" | "fail" | "cancel";

export function mapApiStatus(status: PaymentData["status"]): PaymentStatusType {
  switch (status) {
    case "SUCCESS":
      return "success";
    case "FAILED":
      return "fail";
    case "CANCELLED":
      return "cancel";
    default:
      return "fail";
  }
}
