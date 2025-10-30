import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email, subject, html } = await request.json();
  const data = await resend.emails.send({
    from: "Get At Me <noreply@getat.me>",
    to: email,
    subject: subject,
    html: html,
  });

  return NextResponse.json(data);
}
