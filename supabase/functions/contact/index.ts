declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
  serve(handler: (req: Request) => Response | Promise<Response>): void;
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, { count: number; start: number }>();

function getCorsHeaders(req: Request) {
  const configuredOrigin = Deno.env.get("ALLOWED_ORIGIN");
  const requestOrigin = req.headers.get("origin");
  const allowedOrigin = configuredOrigin || requestOrigin || "*";

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

function jsonResponse(body: Record<string, unknown>, status: number, req: Request) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...getCorsHeaders(req),
      "Content-Type": "application/json",
    },
  });
}

function cleanText(value: unknown, maxLength = 3000) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function checkRateLimit(req: Request) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const ip = forwardedFor?.split(",")[0]?.trim() || realIp || "unknown";
  const now = Date.now();
  const current = rateLimitStore.get(ip) || { count: 0, start: now };

  if (now - current.start > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, start: now });
    return true;
  }

  current.count += 1;
  rateLimitStore.set(ip, current);

  return current.count <= RATE_LIMIT_MAX_REQUESTS;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: getCorsHeaders(req),
    });
  }

  if (req.method !== "POST") {
    return jsonResponse({ ok: false, error: "Method not allowed" }, 405, req);
  }

  if (!checkRateLimit(req)) {
    return jsonResponse(
      { ok: false, error: "Too many requests. Please try again in a minute." },
      429,
      req,
    );
  }

  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return jsonResponse({ ok: false, error: "Invalid request body." }, 400, req);
    }

    const data = body as Record<string, unknown>;
    const name = cleanText(data.name, 120);
    const email = cleanText(data.email, 180);
    const message = cleanText(data.message, 3000);

    if (!name || !email || !message) {
      return jsonResponse(
        { ok: false, error: "Name, email, and message are required." },
        400,
        req,
      );
    }

    if (!isValidEmail(email)) {
      return jsonResponse(
        { ok: false, error: "Please enter a valid email address." },
        400,
        req,
      );
    }

    const apiKey = Deno.env.get("RESEND_API_KEY");
    const toEmail = Deno.env.get("CONTACT_TO_EMAIL") || "abdo.abouelella96@gmail.com";
    const fromEmail = Deno.env.get("CONTACT_FROM_EMAIL") || "Portfolio <onboarding@resend.dev>";

    if (!apiKey || !fromEmail) {
      return jsonResponse(
        { ok: false, error: "Contact service is not configured yet." },
        500,
        req,
      );
    }

    const subject = `New portfolio inquiry from ${name}`;
    const textBody = [
      "New portfolio contact message",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const htmlBody = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
        <h2>New portfolio contact message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <div style="white-space:pre-wrap;border-left:3px solid #111;padding-left:12px;margin-top:8px">
          ${escapeHtml(message)}
        </div>
      </div>
    `;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmail,
        reply_to: email,
        subject,
        text: textBody,
        html: htmlBody,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error("Resend error:", errorText);
      return jsonResponse(
        { ok: false, error: "Email service failed to send the message." },
        502,
        req,
      );
    }

    return jsonResponse({ ok: true }, 200, req);
  } catch (error) {
    console.error("Contact Edge Function error:", error);
    return jsonResponse(
      { ok: false, error: "Unexpected contact service error." },
      500,
      req,
    );
  }
});
