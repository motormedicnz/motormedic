"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { format, isBefore, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, parseISO, isSameDay, isSameMonth } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { Calendar, Clock as ClockIcon } from "lucide-react";
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
    const [dateTimeError, setDateTimeError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const next = {
            ...formData,
            [e.target.name]: e.target.value,
        };
        setFormData(next);

        if (e.target.name === "preferredDate" || e.target.name === "preferredTime") {
            const err = validateDateTime(
                next.preferredDate,
                next.preferredTime
            );
            setDateTimeError(err);
        }
    };

    const nzMinDate = useMemo(() => {
        try {
            const nowNz = toZonedTime(new Date(), "Pacific/Auckland");
            return format(nowNz, "yyyy-MM-dd");
        } catch (e) {
            return "";
        }
    }, []);

    const setPreferredDateValue = (isoDate: string) => {
        const next = { ...formData, preferredDate: isoDate };
        setFormData(next);
        const err = validateDateTime(next.preferredDate, next.preferredTime);
        setDateTimeError(err);
    };

    const setPreferredTimeValue = (time: string) => {
        const next = { ...formData, preferredTime: time };
        setFormData(next);
        const err = validateDateTime(next.preferredDate, next.preferredTime);
        setDateTimeError(err);
    };

    // ── DatePicker ──────────────────────────────────────────────────────────
    const DatePicker = ({
        value,
        onChange,
        minDate,
    }: {
        value: string;
        onChange: (d: string) => void;
        minDate: string;
    }) => {
        const [open, setOpen] = useState(false);
        const [viewDate, setViewDate] = useState(() => {
            try {
                return value ? parseISO(value) : toZonedTime(new Date(), "Pacific/Auckland");
            } catch {
                return new Date();
            }
        });
        const start = startOfWeek(startOfMonth(viewDate), { weekStartsOn: 1 });
        const end = endOfWeek(endOfMonth(viewDate), { weekStartsOn: 1 });
        const days = eachDayOfInterval({ start, end });

        const todayNz = toZonedTime(new Date(), "Pacific/Auckland");
        const minIso = minDate || format(todayNz, "yyyy-MM-dd");

        // Formatted label for the trigger button — single clean string, no duplication
        const buttonLabel = value
            ? format(parseISO(value), "EEE, d MMM yyyy")
            : "Select date";

        return (
            <div className="relative w-full">
                {/* Trigger button */}
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-sm text-white text-left outline-none transition focus:border-red-500 flex items-center gap-3 overflow-hidden"
                >
                    <Calendar className="h-4 w-4 shrink-0 text-white/70" />
                    {/* Single label — no separate month/year badge that caused duplication */}
                    <span className="flex-1 truncate">{buttonLabel}</span>
                </button>

                {/* Dropdown */}
                {open && (
  <div
    onClick={(e) => e.stopPropagation()}
    className="
      absolute z-50 mt-2
      left-0
      w-full
      md:w-[260px]
      lg:w-[250px]
      rounded-2xl
      border border-white/10
      bg-[#050505]
      p-4
      shadow-xl
    "
  >
                        {/* Month navigation */}
                        <div className="flex items-center justify-between px-1 mb-3">
                            <button
                                type="button"
                                onClick={() => setViewDate((d) => subMonths(d, 1))}
                                className="p-2 text-white/70 hover:text-white"
                                aria-label="Previous month"
                            >
                                ‹
                            </button>

                            <div className="text-sm font-semibold text-white">
                                {format(viewDate, "MMMM yyyy")}
                            </div>

                            <div className="flex items-center gap-1">
                                <button
                                    type="button"
                                    onClick={() => setViewDate((d) => addMonths(d, 1))}
                                    className="p-2 text-white/70 hover:text-white"
                                    aria-label="Next month"
                                >
                                    ›
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="p-2 text-white/60 rounded hover:bg-white/[0.05]"
                                    aria-label="Close calendar"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        {/* Day-of-week headers */}
                        <div className="grid grid-cols-7 gap-1 text-xs text-white/50 mb-2">
                            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                                <div key={d} className="text-center">
                                    {d}
                                </div>
                            ))}
                        </div>

                        {/* Day cells */}
                        <div className="grid grid-cols-7 gap-1">
                            {days.map((day) => {
                                const iso = format(day, "yyyy-MM-dd");
                                const disabled = iso < minIso;
                                const selected = value ? isSameDay(parseISO(value), day) : false;
                                const inMonth = isSameMonth(day, viewDate);

                                return (
                                    <button
                                        key={iso}
                                        type="button"
                                        onClick={() => {
                                            if (!disabled && inMonth) {
                                                onChange(iso);
                                                setOpen(false);
                                            }
                                        }}
                                        disabled={disabled || !inMonth}
                                        className={[
                                            "aspect-square w-full flex items-center justify-center rounded-lg text-sm transition",
                                            disabled || !inMonth
                                                ? "text-white/20 cursor-default"
                                                : "text-white hover:bg-white/[0.06] cursor-pointer",
                                            selected ? "!bg-red-600 !text-white" : "",
                                            !inMonth ? "opacity-30" : "",
                                        ]
                                            .filter(Boolean)
                                            .join(" ")}
                                    >
                                        {format(day, "d")}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // ── TimePicker ──────────────────────────────────────────────────────────
    const TimePicker = ({
        value,
        onChange,
    }: {
        value: string;
        onChange: (t: string) => void;
    }) => {
        const [open, setOpen] = useState(false);
        const ref = useRef<HTMLDivElement | null>(null);

        useEffect(() => {
            function onDoc(e: MouseEvent) {
                if (!ref.current) return;
                if (!ref.current.contains(e.target as Node)) setOpen(false);
            }
            document.addEventListener("mousedown", onDoc);
            return () => document.removeEventListener("mousedown", onDoc);
        }, []);

        const slots: string[] = [];
        for (let m = 8 * 60 + 30; m <= 17 * 60; m += 30) {
            const hh = Math.floor(m / 60)
                .toString()
                .padStart(2, "0");
            const mm = (m % 60).toString().padStart(2, "0");
            slots.push(`${hh}:${mm}`);
        }

        return (
            <div className="relative w-full" ref={ref}>
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-sm text-white text-left outline-none transition focus:border-red-500 flex items-center gap-3"
                >
                    <ClockIcon className="h-4 w-4 shrink-0 text-white/70" />
                    <span className="flex-1 truncate">{value || "Select time"}</span>
                </button>

                {open && (
                    <div
                        className="
                            absolute z-50 mt-2
                            left-0 right-0 w-full
                            max-h-56 overflow-y-auto
                            rounded-2xl border border-white/10 bg-[#050505] p-3 shadow-xl
                            sm:w-[200px] sm:right-auto
                        "
                    >
                        <div className="grid gap-1">
                            {slots.map((s) => (
                                <button
                                    type="button"
                                    key={s}
                                    onClick={() => {
                                        onChange(s);
                                        setOpen(false);
                                    }}
                                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                                        s === value
                                            ? "bg-red-600 text-white"
                                            : "text-white/90 hover:bg-white/[0.06]"
                                    }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // ── Validation ──────────────────────────────────────────────────────────
    function validateDateTime(dateStr: string, timeStr: string): string | null {
        if (!dateStr || !timeStr)
            return "Please choose a date and time according to the working hours (08:30–17:00 NZ time).";

        const combined = `${dateStr}T${timeStr}:00`;
        let nzLocal: Date;
        try {
            nzLocal = toZonedTime(combined, "Pacific/Auckland");
        } catch {
            return "Invalid date or time.";
        }

        const nowNz = toZonedTime(new Date(), "Pacific/Auckland");
        if (isBefore(nzLocal, nowNz)) {
            return "Selected time is in the past. Please pick a future time in NZ time.";
        }

        const day = nzLocal.getDay();
        const [hStr, mStr] = timeStr.split(":");
        const h = Number(hStr || 0);
        const m = Number(mStr || 0);
        const minutes = h * 60 + m;
        const openMinutes = 8 * 60 + 30;
        const closeMinutes = 17 * 60;

        if (day >= 1 && day <= 6) {
            if (minutes < openMinutes || minutes > closeMinutes) {
                return "Bookings available between 08:30 and 17:00 (NZ time).";
            }
        }

        return null;
    }

    // ── OTP ─────────────────────────────────────────────────────────────────
    const sendOtp = async () => {
        if (!formData.email) {
            alert("Enter email first");
            return;
        }
        try {
            setOtpLoading(true);
            const response = await fetch("/api/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.email }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);
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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.email, otp }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);
            setVerified(true);
            alert("Email verified successfully.");
        } catch (error) {
            console.error(error);
            alert("Invalid OTP.");
        } finally {
            setOtpLoading(false);
        }
    };

    // ── Submit ───────────────────────────────────────────────────────────────
    const sendBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                {
                    service_name: service.title,
                    other_service_details:
                        service.id === "other-service" ? formData.notes : "",
                    customer_name: formData.name,
                    customer_phone: formData.phone,
                    customer_email: formData.email,
                    vehicle_make: formData.make,
                    vehicle_model: formData.model,
                    vehicle_year: formData.year,
                    preferred_date: formData.preferredDate,
                    preferred_time: formData.preferredTime,
                    submitted_at: new Date().toLocaleString(),
                    customer_notes: formData.notes || "No additional notes provided.",
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

    // ── Render ───────────────────────────────────────────────────────────────
    return (
        <form onSubmit={sendBooking} className="space-y-5">

            {/* CUSTOMER INFO */}
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
                                        onChange={(e) => setOtp(e.target.value)}
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

            {/* VEHICLE INFO */}
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

            {/* BOOKING PREFERENCE */}
            <div>
                <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/40">
                    Booking Preference
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                    <DatePicker
                        value={formData.preferredDate}
                        onChange={setPreferredDateValue}
                        minDate={nzMinDate}
                    />

                    <TimePicker
                        value={formData.preferredTime}
                        onChange={setPreferredTimeValue}
                    />

                    {dateTimeError && (
                        <p className="col-span-2 text-sm text-yellow-300">
                            {dateTimeError}
                        </p>
                    )}
                </div>
            </div>

            {/* NOTES / SERVICE DESCRIPTION */}
            <div>
                <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/40">
                    {service.id === "other-service"
                        ? "Service Description"
                        : "Additional Notes"}
                </p>

                <textarea
                    name="notes"
                    placeholder={
                        service.id === "other-service"
                            ? "Describe the service you require..."
                            : "Describe the issue or any additional information..."
                    }
                    rows={4}
                    required={service.id === "other-service"}
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white outline-none transition focus:border-red-500 resize-none"
                />
            </div>

            {/* SUBMIT */}
            <button
                type="submit"
                disabled={loading || !verified}
                className="flex h-14 w-full items-center justify-center rounded-2xl bg-red-600 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-red-500 disabled:opacity-50"
            >
                {loading
                    ? "Sending..."
                    : !verified
                    ? "Verify Email First"
                    : `Book ${service.title}`}
            </button>

        </form>
    );
};