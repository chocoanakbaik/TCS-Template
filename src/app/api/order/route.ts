import { NextRequest, NextResponse } from "next/server";
import { callTemplateData } from "@/lib/server-api";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const orderId = request.nextUrl.searchParams.get("order_id") ?? "";
  const token = request.nextUrl.searchParams.get("token") ?? "";
  try {
    const data = await callTemplateData({ action: "get-order", order_id: orderId, purchase_token: token });
    return NextResponse.json(data, { headers: { "cache-control": "no-store" } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Order tidak dapat diperiksa." }, { status: 404 });
  }
}
