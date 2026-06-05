import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import escapeHtml from 'escape-html';

// ── Google Sheets via Apps Script webhook ──────────────────────
async function appendToSheet(row: {
  date: string; name: string; email: string; phone: string; message: string;
}) {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK;
  const token      = process.env.GOOGLE_SHEET_TOKEN;

  if (!webhookUrl || !token) return; // skip if not configured yet

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...row, token }),
  });
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? 'smtp.hostinger.com',
  port: Number(process.env.SMTP_PORT ?? 465),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM      = `San Diego Website Experts <${process.env.SMTP_USER}>`;
const TO        = process.env.CONTACT_TO ?? process.env.SMTP_USER ?? '';
const SITE_URL  = 'https://sandiegowebsiteexperts.com';
const LOGO_URL  = `${SITE_URL}/logo-new.png`;

const sanitizeHeader = (s: string) => s.replace(/[\r\n]+/g, ' ').trim();
const EMAIL_RE = /^[^\s@,]+@[^\s@,]+\.[^\s@,]+$/;

// ── Shared email wrapper ───────────────────────────────────────
function emailShell(content: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background:#EBF4FF;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EBF4FF;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">
        ${content}
        <!-- Footer -->
        <tr>
          <td style="padding:24px 0;text-align:center;">
            <p style="margin:0 0 6px;font-size:12px;color:#94a3b8;">© 2025 San Diego Website Experts · San Diego, CA</p>
            <p style="margin:0;font-size:12px;color:#94a3b8;">
              <a href="${SITE_URL}" style="color:#3863ff;text-decoration:none;">${SITE_URL.replace('https://', '')}</a>
              &nbsp;·&nbsp;
              <a href="mailto:${TO}" style="color:#3863ff;text-decoration:none;">${TO}</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  const body     = await req.json();
  const name     = sanitizeHeader(String(body.name    ?? ''));
  const email    = sanitizeHeader(String(body.email   ?? ''));
  const phone    = sanitizeHeader(String(body.phone   ?? ''));
  const message  = String(body.message ?? '');

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  const safeName    = escapeHtml(name);
  const safeEmail   = escapeHtml(email);
  const safePhone   = escapeHtml(phone);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');
  const firstName   = escapeHtml(name.split(' ')[0]);

  try {
    // ── 0. Log to Google Sheets ────────────────────────────────
    const submittedAt = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
    await appendToSheet({ date: submittedAt, name, email, phone: phone || '—', message });

    // ── 1. Owner notification ──────────────────────────────────
    await transporter.sendMail({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `🔔 New Lead: ${name} submitted a contact form`,
      html: emailShell(`
        <!-- Logo bar -->
        <tr>
          <td style="padding:0 0 20px;">
            <img src="${LOGO_URL}" alt="San Diego Website Experts" width="180" style="display:block;height:auto;"/>
          </td>
        </tr>

        <!-- Alert card -->
        <tr>
          <td style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 16px rgba(56,99,255,0.08);">

            <!-- Top accent -->
            <div style="background:linear-gradient(90deg,#3863ff,#6ca3fe);height:4px;"></div>

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 36px;">
              <!-- Heading -->
              <tr>
                <td style="padding-bottom:24px;border-bottom:1px solid #f1f5f9;">
                  <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#3863ff;">New Contact Form Submission</p>
                  <h1 style="margin:0;font-size:24px;font-weight:800;color:#05080c;line-height:1.2;">${safeName} wants to work with you</h1>
                </td>
              </tr>

              <!-- Details -->
              <tr>
                <td style="padding:24px 0;border-bottom:1px solid #f1f5f9;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="width:16px;vertical-align:top;padding:10px 14px 10px 0;">
                        <div style="width:16px;height:16px;background:#ebf4ff;border-radius:50%;display:flex;align-items:center;justify-content:center;">
                          <div style="width:6px;height:6px;background:#3863ff;border-radius:50%;margin:5px;"></div>
                        </div>
                      </td>
                      <td style="padding:8px 0;border-bottom:1px solid #f8fafc;">
                        <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.8px;text-transform:uppercase;color:#94a3b8;">Name</p>
                        <p style="margin:2px 0 0;font-size:15px;font-weight:600;color:#05080c;">${safeName}</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="width:16px;vertical-align:top;padding:10px 14px 10px 0;">
                        <div style="width:16px;height:16px;background:#ebf4ff;border-radius:50%;"><div style="width:6px;height:6px;background:#3863ff;border-radius:50%;margin:5px;"></div></div>
                      </td>
                      <td style="padding:8px 0;border-bottom:1px solid #f8fafc;">
                        <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.8px;text-transform:uppercase;color:#94a3b8;">Email</p>
                        <p style="margin:2px 0 0;font-size:15px;font-weight:600;color:#3863ff;">${safeEmail}</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="width:16px;vertical-align:top;padding:10px 14px 10px 0;">
                        <div style="width:16px;height:16px;background:#ebf4ff;border-radius:50%;"><div style="width:6px;height:6px;background:#3863ff;border-radius:50%;margin:5px;"></div></div>
                      </td>
                      <td style="padding:8px 0;border-bottom:1px solid #f8fafc;">
                        <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.8px;text-transform:uppercase;color:#94a3b8;">Phone</p>
                        <p style="margin:2px 0 0;font-size:15px;font-weight:600;color:#05080c;">${safePhone || '—'}</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="width:16px;vertical-align:top;padding:10px 14px 10px 0;">
                        <div style="width:16px;height:16px;background:#ebf4ff;border-radius:50%;"><div style="width:6px;height:6px;background:#3863ff;border-radius:50%;margin:5px;"></div></div>
                      </td>
                      <td style="padding:8px 0;">
                        <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.8px;text-transform:uppercase;color:#94a3b8;">Message</p>
                        <p style="margin:2px 0 0;font-size:15px;color:#374151;line-height:1.7;">${safeMessage}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- CTA -->
              <tr>
                <td style="padding-top:28px;text-align:center;">
                  <a href="mailto:${safeEmail}?subject=Re: Your enquiry with San Diego Website Experts"
                     style="display:inline-block;background:#05080c;color:#fff;text-decoration:none;padding:14px 32px;border-radius:999px;font-size:14px;font-weight:700;letter-spacing:0.2px;">
                    Reply to ${firstName} →
                  </a>
                  <p style="margin:14px 0 0;font-size:12px;color:#94a3b8;">Reply directly from your email — the reply-to is already set.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `),
    });

    // ── 2. Thank-you to submitter ──────────────────────────────
    await transporter.sendMail({
      from: FROM,
      to: email,
      subject: `We got your message, ${firstName} — here's what happens next`,
      html: emailShell(`
        <!-- Main card -->
        <tr>
          <td style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 16px rgba(56,99,255,0.08);">

            <!-- Hero header -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
              style="background:linear-gradient(135deg,#06123d 0%,#1a3a8f 50%,#3863ff 100%);">
              <tr>
                <td style="padding:36px 40px;text-align:center;">
                  <img src="${LOGO_URL}" alt="San Diego Website Experts" width="200" style="display:block;margin:0 auto 20px;height:auto;filter:brightness(0) invert(1);"/>
                  <h1 style="margin:0 0 8px;color:#ffffff;font-size:26px;font-weight:800;line-height:1.25;">
                    Thanks, ${firstName}! We'll be in touch.
                  </h1>
                  <p style="margin:0;color:rgba(255,255,255,0.72);font-size:15px;line-height:1.5;">
                    Your message has been received — expect a reply within 24 hours.
                  </p>
                </td>
              </tr>
            </table>

            <!-- Body -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:36px 40px;">

              <!-- Intro -->
              <tr>
                <td style="padding-bottom:28px;border-bottom:1px solid #f1f5f9;">
                  <p style="margin:0;font-size:15px;line-height:1.8;color:#475569;">
                    Hi <strong style="color:#05080c;">${firstName}</strong>, we've received your enquiry and one of our specialists will personally review it and reach out to you shortly.
                  </p>
                </td>
              </tr>

              <!-- What's next -->
              <tr>
                <td style="padding:28px 0 0;">
                  <p style="margin:0 0 20px;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#3863ff;">What happens next</p>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">

                    <tr>
                      <td style="vertical-align:top;padding-bottom:20px;">
                        <table role="presentation" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="vertical-align:top;padding-right:16px;">
                              <div style="width:40px;height:40px;background:#ebf4ff;border-radius:12px;text-align:center;line-height:40px;font-size:18px;">🔍</div>
                            </td>
                            <td style="vertical-align:top;">
                              <p style="margin:0 0 3px;font-size:14px;font-weight:700;color:#05080c;">We review your enquiry</p>
                              <p style="margin:0;font-size:13px;color:#64748b;line-height:1.6;">Every submission is read personally by our team — no automated responses.</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <tr>
                      <td style="vertical-align:top;padding-bottom:20px;">
                        <table role="presentation" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="vertical-align:top;padding-right:16px;">
                              <div style="width:40px;height:40px;background:#ebf4ff;border-radius:12px;text-align:center;line-height:40px;font-size:18px;">📞</div>
                            </td>
                            <td style="vertical-align:top;">
                              <p style="margin:0 0 3px;font-size:14px;font-weight:700;color:#05080c;">We reach out within 24 hours</p>
                              <p style="margin:0;font-size:13px;color:#64748b;line-height:1.6;">A specialist will contact you via email or phone to discuss your project.</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <tr>
                      <td style="vertical-align:top;">
                        <table role="presentation" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="vertical-align:top;padding-right:16px;">
                              <div style="width:40px;height:40px;background:#ebf4ff;border-radius:12px;text-align:center;line-height:40px;font-size:18px;">🚀</div>
                            </td>
                            <td style="vertical-align:top;">
                              <p style="margin:0 0 3px;font-size:14px;font-weight:700;color:#05080c;">We start your free website audit</p>
                              <p style="margin:0;font-size:13px;color:#64748b;line-height:1.6;">Once aligned on goals, we deliver a full audit showing exactly what to fix.</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>

              <!-- Stats strip -->
              <tr>
                <td style="padding:28px 0 0;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                    style="background:#f8faff;border-radius:12px;border:1px solid #e8efff;">
                    <tr>
                      <td style="padding:20px;text-align:center;border-right:1px solid #e8efff;" width="33%">
                        <p style="margin:0;font-size:22px;font-weight:800;color:#3863ff;">50+</p>
                        <p style="margin:4px 0 0;font-size:11px;color:#64748b;font-weight:500;">Websites Launched</p>
                      </td>
                      <td style="padding:20px;text-align:center;border-right:1px solid #e8efff;" width="33%">
                        <p style="margin:0;font-size:22px;font-weight:800;color:#3863ff;">4.9★</p>
                        <p style="margin:4px 0 0;font-size:11px;color:#64748b;font-weight:500;">Average Rating</p>
                      </td>
                      <td style="padding:20px;text-align:center;" width="33%">
                        <p style="margin:0;font-size:22px;font-weight:800;color:#3863ff;">24h</p>
                        <p style="margin:4px 0 0;font-size:11px;color:#64748b;font-weight:500;">Response Time</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- CTA -->
              <tr>
                <td style="padding-top:28px;text-align:center;">
                  <a href="${SITE_URL}"
                     style="display:inline-block;background:#3863ff;color:#fff;text-decoration:none;padding:14px 36px;border-radius:999px;font-size:14px;font-weight:700;letter-spacing:0.3px;">
                    Visit Our Website
                  </a>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      `),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact email error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
