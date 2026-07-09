import { Suspense } from "react";
import PaymentFailPage from "@/components/pages/payment/PaymentFailPage";

export default function PaymentFail() {
  return (
    <Suspense>
      <PaymentFailPage />
    </Suspense>
  );
}
