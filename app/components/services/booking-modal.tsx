"use client";

import { X } from "lucide-react";
import { BookingForm } from "./booking-form";
import { BookingService } from "@/app/hooks/useBooking";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: BookingService | null;
}

export const BookingModal = ({
  isOpen,
  onClose,
  service,
}: BookingModalProps) => {
  if (!isOpen || !service) return null;

  return (
<div className="fixed inset-0 z-[999] overflow-y-auto bg-black/80 backdrop-blur-sm px-4 py-6">      {/* BACKDROP */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      {/* MODAL */}
<div className="relative mx-auto my-10 w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#050505] shadow-2xl">
        {/* TOP GLOW */}
        <div className="absolute left-0 top-0 h-1 w-full bg-red-600" />

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-red-600"
        >
          <X size={18} />
        </button>

        <div className="grid md:grid-cols-[1fr_1.2fr]">

          {/* LEFT PANEL */}
          <div className="relative overflow-hidden border-b border-white/10 p-8 md:border-b-0 md:border-r">

            <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent" />

            <div className="relative z-10">
              <p className="mb-3 text-xs uppercase tracking-[0.35em] text-red-500">
                Service Booking
              </p>

              <h2 className="text-4xl font-black uppercase leading-none text-white">
                {service.title}
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-white/60">
                {service.tagline ||
                  "Premium automotive care tailored for performance, reliability, and precision."}
              </p>

              <div className="mt-10 space-y-4">

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                    Workshop Promise
                  </p>

                  <p className="mt-2 text-sm text-white/70">
                    Fast diagnostics, transparent pricing, and expert-level workmanship.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                    Booking Time
                  </p>

                  <p className="mt-2 text-sm text-white/70">
                    Takes less than a minute to complete.
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="p-6 md:p-8">
            <BookingForm service={service} onSuccess={onClose} />
          </div>

        </div>
      </div>
    </div>
  );
};