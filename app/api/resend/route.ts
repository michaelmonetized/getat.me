import { NextResponse } from "next/server";
import { Resend } from "resend";

const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
};

export async function POST(request: Request) {
  const { email, subject, html } = await request.json();
  const resend = getResend();
  
  const data = await resend.emails.send({
    from: "Get At Me <noreply@getat.me>",
    to: email,
    subject: subject,
    html: html,
  });

  return NextResponse.json(data);
}
