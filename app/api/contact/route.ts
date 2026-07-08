import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Contact intake. Currently logs server-side; wire to your inbox
 * or CRM (Resend/HubSpot) before launch.
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
  const message = String(body.message ?? "").trim();

  if (!name || !message || !EMAIL_RE.test(email) || message.length > 5000) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  console.log(
    `[contact] ${new Date().toISOString()} ${name} <${email}> — ${String(body.subject ?? "no subject")}: ${message.slice(0, 200)}`
  );
  return NextResponse.json({ ok: true });
}
