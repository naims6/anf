import { Suspense } from "react";
import PaymentCancelPage from "@/components/pages/payment/PaymentCancelPage";

export default function PaymentCancel() {
  return (
    <Suspense>
      <PaymentCancelPage />
    </Suspense>
  );
}
