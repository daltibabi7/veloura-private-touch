"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Booking } from "@/lib/data";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  FileText,
  User,
  Shield,
  ArrowLeft,
  Download,
  AlertCircle,
} from "lucide-react";

export default function CustomerDashboard() {
  const [email, setEmail] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const userEmail = localStorage.getItem("veloura_user_email") || "client@veloura-private.com";
    setEmail(userEmail);

    const storedBookings = localStorage.getItem("veloura_bookings");
    if (storedBookings) {
      try {
        setBookings(JSON.parse(storedBookings));
      } catch (e) {}
    } else {
      // Default demo booking for immediate rich dashboard experience
      const demoBooking: Booking = {
        id: "bkg-demo-1",
        reference: "VPT-L992-NYC",
        createdAt: new Date().toISOString(),
        customerName: "Eleanor Vance",
        customerEmail: userEmail,
        customerPhone: "+1 (555) 234-5678",
        customerCity: "New York",
        customerState: "NY",
        customerZip: "10022",
        serviceId: "signature-experience",
        serviceName: "THE SIGNATURE EXPERIENCE",
        therapistId: "th-1",
        therapistName: "Sienna Vance, LMT",
        therapistGenderPref: "female",
        appointmentDate: "2026-11-28",
        appointmentTime: "14:00",
        serviceLocation: "The Carlyle Suite 1204, 35 E 76th St, New York, NY 10022",
        status: "CONFIRMED",
        totalPrice: 200,
        consentSigned: true,
        paymentId: "pi_demo_verified_9918",
      };
      setBookings([demoBooking]);
      localStorage.setItem("veloura_bookings", JSON.stringify([demoBooking]));
    }
  }, []);

  const handleCancelRequest = (ref: string) => {
    if (confirm(`Are you sure you want to request cancellation for booking ${ref}? As per our policy, cancellations with >24h notice receive full refund.`)) {
      const updated = bookings.map((b) =>
        b.reference === ref ? { ...b, status: "CANCELLED" as const } : b
      );
      setBookings(updated);
      localStorage.setItem("veloura_bookings", JSON.stringify(updated));
      alert("Cancellation request processed. Status updated to CANCELLED.");
    }
  };

  const handleDownloadReceipt = (booking: Booking) => {
    const receiptContent = `
========================================
       VELOURA PRIVATE TOUCH
   Official Digital Sanctuary Receipt
========================================
Booking Reference: ${booking.reference}
Date Issued: ${new Date().toLocaleDateString()}
Status: ${booking.status}

Client Name: ${booking.customerName}
Client Email: ${booking.customerEmail}

Service: ${booking.serviceName}
Duration: 75 Minutes
Appointment Schedule: ${booking.appointmentDate} at ${booking.appointmentTime}
Sanctuary Destination: ${booking.serviceLocation}
Assigned Practitioner: ${booking.therapistName}

Total Paid: $${booking.totalPrice}.00 USD
Payment Authorization: ${booking.paymentId}

Professional Boundary & Consent: Verified & Acknowledged
========================================
Veloura Private Touch • Discreet Luxury Wellness
    `;
    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Veloura_Receipt_${booking.reference}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F7F3EC] p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation back */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#DFCA9A] hover:text-[#F7F3EC] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Sanctuary</span>
          </Link>
          <span className="text-xs uppercase tracking-[0.25em] text-[#C6A66B]">
            Client Portal
          </span>
        </div>

        {/* Header Profile */}
        <div className="p-8 rounded-2xl bg-[#171719]/60 border border-[#C6A66B]/30 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C6A66B] mb-2">
              <User className="w-4 h-4" />
              <span>Verified Client Sanctuary Profile</span>
            </div>
            <h1
              className="text-3xl md:text-4xl font-serif tracking-wide text-[#F7F3EC]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Welcome, {email}
            </h1>
            <p className="text-xs text-[#999999] mt-1">
              Veloura Private Touch • Discretion Level: Tier 1 Confidential
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              href="/"
              className="px-6 py-2.5 rounded-full bg-[#C6A66B] text-[#0B0B0D] text-xs font-semibold uppercase tracking-widest hover:bg-[#DFCA9A] transition-colors"
            >
              Book New Experience
            </Link>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-6">
          <h2
            className="text-2xl font-serif text-[#F7F3EC] tracking-wide"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            Your Private Reservations
          </h2>

          {bookings.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#171719]/30 border border-[#26262B]">
              <p className="text-xs text-[#999999] uppercase tracking-widest">
                No active reservations found.
              </p>
            </div>
          ) : (
            bookings.map((b) => (
              <div
                key={b.id}
                className="p-6 md:p-8 rounded-2xl bg-[#171719]/40 border border-[#26262B] hover:border-[#C6A66B]/40 transition-all duration-300 space-y-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#26262B]">
                  <div>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#999999]">
                      Booking Passport
                    </span>
                    <h3 className="text-xl font-serif text-[#DFCA9A] tracking-wider mt-0.5">
                      {b.serviceName}
                    </h3>
                    <p className="text-xs text-[#999999]">Reference: <strong className="text-[#F7F3EC]">{b.reference}</strong></p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs uppercase tracking-wider px-3 py-1 rounded-full border ${
                        b.status === "CONFIRMED" || b.status === "PAYMENT_VERIFIED"
                          ? "bg-emerald-950/40 border-emerald-600/40 text-emerald-400"
                          : b.status === "CANCELLED"
                          ? "bg-rose-950/40 border-rose-600/40 text-rose-400"
                          : "bg-[#26262B] text-[#DFCA9A]"
                      }`}
                    >
                      {b.status.replace("_", " ")}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#999999]">
                  <div className="space-y-1">
                    <span className="text-[#C6A66B] uppercase tracking-wider text-[10px] block">
                      Date & Schedule
                    </span>
                    <div className="flex items-center gap-2 text-[#F7F3EC]">
                      <Calendar className="w-4 h-4 text-[#DFCA9A]" />
                      <span>{b.appointmentDate} at {b.appointmentTime}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[#C6A66B] uppercase tracking-wider text-[10px] block">
                      Therapist Match
                    </span>
                    <div className="flex items-center gap-2 text-[#F7F3EC]">
                      <Shield className="w-4 h-4 text-[#DFCA9A]" />
                      <span>{b.therapistName}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[#C6A66B] uppercase tracking-wider text-[10px] block">
                      Private Destination
                    </span>
                    <div className="flex items-center gap-2 text-[#F7F3EC]">
                      <MapPin className="w-4 h-4 text-[#DFCA9A]" />
                      <span className="truncate">{b.serviceLocation}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between pt-4 border-t border-[#26262B] text-xs">
                  <div className="text-[#999999]">
                    Amount Paid: <strong className="text-[#DFCA9A]">${b.totalPrice}.00 USD</strong>
                  </div>

                  <div className="flex items-center gap-4 mt-3 sm:mt-0">
                    <button
                      onClick={() => handleDownloadReceipt(b)}
                      className="flex items-center gap-1.5 text-xs text-[#DFCA9A] hover:text-[#F7F3EC] uppercase tracking-wider cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Receipt</span>
                    </button>

                    {b.status !== "CANCELLED" && (
                      <button
                        onClick={() => handleCancelRequest(b.reference)}
                        className="text-xs text-rose-400 hover:text-rose-300 uppercase tracking-wider cursor-pointer"
                      >
                        Request Cancellation
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
