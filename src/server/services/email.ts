import "server-only";

import { Resend } from "resend";

import { env } from "@/lib/env";

import { verificationEmail } from "./email-templates";

const resend = new Resend(env.RESEND_API_KEY);

export async function sendVerificationEmail({
  to,
  name,
  url,
}: {
  to: string;
  name: string;
  url: string;
}) {
  const { subject, html, text } = verificationEmail({ name, url });

  const { error } = await resend.emails.send({
    from: env.EMAIL_FROM,
    to,
    subject,
    html,
    text,
  });

  // Never log `to`: email addresses are PII
  if (error) {
    console.error(
      "[email] verification send failed:",
      error.name,
      error.message
    );
  }
}
