import type { NextRequest } from "next/server";

const COOKIE_NAME = "tcs_template_admin";
const SESSION_SECONDS = 8 * 60 * 60;

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
function fromBase64Url(value: string): Uint8Array {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - value.length % 4) % 4);
  const binary = atob(base64);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}
async function signature(payload: string): Promise<string> {
  const secret = process.env.TCS_TEMPLATE_SESSION_SECRET;
  if (!secret) throw new Error("Admin session secret is not configured.");
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return toBase64Url(new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload))));
}
function constantTimeEqual(a: string, b: string): boolean {
  const left = new TextEncoder().encode(a);
  const right = new TextEncoder().encode(b);
  if (left.length !== right.length) return false;
  let mismatch = 0;
  for (let i = 0; i < left.length; i += 1) mismatch |= left[i] ^ right[i];
  return mismatch === 0;
}
export async function passwordMatches(value: string): Promise<boolean> {
  const expected = process.env.TCS_TEMPLATE_ADMIN_PASSWORD ?? "";
  if (!expected || !value) return false;
  const [actualHash, expectedHash] = await Promise.all([
    crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)),
    crypto.subtle.digest("SHA-256", new TextEncoder().encode(expected)),
  ]);
  return constantTimeEqual(toBase64Url(new Uint8Array(actualHash)), toBase64Url(new Uint8Array(expectedHash)));
}
export async function createAdminSession(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload = toBase64Url(new TextEncoder().encode(JSON.stringify({ iat: now, exp: now + SESSION_SECONDS, scope: "tcs-template-admin" })));
  return payload + "." + await signature(payload);
}
export async function verifyAdminSession(value: string | undefined): Promise<boolean> {
  if (!value || !value.includes(".")) return false;
  const [payload, suppliedSignature] = value.split(".");
  if (!payload || !suppliedSignature) return false;
  try {
    const expectedSignature = await signature(payload);
    if (!constantTimeEqual(suppliedSignature, expectedSignature)) return false;
    const session = JSON.parse(new TextDecoder().decode(fromBase64Url(payload))) as { exp?: number; scope?: string };
    return session.scope === "tcs-template-admin" && typeof session.exp === "number" && session.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}
export async function isAdminRequest(request: NextRequest): Promise<boolean> {
  return verifyAdminSession(request.cookies.get(COOKIE_NAME)?.value);
}
export const adminCookie = {
  name: COOKIE_NAME,
  maxAge: SESSION_SECONDS,
};
