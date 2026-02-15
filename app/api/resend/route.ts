import { auth } from "@clerk/nextjs/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
