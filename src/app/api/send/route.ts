import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";
import { type NextRequest } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { message, email } = await req.json();

    if (!message || !email) {
      return Response.json(
        { error: "Message and email are required" },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio <portfolio@resend.dev>",
      to: [process.env.TO_EMAIL || ""],
      subject: "PORTFOLIO CONTACT FORM",
      react: EmailTemplate({ email: email, message: message }),
      text: `From: ${email}\n\nMessage: ${message}`,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
