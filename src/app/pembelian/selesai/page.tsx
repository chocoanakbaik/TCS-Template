import { Suspense } from "react";
import PurchaseResult from "./purchase-result";

export default async function PurchaseCompletePage({
  searchParams,
}: {
  searchParams: Promise<{ order_id?: string; token?: string }>;
}) {
  const params = await searchParams;
  return (
    <Suspense fallback={<main style={{ minHeight: "100vh", display: "grid", placeItems: "center", fontFamily: "Arial, sans-serif" }}>Memeriksa pembayaran…</main>}>
      <PurchaseResult orderId={params.order_id ?? ""} token={params.token ?? ""} />
    </Suspense>
  );
}
