import nodemailer from "nodemailer";

type ContactSubmission = {
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeText(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function buildSubject(data: ContactSubmission) {
  const cleanName = normalizeText(data.name) || "Portfolio visitor";
  const cleanEmail = normalizeText(data.email) || "unknown email";

  return `Portfolio Enquiry from ${cleanName} <${cleanEmail}>`;
}

export async function sendEmail(data: ContactSubmission) {

  try {

      const cleanData = {
        name: normalizeText(data.name),
        email: normalizeText(data.email),
        phone: normalizeText(data.phone),
        subject: normalizeText(String(data.subject || "")),
        message: normalizeText(data.message),
      };

    const transporter = nodemailer.createTransport({

      service: "gmail",

      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({

      from: process.env.GMAIL_USER,

      to: process.env.GMAIL_USER,

      subject: buildSubject(cleanData),

      html: `
        <div style="margin:0;padding:0;background:#f4f7fb;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:32px 0;">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:720px;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;color:#111827;">
                  <tr>
                    <td style="background:#06152b;padding:24px 28px;color:#ffffff;">
                      <div style="font-size:18px;font-weight:700;letter-spacing:0.3px;">New Portfolio Enquiry</div>
                      <div style="margin-top:6px;font-size:13px;color:#cbd5e1;">Received from your contact form</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:28px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                        <tr>
                          <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;"><strong>Name</strong></td>
                          <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;text-align:right;">${escapeHtml(cleanData.name) || "Not provided"}</td>
                        </tr>
                        <tr>
                          <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;"><strong>Email</strong></td>
                          <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;text-align:right;">${escapeHtml(cleanData.email) || "Not provided"}</td>
                        </tr>
                        <tr>
                          <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;"><strong>Phone</strong></td>
                          <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;text-align:right;">${escapeHtml(cleanData.phone) || "Not provided"}</td>
                        </tr>
                        <tr>
                          <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;"><strong>Subject</strong></td>
                          <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;text-align:right;">${escapeHtml(cleanData.subject) || "(no subject)"}</td>
                        </tr>
                      </table>

                      <div style="margin-top:24px;">
                        <div style="font-size:14px;font-weight:700;margin-bottom:10px;">Message</div>
                        <div style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:12px;padding:16px;line-height:1.7;color:#1f2937;white-space:pre-wrap;">${escapeHtml(cleanData.message) || "No message provided"}</div>
                      </div>

                      <div style="margin-top:24px;font-size:12px;color:#6b7280;">
                        This message was submitted through your portfolio contact form.
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      `,
    });

    console.log("Email Sent Successfully");

  } catch (error) {

    console.log("EMAIL ERROR:", error);
    throw error;
  }
}