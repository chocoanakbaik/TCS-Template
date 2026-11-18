import { NextRequest, NextResponse } from "next/server";
import { callTemplateData } from "@/lib/server-api";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = await callTemplateData({
      action: "review-create",
      order_id: body.order_id,
      purchase_token: body.token,
      rating: body.rating,
      review_text: body.review_text,
      display_name: body.display_name,
    });
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Ulasan gagal dikirim." }, { status: 400 });
  }
}
