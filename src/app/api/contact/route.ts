import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Message from "@/models/Message";
import { contactSchema } from "@/lib/validation/contactSchema";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];

      return NextResponse.json(
        {
          success: false,
          message: firstIssue?.message || "Invalid form data",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, email, phone, subject, message } = parsed.data;

    await connectDB();

    await Message.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    try {
      await sendEmail({ name, email, phone, subject, message });
    } catch (emailError) {
      const msg = emailError instanceof Error ? emailError.message : "Email delivery failed";
      console.error("Email delivery failed:", emailError);
      
      // Still return success since DB creation worked, but maybe warn them
      return NextResponse.json(
        {
          success: true,
          message: "Message saved to database, but email delivery failed. " + msg,
        },
        { status: 200 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server error";

    console.log("❌ FULL ERROR:", error);
    console.log("❌ ERROR MESSAGE:", message);
    console.log("❌ STACK:", error instanceof Error ? error.stack : undefined);

    return NextResponse.json(
      { success: false, message },
      { status: 500 },
    );
  }
}
