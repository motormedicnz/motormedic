import { NextResponse } from "next/server";
import { Resend } from "resend";
import { otpStore } from "@/lib/otp-store";

const resend = new Resend(process.env.RESEND_API_KEY);


export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email required" },
        { status: 400 }
      );
    }

    // generate 6 digit otp
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // expires in 5 mins
    otpStore.set(email, {
      otp,
      expires: Date.now() + 5 * 60 * 1000,
    });

    const result = await resend.emails.send({
      from: "Motor Medic <noreply@motormedic.co.nz>",
      to: email,
      subject: "Your Verification Code",
      html: `
        <div style="font-family:Arial;padding:24px;">
          <h2>Email Verification</h2>

          <p>Your OTP code is:</p>

          <div style="
            font-size:32px;
            font-weight:800;
            letter-spacing:8px;
            margin:24px 0;
          ">
            ${otp}
          </div>

          <p>
            This code expires in 5 minutes.
          </p>
        </div>
      `,
    });
    console.log(result);
    if (result.error) {
  return NextResponse.json(
    { error: result.error.message },
    { status: 500 }
  );
}

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to send OTP" },
      { status: 500 }
    );
  }
}