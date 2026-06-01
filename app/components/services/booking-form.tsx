"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { BookingService } from "@/app/hooks/useBooking";

interface BookingFormProps {
    service: BookingService;
    onSuccess?: () => void;
}

export const BookingForm = ({
    service,
    onSuccess,
}: BookingFormProps) => {
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [verified, setVerified] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        make: "",
        model: "",
        year: "",
        preferredDate: "",
        preferredTime: "",
        notes: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const sendOtp = async () => {
        if (!formData.email) {
            alert("Enter email first");
            return;
        }

        try {
            setOtpLoading(true);

            const response = await fetch("/api/send-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            setOtpSent(true);

            alert("OTP sent successfully.");
        } catch (error) {
            console.error(error);
            alert("Failed to send OTP.");
        } finally {
            setOtpLoading(false);
        }
    };
    const verifyOtp = async () => {
        try {
            setOtpLoading(true);

            const response = await fetch("/api/verify-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    otp,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            setVerified(true);

            alert("Email verified successfully.");
        } catch (error) {
            console.error(error);
            alert("Invalid OTP.");
        } finally {
            setOtpLoading(false);
        }
    };
    const sendBooking = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                {
                    service_name: service.title,
                    customer_name: formData.name,
                    customer_phone: formData.phone,
                    customer_email: formData.email,
                    vehicle_make: formData.make,
                    vehicle_model: formData.model,
                    vehicle_year: formData.year,
                    preferred_date: formData.preferredDate,
                    preferred_time: formData.preferredTime,
                    submitted_at: new Date().toLocaleString(),

                    customer_notes:
                        formData.notes || "No additional notes provided.",
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );

            alert("Booking request sent successfully.");

            setFormData({
                name: "",
                phone: "",
                email: "",
                make: "",
                model: "",
                year: "",
                preferredDate: "",
                preferredTime: "",
                notes: "",
            });

            onSuccess?.();
        } catch (error) {
            console.error(error);
            alert("Failed to send booking request.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={sendBooking}
            className="space-y-5"
        >

            {/* SECTION */}
            <div>
                <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/40">
                    Customer Info
                </p>

                <div className="grid gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="h-14 rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-sm text-white outline-none transition focus:border-red-500"
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="h-14 rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-sm text-white outline-none transition focus:border-red-500"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="h-14 rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-sm text-white outline-none transition focus:border-red-500"
                        />
                        <div className="sm:col-span-2 space-y-3">

                            {!verified && (
                                <button
                                    type="button"
                                    onClick={sendOtp}
                                    disabled={otpLoading}
                                    className="h-11 rounded-xl border border-white/10 bg-white/[0.03] px-5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-red-500"
                                >
                                    {otpLoading
                                        ? "Sending..."
                                        : otpSent
                                            ? "Resend OTP"
                                            : "Verify Email"}
                                </button>
                            )}

                            {otpSent && !verified && (
                                <div className="flex gap-3">

                                    <input
                                        type="text"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={(e) =>
                                            setOtp(e.target.value)
                                        }
                                        className="h-12 flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none focus:border-red-500"
                                    />

                                    <button
                                        type="button"
                                        onClick={verifyOtp}
                                        className="rounded-xl bg-red-600 px-5 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-red-500"
                                    >
                                        Verify
                                    </button>

                                </div>
                            )}

                            {verified && (
                                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
                                    Email verified successfully.
                                </div>
                            )}

                        </div>

                    </div>
                </div>
            </div>

            {/* VEHICLE */}
            <div>
                <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/40">
                    Vehicle Info
                </p>

                <div className="grid gap-4 sm:grid-cols-3">
                    <input
                        type="text"
                        name="make"
                        placeholder="Make"
                        required
                        value={formData.make}
                        onChange={handleChange}
                        className="h-14 rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-sm text-white outline-none transition focus:border-red-500"
                    />

                    <input
                        type="text"
                        name="model"
                        placeholder="Model"
                        required
                        value={formData.model}
                        onChange={handleChange}
                        className="h-14 rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-sm text-white outline-none transition focus:border-red-500"
                    />

                    <input
                        type="text"
                        name="year"
                        placeholder="Year"
                        value={formData.year}
                        onChange={handleChange}
                        className="h-14 rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-sm text-white outline-none transition focus:border-red-500"
                    />
                </div>
            </div>

            {/* DATE */}
            <div>
                <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/40">
                    Booking Preference
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                    <input
                        type="date"
                        name="preferredDate"
                        required
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="h-14 rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-sm text-white outline-none transition focus:border-red-500"
                    />

                    <input
                        type="time"
                        name="preferredTime"
                        required
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className="h-14 rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-sm text-white outline-none transition focus:border-red-500"
                    />
                </div>
            </div>

            {/* NOTES */}
            <div>
                <textarea
                    name="notes"
                    placeholder="Describe the issue or additional notes..."
                    rows={4}
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-white outline-none transition focus:border-red-500"
                />
            </div>

            {/* BUTTON */}
            <button
                type="submit"
                disabled={loading || !verified}
                className="flex h-14 w-full items-center justify-center rounded-2xl bg-red-600 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-red-500 disabled:opacity-50"
            >
                {loading
                    ? "Sending..."
                    : !verified
                        ? "Verify Email First"
                        : `Book ${service.title}`}            </button>

        </form>
    );
};