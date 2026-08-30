import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

type FeedbackPayload = {
  name?: unknown;
  email?: unknown;
  interest?: unknown;
  message?: unknown;
};

const recipient = "peechusaicharan@gmail.com";

function textValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const body = (await request.json()) as FeedbackPayload;
  const name = textValue(body.name);
  const email = textValue(body.email);
  const interest = textValue(body.interest);
  const message = textValue(body.message);

  if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Please provide a name, valid email, and message." }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendApiKey = process.env.RESEND_API_KEY;
  const emailFrom = process.env.FEEDBACK_EMAIL_FROM;

  if (!supabaseUrl || !supabaseServiceRoleKey || !resendApiKey || !emailFrom) {
    return NextResponse.json({ error: "Feedback service is not configured yet." }, { status: 503 });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { error: insertError } = await supabase.from("feedback").insert({ name, email, interest: interest || null, message });

  if (insertError) {
    console.error("Supabase feedback insert failed", insertError);
    return NextResponse.json({ error: "We could not save your enquiry. Please try again." }, { status: 500 });
  }

  const resend = new Resend(resendApiKey);
  const { error: emailError } = await resend.emails.send({
    from: emailFrom,
    to: [recipient],
    replyTo: email,
    subject: `New Agriwerk enquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nInterest: ${interest || "Not specified"}\n\nMessage:\n${message}`,
  });

  if (emailError) {
    console.error("Feedback email notification failed", emailError);
    return NextResponse.json({ error: "Your enquiry was saved, but the email notification failed." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}