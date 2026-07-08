import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Demo-request intake. Currently logs server-side; wire to your CRM
 * or scheduling tool (Cal.com/HubSpot) before launch.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const organization = String(body.organization ?? "").trim();

  if (!name || !organization || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  console.log(
    `[demo] ${new Date().toISOString()} ${name} <${email}> — ${organization} / ${body.industry ?? "n/a"}`
  );
  return NextResponse.json({ ok: true });
}
