import { Suspense } from "react";
import PaymentSuccessPage from "@/components/pages/payment/PaymentSuccessPage";

export default function PaymentSuccess() {
  return (
    <Suspense>
      <PaymentSuccessPage />
    </Suspense>
  );
}
