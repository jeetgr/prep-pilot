const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export function verificationEmail({
  name,
  url,
}: {
  name: string;
  url: string;
}) {
  const safeName = escapeHtml(name);
  const safeUrl = escapeHtml(url);

  return {
    subject: "Verify your PrepPilot email",
    text: `Hi ${name},\n\nConfirm your email to start using PrepPilot:\n${url}\n\nIf you didn't sign up, ignore this email.`,
    html: `
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 0;font-family:Arial,sans-serif">
  <tr><td align="center">
    <table width="480" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;padding:32px">
      <tr><td style="font-size:20px;font-weight:bold;color:#18181b">PrepPilot</td></tr>
      <tr><td style="padding-top:16px;font-size:15px;color:#3f3f46">Hi ${safeName},<br><br>Confirm your email to start using PrepPilot.</td></tr>
      <tr><td style="padding:24px 0">
        <a href="${safeUrl}" style="background:#18181b;color:#ffffff;padding:12px 20px;border-radius:6px;text-decoration:none;font-size:15px">Verify email</a>
      </td></tr>
      <tr><td style="font-size:13px;color:#71717a">Button not working? Paste this link in your browser:<br><a href="${safeUrl}" style="color:#71717a">${safeUrl}</a></td></tr>
      <tr><td style="padding-top:24px;font-size:13px;color:#a1a1aa">If you didn't sign up, ignore this email.</td></tr>
    </table>
  </td></tr>
</table>`,
  };
}
