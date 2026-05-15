import { auth } from "@clerk/nextjs/server";
import { Resend } from "resend";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
}

export async function POST(request: Request) {
  // Require authentication to prevent abuse
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { email, subject, html } = await request.json();

  // Basic validation
  if (!email || !subject || !html) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const resend = getResendClient();
  if (!resend) {
    return Response.json({ error: "Email service is not configured" }, { status: 503 });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Get At Me <notify@uncap.us>",
      to: email,
      subject: subject,
      html: html,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
