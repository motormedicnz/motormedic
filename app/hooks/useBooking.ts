"use client";

import { useState } from "react";

export interface BookingService {
  id: string;
  title: string;
  tagline?: string;
}

export const useBooking = () => {
  const [selectedService, setSelectedService] =
    useState<BookingService | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const openBooking = (service: BookingService) => {
    setSelectedService(service);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeBooking = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  return {
    selectedService,
    isOpen,
    openBooking,
    closeBooking,
  };
};