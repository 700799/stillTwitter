import nodemailer from 'nodemailer';
import type { DigestArticle } from '../types';

function buildHtml(articles: DigestArticle[], date: string): string {
  const rows = articles.map((a) => {
    const time = new Date(a.publishedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    return `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;">
          <a href="${a.link}" style="font-size:15px;font-weight:600;color:#111827;text-decoration:none;">${a.title}</a>
          <div style="font-size:12px;color:#9ca3af;margin-top:4px;">${a.source} · ${time}</div>
          ${a.description ? `<div style="font-size:13px;color:#6b7280;margin-top:6px;">${a.description}</div>` : ''}
        </td>
      </tr>`;
  }).join('');

  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;max-width:620px;margin:0 auto;padding:24px;background:#fff;">
    <h1 style="font-size:22px;margin-bottom:4px;color:#111827;">News Digest</h1>
    <p style="color:#9ca3af;font-size:13px;margin-top:0;margin-bottom:24px;">${date}</p>
    <table style="width:100%;border-collapse:collapse;">${rows}</table>
  </body></html>`;
}

export async function sendDigestEmail(articles: DigestArticle[], date: string): Promise<void> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, DIGEST_EMAIL_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !DIGEST_EMAIL_TO) return;

  const port = parseInt(SMTP_PORT ?? '587', 10);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: SMTP_USER,
    to: DIGEST_EMAIL_TO,
    subject: `News Digest — ${date}`,
    html: buildHtml(articles, date),
  });
}
