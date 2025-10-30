import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email, subject, html } = await request.json();

  try {
    const { data, error } = await resend.emails.send({
      from: "Get At Me <noreply@getat.me>",
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
