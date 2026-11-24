"use client";

import React, { useState } from "react";
import { X, Shield, CheckCircle, CreditCard, Lock, Sparkles, MapPin, Clock, Calendar as CalendarIcon, FileCheck } from "lucide-react";
import { Service, Therapist, Booking } from "@/lib/data";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  therapists: Therapist[];
  selectedServiceId?: string;
  selectedTherapistId?: string;
  onBookingSuccess: (booking: Booking) => void;
}

export default function BookingModal({
  isOpen,
  onClose,
  services,
  therapists,
  selectedServiceId,
  selectedTherapistId,
  onBookingSuccess,
}: BookingModalProps) {
  // Step 1: Selection & Preferences
  // Step 2: Personal Details & Location
  // Step 3: Consent & Professional Boundaries Agreement
  // Step 4: Secure Payment & Verification
  // Step 5: Confirmation
  const [step, setStep] = useState<number>(1);

  const [serviceId, setServiceId] = useState<string>(selectedServiceId || services[0]?.id || "");
  const [therapistId, setTherapistId] = useState<string>(selectedTherapistId || "any");
  const [genderPref, setGenderPref] = useState<string>("no-preference");
  const [date, setDate] = useState<string>("2026-11-28");
  const [time, setTime] = useState<string>("14:00");

  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [city, setCity] = useState<string>("New York");
  const [state, setState] = useState<string>("NY");
  const [zip, setZip] = useState<string>("10022");
  const [locationAddress, setLocationAddress] = useState<string>("The Carlyle, 35 E 76th St, Suite 1204");
  const [accessibilityNotes, setAccessibilityNotes] = useState<string>("");

  // Consent checkboxes
  const [consentBoundaries, setConsentBoundaries] = useState<boolean>(false);
  const [consentHealth, setConsentHealth] = useState<boolean>(false);
  const [consentPrivacy, setConsentPrivacy] = useState<boolean>(false);

  // Payment state
  const [cardNumber, setCardNumber] = useState<string>("4242 •••• •••• 4242");
  const [cardExp, setCardExp] = useState<string>("12/28");
  const [cardCvc, setCardCvc] = useState<string>("888");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  if (!isOpen) return null;

  const currentService = services.find((s) => s.id === serviceId) || services[0];
  const currentTherapist = therapists.find((t) => t.id === therapistId);

  const handleNextToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleNextToStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !locationAddress) {
      alert("Please provide all required client and location details.");
      return;
    }
    setStep(3);
  };

  const handleNextToStep4 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentBoundaries || !consentHealth || !consentPrivacy) {
      alert("You must acknowledge and accept all professional boundaries and consent standards to proceed.");
      return;
    }
    setStep(4);
  };

  const handleExecutePayment = () => {
    setIsProcessing(true);

    // Simulate secure backend verification & webhook processing
    setTimeout(() => {
      const uniqueRef = "VPT-" + Math.random().toString(36).substring(2, 8).toUpperCase() + "-" + Math.floor(100 + Math.random() * 900);
      const newBooking: Booking = {
        id: "bkg-" + Date.now(),
        reference: uniqueRef,
        createdAt: new Date().toISOString(),
        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,
        customerCity: city,
        customerState: state,
        customerZip: zip,
        serviceId: currentService.id,
        serviceName: currentService.name,
        therapistId: currentTherapist ? currentTherapist.id : "th-assigned-1",
        therapistName: currentTherapist ? currentTherapist.name : "Matched Senior Licensed Therapist",
        therapistGenderPref: genderPref,
        appointmentDate: date,
        appointmentTime: time,
        serviceLocation: `${locationAddress}, ${city}, ${state} ${zip}`,
        accessibilityNotes,
        status: "PAYMENT_VERIFIED",
        totalPrice: currentService.price || 200,
        consentSigned: true,
        paymentId: "pi_" + Math.random().toString(36).substring(2, 12),
      };

      // Persist in localStorage for customer dashboard
      const existing = JSON.parse(localStorage.getItem("veloura_bookings") || "[]");
      localStorage.setItem("veloura_bookings", JSON.stringify([newBooking, ...existing]));

      setConfirmedBooking(newBooking);
      onBookingSuccess(newBooking);
      setIsProcessing(false);
      setStep(5);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0B0B0D] border border-[#C6A66B]/30 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(198,166,107,0.15)] my-auto text-[#F7F3EC]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#999999] hover:text-[#DFCA9A] transition-colors p-1"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pb-4 border-b border-[#171719] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-[0.25em] text-[#C6A66B] uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Private Reservation Concierge</span>
            </div>
            <h2
              className="text-2xl md:text-3xl font-serif text-[#F7F3EC] tracking-wider"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Veloura Private Touch
            </h2>
          </div>
          {step < 5 && (
            <div className="text-right">
              <span className="text-xs tracking-widest text-[#999999] uppercase">Stage</span>
              <p className="text-sm font-serif text-[#DFCA9A]">0{step} / 04</p>
            </div>
          )}
        </div>

        {/* STEP 1: SERVICE & PREFERENCES */}
        {step === 1 && (
          <form onSubmit={handleNextToStep2} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-[0.18em] text-[#DFCA9A] mb-2 font-medium">
                Select Sanctuary Experience
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {services.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setServiceId(s.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      serviceId === s.id
                        ? "border-[#C6A66B] bg-[#171719]/80 shadow-[0_0_15px_rgba(198,166,107,0.2)]"
                        : "border-[#171719] bg-[#0B0B0D] hover:border-[#C6A66B]/40"
                    }`}
                  >
                    <p className="text-xs font-serif text-[#F7F3EC] tracking-wider font-semibold mb-1">
                      {s.name}
                    </p>
                    <p className="text-[11px] text-[#999999] mb-2 line-clamp-2">{s.tagline}</p>
                    <div className="flex justify-between items-center text-xs font-medium text-[#DFCA9A]">
                      <span>{s.duration} min</span>
                      <span>${s.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-[#DFCA9A] mb-2 font-medium">
                  Therapist Matching
                </label>
                <select
                  value={therapistId}
                  onChange={(e) => setTherapistId(e.target.value)}
                  className="w-full bg-[#171719] border border-[#26262B] focus:border-[#C6A66B] rounded-lg px-3 py-2.5 text-xs text-[#F7F3EC] focus:outline-none"
                >
                  <option value="any">First Available Senior Match (Recommended)</option>
                  {therapists.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.title.split("&")[0]})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-[#DFCA9A] mb-2 font-medium">
                  Therapist Gender Preference
                </label>
                <select
                  value={genderPref}
                  onChange={(e) => setGenderPref(e.target.value)}
                  className="w-full bg-[#171719] border border-[#26262B] focus:border-[#C6A66B] rounded-lg px-3 py-2.5 text-xs text-[#F7F3EC] focus:outline-none"
                >
                  <option value="no-preference">No Preference (Discreet Professional Match)</option>
                  <option value="female">Female Therapist</option>
                  <option value="male">Male Therapist</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-[#DFCA9A] mb-2 font-medium">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#171719] border border-[#26262B] focus:border-[#C6A66B] rounded-lg px-3 py-2.5 text-xs text-[#F7F3EC] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-[#DFCA9A] mb-2 font-medium">
                  Preferred Time Slot
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#171719] border border-[#26262B] focus:border-[#C6A66B] rounded-lg px-3 py-2.5 text-xs text-[#F7F3EC] focus:outline-none"
                >
                  <option value="10:00">10:00 AM (Morning Tranquility)</option>
                  <option value="12:00">12:00 PM (Midday Restoration)</option>
                  <option value="14:00">02:00 PM (Afternoon Balance)</option>
                  <option value="16:30">04:30 PM (Sunset Unwind)</option>
                  <option value="19:00">07:00 PM (Evening Sanctuary)</option>
                  <option value="21:00">09:00 PM (Nighttime Deep Slumber)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#C6A66B] to-[#DFCA9A] text-[#0B0B0D] font-semibold text-xs tracking-[0.2em] uppercase cursor-pointer hover:shadow-[0_0_20px_rgba(198,166,107,0.4)] transition-all"
              >
                Continue to Client Details
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: CLIENT DETAILS & APPOINTMENT LOCATION */}
        {step === 2 && (
          <form onSubmit={handleNextToStep3} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-[#DFCA9A] mb-1 font-medium">
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Eleanor Vance"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#171719] border border-[#26262B] focus:border-[#C6A66B] rounded-lg px-3 py-2 text-xs text-[#F7F3EC] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-[#DFCA9A] mb-1 font-medium">
                  Confidential Email *
                </label>
                <input
                  type="email"
                  placeholder="name@exclusive.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#171719] border border-[#26262B] focus:border-[#C6A66B] rounded-lg px-3 py-2 text-xs text-[#F7F3EC] focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-[#DFCA9A] mb-1 font-medium">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 019-2834"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#171719] border border-[#26262B] focus:border-[#C6A66B] rounded-lg px-3 py-2 text-xs text-[#F7F3EC] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-[#DFCA9A] mb-1 font-medium">
                  City & State *
                </label>
                <input
                  type="text"
                  placeholder="New York, NY"
                  value={`${city}, ${state}`}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#171719] border border-[#26262B] focus:border-[#C6A66B] rounded-lg px-3 py-2 text-xs text-[#F7F3EC] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-[#DFCA9A] mb-1 font-medium">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  placeholder="10022"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="w-full bg-[#171719] border border-[#26262B] focus:border-[#C6A66B] rounded-lg px-3 py-2 text-xs text-[#F7F3EC] focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.18em] text-[#DFCA9A] mb-1 font-medium">
                Service Destination Address (Private Residence / Luxury Suite) *
              </label>
              <input
                type="text"
                placeholder="Hotel, Private Residence or Suite address (discreetly handled)"
                value={locationAddress}
                onChange={(e) => setLocationAddress(e.target.value)}
                className="w-full bg-[#171719] border border-[#26262B] focus:border-[#C6A66B] rounded-lg px-3 py-2 text-xs text-[#F7F3EC] focus:outline-none"
                required
              />
              <p className="text-[10px] text-[#999999] mt-1">
                Discreet travel protocol: Therapist arrives with sanitized luxury linens, botanical oils, and ambient soundscapes.
              </p>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.18em] text-[#DFCA9A] mb-1 font-medium">
                Accessibility & Comfort Requirements (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Mention any sensitivities, pressure preferences, injuries or room access instructions..."
                value={accessibilityNotes}
                onChange={(e) => setAccessibilityNotes(e.target.value)}
                className="w-full bg-[#171719] border border-[#26262B] focus:border-[#C6A66B] rounded-lg px-3 py-2 text-xs text-[#F7F3EC] focus:outline-none"
              />
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs uppercase tracking-widest text-[#999999] hover:text-[#F7F3EC]"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#C6A66B] to-[#DFCA9A] text-[#0B0B0D] font-semibold text-xs tracking-[0.2em] uppercase cursor-pointer hover:shadow-[0_0_20px_rgba(198,166,107,0.4)] transition-all"
              >
                Professional Standards & Consent
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: PROFESSIONAL BOUNDARIES & INFORMED CONSENT */}
        {step === 3 && (
          <form onSubmit={handleNextToStep4} className="space-y-4">
            <div className="p-4 rounded-xl bg-[#171719] border border-[#C6A66B]/30 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#DFCA9A] uppercase">
                <Shield className="w-4 h-4 text-[#C6A66B]" />
                <span>Statutory Standards & Mutual Protection Policy</span>
              </div>
              <p className="text-xs text-[#999999] leading-relaxed">
                VELOURA PRIVATE TOUCH operates under strict state massage therapy licensing boards (e.g. NYSED, CAMTC, FL Board).
                Every treatment is exclusively therapeutic and non-sexual. Our therapists are licensed healthcare professionals entitled to a dignified, secure, and respectful working environment.
              </p>
            </div>

            <div className="space-y-3 text-xs text-[#F7F3EC]">
              <label className="flex items-start gap-3 p-3 rounded-lg border border-[#26262B] bg-[#0B0B0D] cursor-pointer hover:border-[#C6A66B]/50 transition-colors">
                <input
                  type="checkbox"
                  checked={consentBoundaries}
                  onChange={(e) => setConsentBoundaries(e.target.checked)}
                  className="mt-0.5 accent-[#C6A66B]"
                />
                <span>
                  <strong>Professional Non-Sexual Boundaries:</strong> I acknowledge that services provided by Veloura therapists are strictly therapeutic. Any inappropriate suggestion, solicitation, or violation of boundaries results in immediate session termination without refund and permanent blacklist.
                </span>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-lg border border-[#26262B] bg-[#0B0B0D] cursor-pointer hover:border-[#C6A66B]/50 transition-colors">
                <input
                  type="checkbox"
                  checked={consentHealth}
                  onChange={(e) => setConsentHealth(e.target.checked)}
                  className="mt-0.5 accent-[#C6A66B]"
                />
                <span>
                  <strong>Informed Consent & Health Disclosure:</strong> I affirm that I have disclosed all relevant medical conditions, surgeries, and allergies, and grant informed consent for professional manual bodywork.
                </span>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-lg border border-[#26262B] bg-[#0B0B0D] cursor-pointer hover:border-[#C6A66B]/50 transition-colors">
                <input
                  type="checkbox"
                  checked={consentPrivacy}
                  onChange={(e) => setConsentPrivacy(e.target.checked)}
                  className="mt-0.5 accent-[#C6A66B]"
                />
                <span>
                  <strong>Privacy, Cancellation & Rescheduling:</strong> I agree to the Veloura 24-hour notice policy for cancellations or reschedules, and consent to confidential digital transmission of appointment records.
                </span>
              </label>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs uppercase tracking-widest text-[#999999] hover:text-[#F7F3EC]"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!consentBoundaries || !consentHealth || !consentPrivacy}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#C6A66B] to-[#DFCA9A] text-[#0B0B0D] font-semibold text-xs tracking-[0.2em] uppercase cursor-pointer disabled:opacity-40 transition-all"
              >
                Proceed to Payment (${currentService.price})
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: PAYMENT VERIFICATION */}
        {step === 4 && (
          <div className="space-y-5">
            <div className="flex justify-between items-center p-4 rounded-xl bg-[#171719] border border-[#26262B]">
              <div>
                <p className="text-sm font-serif text-[#F7F3EC]">{currentService.name}</p>
                <p className="text-xs text-[#999999]">{currentService.duration} Minutes • Dedicated Sanctuary Setup</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-serif text-[#DFCA9A]">${currentService.price}.00</span>
                <p className="text-[10px] text-[#C6A66B] uppercase tracking-wider">All Inclusive</p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs uppercase tracking-[0.18em] text-[#DFCA9A] font-medium">
                Encrypted Card Payment
              </label>

              <div className="p-4 rounded-xl border border-[#26262B] bg-[#121214] space-y-3">
                <div className="flex items-center justify-between border-b border-[#26262B] pb-2">
                  <div className="flex items-center gap-2 text-xs text-[#DFCA9A]">
                    <Lock className="w-3.5 h-3.5 text-[#C6A66B]" />
                    <span className="tracking-wider">256-bit TLS Encrypted Gateway</span>
                  </div>
                  <CreditCard className="w-5 h-5 text-[#999999]" />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#999999] mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-[#171719] border border-[#26262B] rounded px-3 py-2 text-xs text-[#F7F3EC] font-mono focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase text-[#999999] mb-1">Expiration</label>
                    <input
                      type="text"
                      value={cardExp}
                      onChange={(e) => setCardExp(e.target.value)}
                      className="w-full bg-[#171719] border border-[#26262B] rounded px-3 py-2 text-xs text-[#F7F3EC] font-mono focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-[#999999] mb-1">CVC / CVV</label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full bg-[#171719] border border-[#26262B] rounded px-3 py-2 text-xs text-[#F7F3EC] font-mono focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="text-xs uppercase tracking-widest text-[#999999] hover:text-[#F7F3EC]"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleExecutePayment}
                disabled={isProcessing}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C6A66B] via-[#DFCA9A] to-[#C6A66B] text-[#0B0B0D] font-bold text-xs tracking-[0.2em] uppercase cursor-pointer hover:shadow-[0_0_25px_rgba(198,166,107,0.5)] transition-all flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-[#0B0B0D] border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Webhook...</span>
                  </>
                ) : (
                  <span>Authorize & Confirm (${currentService.price})</span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: CONFIRMATION & APPOINTMENT PASSPORT */}
        {step === 5 && confirmedBooking && (
          <div className="text-center space-y-6 py-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#C6A66B]/10 border border-[#C6A66B] flex items-center justify-center mx-auto text-[#DFCA9A] shadow-[0_0_30px_rgba(198,166,107,0.3)]">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-[#C6A66B]">
                Payment Verified & Appointment Confirmed
              </span>
              <h3
                className="text-3xl font-serif text-[#F7F3EC] mt-1"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Welcome to Veloura
              </h3>
              <p className="text-xs text-[#999999] mt-1">
                Your private booking reference: <strong className="text-[#DFCA9A]">{confirmedBooking.reference}</strong>
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#171719] border border-[#26262B] text-left text-xs space-y-2">
              <div className="flex justify-between py-1 border-b border-[#26262B]">
                <span className="text-[#999999]">Experience:</span>
                <span className="text-[#F7F3EC] font-medium">{confirmedBooking.serviceName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#26262B]">
                <span className="text-[#999999]">Date & Time:</span>
                <span className="text-[#DFCA9A] font-medium">
                  {confirmedBooking.appointmentDate} at {confirmedBooking.appointmentTime}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#26262B]">
                <span className="text-[#999999]">Location:</span>
                <span className="text-[#F7F3EC]">{confirmedBooking.serviceLocation}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#26262B]">
                <span className="text-[#999999]">Therapist Status:</span>
                <span className="text-[#C6A66B]">Assigned & Pre-Briefed</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#999999]">Amount Paid:</span>
                <span className="text-[#DFCA9A] font-bold">${confirmedBooking.totalPrice}.00 USD</span>
              </div>
            </div>

            <p className="text-[11px] text-[#999999] leading-relaxed">
              An encrypted calendar invite and discreet arrival protocol have been transmitted to <strong>{confirmedBooking.customerEmail}</strong>.
            </p>

            <button
              onClick={onClose}
              className="px-8 py-3 rounded-full bg-[#C6A66B] text-[#0B0B0D] font-medium text-xs tracking-[0.2em] uppercase cursor-pointer hover:bg-[#DFCA9A] transition-colors"
            >
              Done & Return to Site
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
