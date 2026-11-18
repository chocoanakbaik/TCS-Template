import { NextRequest, NextResponse } from "next/server";
import { adminCookie, createAdminSession, passwordMatches } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const password = typeof body.password === "string" ? body.password : "";
    if (!(await passwordMatches(password))) {
      return NextResponse.json({ error: "Kata sandi admin tidak valid." }, { status: 401 });
    }
    const session = await createAdminSession();
    const response = NextResponse.json({ authenticated: true });
    response.cookies.set(adminCookie.name, session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: adminCookie.maxAge,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Login gagal diproses." }, { status: 500 });
  }
}
