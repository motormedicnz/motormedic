import { NextResponse } from "next/server";
import { otpStore } from "@/lib/otp-store";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    const data = otpStore.get(email);

    if (!data) {
      return NextResponse.json(
        { error: "No OTP found" },
        { status: 400 }
      );
    }

    if (Date.now() > data.expires) {
      otpStore.delete(email);

      return NextResponse.json(
        { error: "OTP expired" },
        { status: 400 }
      );
    }

    if (data.otp !== otp) {
      return NextResponse.json(
        { error: "Invalid OTP" },
        { status: 400 }
      );
    }

    otpStore.delete(email);

    return NextResponse.json({
      verified: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}