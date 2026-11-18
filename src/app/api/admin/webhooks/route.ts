import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";
const WEBHOOK_URL = "https://tcs-template.vercel.app/api/webhooks/dodo";
const EVENT_TYPES = ["payment.succeeded", "payment.failed", "payment.processing", "payment.cancelled", "refund.succeeded", "dispute.opened"];

function dodoConfig() {
  const key = process.env.DODO_PAYMENTS_API_KEY;
  const environment = process.env.DODO_PAYMENTS_ENVIRONMENT ?? "test_mode";
  if (!key) throw new Error("Dodo Payments API Key belum dikonfigurasi.");
  const base = environment === "live_mode" ? "https://live.dodopayments.com" : "https://test.dodopayments.com";
  return { key, base, environment };
}
async function dodoRequest(path: string, init?: RequestInit) {
  const { key, base } = dodoConfig();
  const response = await fetch(base + path, {
    ...init,
    headers: { authorization: "Bearer " + key, "content-type": "application/json", ...(init?.headers ?? {}) },
    cache: "no-store",
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = typeof data.message === "string" ? data.message : typeof data.error === "string" ? data.error : "Dodo API returned " + response.status;
    throw new Error(message);
  }
  return data;
}
function extractItems(data: any): any[] {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.items)) return data.items;
  if (Array.isArray(data.data)) return data.data;
  if (Array.isArray(data.webhooks)) return data.webhooks;
  return [];
}

export async function GET(request: NextRequest) {
  if (!(await isAdminRequest(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const [data, config] = await Promise.all([
      dodoRequest("/webhooks"),
      Promise.resolve(dodoConfig()),
    ]);
    const webhooks = extractItems(data).map((hook: any) => ({
      id: hook.id,
      url: hook.url,
      description: hook.description,
      disabled: Boolean(hook.disabled),
      filter_types: hook.filter_types ?? [],
      created_at: hook.created_at,
      is_tcs_endpoint: hook.url === WEBHOOK_URL,
    }));
    return NextResponse.json({ environment: config.environment, endpoint_url: WEBHOOK_URL, expected_events: EVENT_TYPES, webhooks }, {
      headers: { "cache-control": "no-store" },
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Gagal membaca webhook Dodo." }, { status: 502 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAdminRequest(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const current = await dodoRequest("/webhooks");
    const hooks = extractItems(current);
    const existing = hooks.find((hook: any) => hook.url === WEBHOOK_URL);
    const payload = {
      url: WEBHOOK_URL,
      description: "TCS Template payment, refund, and dispute events",
      disabled: false,
      filter_types: EVENT_TYPES,
    };
    let result: any;
    let created = false;
    if (existing?.id) {
      result = await dodoRequest("/webhooks/" + encodeURIComponent(existing.id), {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
    } else {
      result = await dodoRequest("/webhooks", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      created = true;
    }
    const hook = result.webhook ?? result.data ?? result;
    let signingKey: string | null = null;
    if (created && hook.id) {
      try {
        const secretData = await dodoRequest("/webhooks/" + encodeURIComponent(hook.id) + "/secret");
        signingKey = secretData.secret ?? secretData.signing_key ?? secretData.webhook_secret ?? null;
      } catch {
        signingKey = null;
      }
    }
    return NextResponse.json({
      success: true,
      created,
      webhook: {
        id: hook.id,
        url: hook.url ?? WEBHOOK_URL,
        disabled: Boolean(hook.disabled),
        filter_types: hook.filter_types ?? EVENT_TYPES,
      },
      signing_key: signingKey,
      message: created
        ? "Endpoint webhook baru dibuat. Pastikan signing key yang ditampilkan disimpan pada environment DODO_PAYMENTS_WEBHOOK_KEY di Vercel."
        : "Endpoint webhook TCS Template berhasil disinkronkan.",
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Gagal menyinkronkan webhook." }, { status: 502 });
  }
}
