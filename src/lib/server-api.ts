export async function callTemplateData<T = Record<string, unknown>>(payload: Record<string, unknown>): Promise<T> {
  const endpoint = process.env.TCS_TEMPLATE_DATA_URL;
  const token = process.env.TCS_TEMPLATE_INTERNAL_TOKEN;
  if (!endpoint || !token) throw new Error("Konfigurasi backend TCS Template belum lengkap.");
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json", "x-tcs-internal-token": token },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = typeof data.error === "string" ? data.error : "Backend TCS Template gagal memproses permintaan.";
    throw new Error(message);
  }
  return data as T;
}
