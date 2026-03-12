import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, state, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // ── 1. Client (admin) ko notification ──
    await transporter.sendMail({
      from: `"NextGen Contact Form" <${process.env.GMAIL_USER}>`,
      to: "admin@nextgenlg.com.au",
      subject: `New Enquiry from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #00674E; border-bottom: 2px solid #00674E; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr style="background: #f5faf8;">
              <td style="padding: 10px 14px; font-weight: 600; width: 140px;">Name</td>
              <td style="padding: 10px 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; font-weight: 600;">Email</td>
              <td style="padding: 10px 14px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr style="background: #f5faf8;">
              <td style="padding: 10px 14px; font-weight: 600;">Phone</td>
              <td style="padding: 10px 14px;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; font-weight: 600;">State</td>
              <td style="padding: 10px 14px;">${state || "Not specified"}</td>
            </tr>
            <tr style="background: #f5faf8;">
              <td style="padding: 10px 14px; font-weight: 600; vertical-align: top;">Message</td>
              <td style="padding: 10px 14px;">${message}</td>
            </tr>
          </table>
        </div>
      `,
    });

    // ── 2. User ko thank you confirmation ──
    await transporter.sendMail({
      from: `"NextGen Lending Group" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Thank You for Contacting NextGen, ${name}!`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #ffffff;">
          <div style="background: #00674E; padding: 24px 28px; border-radius: 10px 10px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px;">NextGen Lending Group</h1>
          </div>
          <div style="background: #f5faf8; padding: 32px 28px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #00674E; margin-top: 0;">Thank You, ${name}!</h2>
            <p style="color: #3f3f3f; line-height: 1.7; font-size: 15px;">
              We've received your message and appreciate you reaching out to us.
              Our team will review your enquiry and get back to you as soon as possible —
              usually within <strong>1–2 business days</strong>.
            </p>
            <div style="background: #ffffff; border-left: 4px solid #00674E; padding: 16px 20px; border-radius: 6px; margin: 24px 0;">
              <p style="margin: 0; color: #3f3f3f; font-size: 14px;"><strong>Your message:</strong></p>
              <p style="margin: 8px 0 0; color: #4a6460; font-size: 14px; line-height: 1.6;">${message}</p>
            </div>
            <p style="color: #3f3f3f; line-height: 1.7; font-size: 15px;">
              If you need urgent assistance, feel free to call us directly at
              <a href="tel:0424687866" style="color: #00674E; font-weight: 600;">0424 687 866</a>.
            </p>
            <p style="color: #3f3f3f; font-size: 15px; margin-bottom: 0;">
              Warm regards,<br/>
              <strong style="color: #00674E;">The NextGen Lending Group Team</strong>
            </p>
          </div>
          <p style="text-align: center; color: #9C9C9C; font-size: 12px; margin-top: 20px;">
            © ${new Date().getFullYear()} NextGen Lending Group · PO Box 52, Vermont VIC 3133
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Mail error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}