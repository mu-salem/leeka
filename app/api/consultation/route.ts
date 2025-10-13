import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Here you can integrate with your email service
    // For example: SendGrid, Resend, Nodemailer, etc.
    
    // Example with a simple approach (you'll need to implement your email service):
    // Option 1: Use SendGrid
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // await sgMail.send({
    //   to: 'your-email@example.com',
    //   from: 'noreply@lekkatech.com',
    //   subject: `New Consultation Request from ${name}`,
    //   html: `
    //     <h2>New Consultation Request</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `
    // });

    // Option 2: Use Resend (recommended for Next.js)
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'Lekka Tech <onboarding@resend.dev>',
    //   to: 'your-email@example.com',
    //   subject: `New Consultation Request from ${name}`,
    //   html: `
    //     <h2>New Consultation Request</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `
    // });

    // For now, just log the data (replace with actual email sending)
    console.log("Consultation request received:", {
      name,
      email,
      phone,
      message,
      timestamp: new Date().toISOString(),
    });

    // Simulate email sending
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(
      { message: "Consultation request sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing consultation request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
