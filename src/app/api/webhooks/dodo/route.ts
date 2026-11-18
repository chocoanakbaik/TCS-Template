import { NextRequest, NextResponse } from "next/server";
import { callTemplateData } from "@/lib/server-api";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function decodeBase64(value: string): Uint8Array {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(normalized);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}
function equalBytes(left: Uint8Array, right: Uint8Array): boolean {
  if (left.length !== right.length) return false;
  let diff = 0;
  for (let i = 0; i < left.length; i += 1) diff |= left[i] ^ right[i];
  return diff === 0;
}
async function verifySignature(rawBody: string, request: NextRequest): Promise<boolean> {
  const secret = process.env.DODO_PAYMENTS_WEBHOOK_KEY;
  const webhookId = request.headers.get("webhook-id") ?? "";
  const timestamp = request.headers.get("webhook-timestamp") ?? "";
  const signatureHeader = request.headers.get("webhook-signature") ?? "";
  if (!secret || !webhookId || !timestamp || !signatureHeader) return false;
  const timestampNumber = Number(timestamp);
  if (!Number.isFinite(timestampNumber) || Math.abs(Date.now() / 1000 - timestampNumber) > 300) return false;
  const encodedKey = secret.startsWith("whsec_") ? secret.slice(6) : secret;
  let keyBytes: Uint8Array;
  try { keyBytes = decodeBase64(encodedKey); } catch { return false; }
  const keyBuffer = new ArrayBuffer(keyBytes.length);
  new Uint8Array(keyBuffer).set(keyBytes);
  const key = await crypto.subtle.importKey("raw", keyBuffer, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const message = webhookId + "." + timestamp + "." + rawBody;
  const expected = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message)));
  const signatures = signatureHeader.split(" ").map((part) => part.trim()).filter(Boolean);
  return signatures.some((part) => {
    const [version, signature] = part.includes(",") ? part.split(",", 2) : ["v1", part];
    if (version !== "v1" || !signature) return false;
    try { return equalBytes(expected, decodeBase64(signature)); } catch { return false; }
  });
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  if (!(await verifySignature(rawBody, request))) {
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 401 });
  }
  try {
    const payload = JSON.parse(rawBody);
    const eventType = String(payload.type ?? payload.event_type ?? "");
    const eventId = request.headers.get("webhook-id") ?? "";
    const eventData = payload.data ?? payload.payload ?? {};
    let payment: Record<string, unknown> | null = null;

    if (eventType.startsWith("payment.")) {
      const paymentId = String(eventData.payment_id ?? eventData.id ?? "");
      const apiKey = process.env.DODO_PAYMENTS_API_KEY;
      const environment = process.env.DODO_PAYMENTS_ENVIRONMENT ?? "test_mode";
      if (!paymentId || !apiKey) throw new Error("Payment reference or Dodo API key is missing.");
      const base = environment === "live_mode" ? "https://live.dodopayments.com" : "https://test.dodopayments.com";
      const verifyResponse = await fetch(base + "/payments/" + encodeURIComponent(paymentId), {
        headers: { authorization: "Bearer " + apiKey },
        cache: "no-store",
      });
      payment = await verifyResponse.json().catch(() => null);
      if (!verifyResponse.ok || !payment) throw new Error("Unable to retrieve payment from Dodo Payments.");
    }

    await callTemplateData({
      action: "webhook-process",
      event_id: eventId,
      event_type: eventType,
      event_timestamp: payload.timestamp ?? null,
      event_payload: eventData,
      payment,
    });
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Dodo webhook handler failed:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Webhook processing failed." }, { status: 500 });
  }
}
