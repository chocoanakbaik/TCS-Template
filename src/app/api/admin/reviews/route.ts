import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { callTemplateData } from "@/lib/server-api";

export const dynamic = "force-dynamic";

export async function PATCH(request: NextRequest) {
  if (!(await isAdminRequest(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const data = await callTemplateData({ action: "review-moderate", review_id: body.review_id, status: body.status });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Gagal memperbarui ulasan." }, { status: 400 });
  }
}
