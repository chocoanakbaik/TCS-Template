import { NextRequest, NextResponse } from "next/server";
import { callTemplateData } from "@/lib/server-api";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug") ?? "";
  if (!slug) return NextResponse.json({ error: "Slug template diperlukan." }, { status: 400 });
  try {
    const data = await callTemplateData<{ reviews: Array<{ rating: number; review_text: string; display_name: string | null; created_at: string }> }>({
      action: "public-reviews",
      slug,
    });
    const reviews = data.reviews ?? [];
    const average = reviews.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : null;
    return NextResponse.json({ reviews, average, count: reviews.length }, {
      headers: { "cache-control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Ulasan tidak dapat dimuat." }, { status: 502 });
  }
}


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
