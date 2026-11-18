import { NextRequest, NextResponse } from "next/server";
import { callTemplateData } from "@/lib/server-api";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const slug = typeof body.slug === "string" ? body.slug : "";
    const email = typeof body.email === "string" ? body.email : "";
    const answers = body.answers && typeof body.answers === "object" ? body.answers : {};
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tcs-template.vercel.app";
    const apiKey = process.env.DODO_PAYMENTS_API_KEY;
    const environment = process.env.DODO_PAYMENTS_ENVIRONMENT ?? "test_mode";
    if (!apiKey) return NextResponse.json({ error: "Pembayaran belum dikonfigurasi." }, { status: 503 });

    const order = await callTemplateData<{
      order_id: string; purchase_token: string; product_id: string; amount_cents: number; currency: string;
    }>({ action: "checkout-create", slug, email, answers });

    const base = environment === "live_mode" ? "https://live.dodopayments.com" : "https://test.dodopayments.com";
    const returnUrl = new URL("/pembelian/selesai", siteUrl);
    returnUrl.searchParams.set("order_id", order.order_id);
    returnUrl.searchParams.set("token", order.purchase_token);
    const response = await fetch(base + "/checkouts", {
      method: "POST",
      headers: { authorization: "Bearer " + apiKey, "content-type": "application/json" },
      body: JSON.stringify({
        product_cart: [{ product_id: order.product_id, quantity: 1 }],
        customer: { email: email.trim().toLowerCase() },
        billing_currency: "USD",
        return_url: returnUrl.toString(),
        metadata: {
          tcs_order_id: order.order_id,
          tcs_template_slug: slug,
          tcs_checkout_session: "tcs-template",
        },
      }),
      cache: "no-store",
    });
    const checkout = await response.json().catch(() => ({}));
    const checkoutUrl = checkout.checkout_url ?? checkout.url;
    if (!response.ok || typeof checkoutUrl !== "string") {
      await callTemplateData({ action: "checkout-failed", order_id: order.order_id }).catch(() => null);
      const message = typeof checkout.message === "string" ? checkout.message : "Dodo Payments gagal membuat sesi checkout.";
      return NextResponse.json({ error: message }, { status: 502 });
    }
    await callTemplateData({
      action: "checkout-attach",
      order_id: order.order_id,
      checkout_session_id: checkout.session_id ?? checkout.id ?? null,
      payment_id: checkout.payment_id ?? null,
    });
    return NextResponse.json({ checkout_url: checkoutUrl }, { headers: { "cache-control": "no-store" } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Checkout gagal disiapkan." }, { status: 400 });
  }
}
