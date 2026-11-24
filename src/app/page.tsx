"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Veloura3DHero from "@/components/Veloura3DHero";
import CinematicIntro from "@/components/CinematicIntro";
import BookingModal from "@/components/BookingModal";
import AuthModal from "@/components/AuthModal";
import {
  INITIAL_SERVICES,
  INITIAL_THERAPISTS,
  INITIAL_LOCATIONS,
  Service,
  Therapist,
  Booking,
  LocationConfig,
} from "@/lib/data";
import {
  ShieldCheck,
  Star,
  Clock,
  Sparkles,
  ArrowRight,
  Filter,
  Check,
  Award,
  Lock,
  ChevronRight,
  MapPin,
  Calendar,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [therapists, setTherapists] = useState<Therapist[]>(INITIAL_THERAPISTS);
  const [locations, setLocations] = useState<LocationConfig[]>(INITIAL_LOCATIONS);

  const [selectedServiceId, setSelectedServiceId] = useState<string>(INITIAL_SERVICES[0].id);
  const [selectedTherapistId, setSelectedTherapistId] = useState<string>("any");

  // Therapist filter state
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [specialisationFilter, setSpecialisationFilter] = useState<string>("all");

  useEffect(() => {
    // Check if intro has been watched this session
    const hasSeenIntro = sessionStorage.getItem("veloura_intro_seen");
    if (hasSeenIntro) {
      setShowIntro(false);
    }
    const loggedUser = localStorage.getItem("veloura_user_email");
    if (loggedUser) {
      setUserEmail(loggedUser);
    }
    // Load custom services/therapists if modified in admin
    const storedServices = localStorage.getItem("veloura_services");
    if (storedServices) {
      try {
        setServices(JSON.parse(storedServices));
      } catch (e) {}
    }
    const storedTherapists = localStorage.getItem("veloura_therapists");
    if (storedTherapists) {
      try {
        setTherapists(JSON.parse(storedTherapists));
      } catch (e) {}
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem("veloura_intro_seen", "true");
    setShowIntro(false);
  };

  const handleOpenBooking = (serviceId?: string, therapistId?: string) => {
    if (serviceId) setSelectedServiceId(serviceId);
    if (therapistId) setSelectedTherapistId(therapistId);
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = (newBooking: Booking) => {
    // Already saved in localStorage by the modal
  };

  const handleLogout = () => {
    localStorage.removeItem("veloura_user_email");
    setUserEmail(null);
  };

  // Filter therapists
  const filteredTherapists = therapists.filter((t) => {
    if (genderFilter !== "all" && t.gender !== genderFilter) return false;
    if (locationFilter !== "all" && !t.serviceAreas.some((a) => a.toLowerCase().includes(locationFilter.toLowerCase())))
      return false;
    if (specialisationFilter !== "all" && !t.specialisations.includes(specialisationFilter)) return false;
    return true;
  });

  return (
    <div className="relative min-h-screen bg-[#0B0B0D] text-[#F7F3EC] selection:bg-[#C6A66B] selection:text-[#0B0B0D]">
      {/* 1. CINEMATIC INTRODUCTION OVERLAY */}
      {showIntro && <CinematicIntro onComplete={handleIntroComplete} />}

      {/* Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenAuth={(tab) => {
          setAuthTab(tab);
          setIsAuthOpen(true);
        }}
        userEmail={userEmail}
        onLogout={handleLogout}
      />

      {/* 2. HERO SECTION WITH 3D CANVAS */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* 3D Visual focal background */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-85">
          <Veloura3DHero className="w-full h-full max-w-5xl max-h-[85vh]" />
        </div>

        {/* Ambient overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0D]/50 via-transparent to-[#0B0B0D] pointer-events-none z-10" />

        {/* Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C6A66B]/30 bg-[#171719]/60 backdrop-blur-md mb-8">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A66B]" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#DFCA9A]">
              Exclusive Private Wellness Sanctuary
            </span>
          </div>

          <h1
            className="text-4xl sm:text-6xl md:text-8xl font-serif tracking-[0.18em] text-[#F7F3EC] uppercase leading-tight font-light drop-shadow-2xl"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            YOUR MOMENT.
            <br />
            YOUR SPACE.
            <br />
            <span className="gold-text-gradient font-normal">YOUR EXPERIENCE.</span>
          </h1>

          <p className="mt-8 text-sm md:text-base text-[#DFCA9A]/90 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
            Discover a more personal approach to professional massage and wellness. Thoughtfully matched experiences, exceptional therapists, and privacy at every step.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#experiences"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-[#C6A66B]/50 hover:border-[#C6A66B] text-xs tracking-[0.2em] uppercase text-[#F7F3EC] hover:bg-[#C6A66B]/10 transition-all duration-300"
            >
              Explore Experiences
            </a>
            <button
              onClick={() => handleOpenBooking()}
              className="w-full sm:w-auto px-9 py-3.5 rounded-full bg-gradient-to-r from-[#C6A66B] via-[#DFCA9A] to-[#C6A66B] text-[#0B0B0D] font-semibold text-xs tracking-[0.2em] uppercase shadow-[0_0_25px_rgba(198,166,107,0.35)] hover:shadow-[0_0_35px_rgba(198,166,107,0.6)] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
            >
              Book Your Experience ($200)
            </button>
          </div>

          <div className="mt-16 flex items-center justify-center gap-8 text-[11px] uppercase tracking-widest text-[#999999]">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C6A66B]" /> 100% Licensed Therapists
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#C6A66B]" /> Absolute Discretion
            </span>
          </div>
        </div>
      </section>

      {/* 3. THE BRAND STORY */}
      <section className="py-24 bg-[#0B0B0D] border-t border-[#171719] relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#C6A66B] block mb-3 font-medium">
                The Veloura Philosophy
              </span>
              <h2
                className="text-3xl md:text-5xl font-serif tracking-wide text-[#F7F3EC] mb-6 font-light"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                NOT EVERY MOMENT NEEDS TO BE ORDINARY.
              </h2>
              <div className="space-y-4 text-sm text-[#999999] leading-relaxed">
                <p>
                  At Veloura, we believe relaxation should be personal. From discovering your preferred experience to being matched with an accredited professional therapist, every detail is curated around comfort, privacy, and exceptional attention.
                </p>
                <p>
                  We step away from clinical assembly lines and crowded communal spas. Instead, Veloura brings an elevated, tranquil atmosphere directly to your luxury hotel suite or private residence.
                </p>
                <p className="text-[#DFCA9A] italic font-serif text-base pt-2">
                  "True luxury is not merely aesthetic—it is feeling completely safe, deeply restored, and understood."
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-6 pt-6 border-t border-[#171719]">
                <div>
                  <h4 className="text-2xl font-serif text-[#DFCA9A]">75 min</h4>
                  <p className="text-xs text-[#999999] uppercase tracking-wider mt-1">
                    Signature Sessions
                  </p>
                </div>
                <div>
                  <h4 className="text-2xl font-serif text-[#DFCA9A]">$200</h4>
                  <p className="text-xs text-[#999999] uppercase tracking-wider mt-1">
                    Transparent All-Inclusive
                  </p>
                </div>
              </div>
            </div>

            {/* Editorial imagery treatment */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-[#C6A66B]/30 shadow-2xl relative group">
                <img
                  src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=80"
                  alt="Veloura Sanctuary Ambience"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl bg-[#0B0B0D]/80 backdrop-blur-md border border-[#C6A66B]/20">
                  <p className="text-xs font-serif text-[#DFCA9A] tracking-wider uppercase mb-1">
                    Uncompromising Standards
                  </p>
                  <p className="text-[11px] text-[#999999]">
                    Strict therapeutic compliance, state license verification, and complete digital privacy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES AND RATE CARD */}
      <section id="experiences" className="py-24 bg-[#0B0B0D] border-t border-[#171719]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-[#C6A66B] font-medium">
              Curated Offerings
            </span>
            <h2
              className="text-3xl md:text-5xl font-serif tracking-wider text-[#F7F3EC] mt-2 mb-4 font-light"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Services & Rate Card
            </h2>
            <p className="text-xs text-[#999999] tracking-widest uppercase">
              Transparent, professional pricing with zero hidden surcharges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group relative rounded-2xl bg-[#171719]/40 border border-[#26262B] hover:border-[#C6A66B]/60 p-8 flex flex-col justify-between transition-all duration-500 hover:shadow-[0_0_35px_rgba(198,166,107,0.15)]"
              >
                <div>
                  <div className="aspect-[16/10] rounded-xl overflow-hidden mb-6 relative">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#0B0B0D]/80 backdrop-blur-md border border-[#C6A66B]/40 text-[11px] text-[#DFCA9A] font-medium">
                      {service.duration} mins
                    </div>
                  </div>

                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#C6A66B] mb-1">
                    {service.tagline}
                  </p>
                  <h3
                    className="text-xl font-serif tracking-wider text-[#F7F3EC] mb-3"
                    style={{ fontFamily: "var(--font-cormorant), serif" }}
                  >
                    {service.name}
                  </h3>
                  <p className="text-xs text-[#999999] leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-8 pt-4 border-t border-[#26262B]">
                    <p className="text-[10px] uppercase tracking-widest text-[#DFCA9A]">
                      What's Included:
                    </p>
                    {service.included.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#999999]">
                        <Check className="w-3.5 h-3.5 text-[#C6A66B] mt-0.5 shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#26262B] flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#999999]">All-Inclusive Rate</span>
                    <p className="text-2xl font-serif text-[#DFCA9A]">${service.price}</p>
                  </div>
                  <button
                    onClick={() => handleOpenBooking(service.id)}
                    className="px-6 py-2.5 rounded-full bg-[#C6A66B]/15 border border-[#C6A66B]/50 hover:bg-[#C6A66B] hover:text-[#0B0B0D] text-xs tracking-widest uppercase text-[#DFCA9A] transition-all duration-300 cursor-pointer"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-[#0B0B0D] border-t border-[#171719] relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-[#C6A66B] font-medium">
              Seamless Journey
            </span>
            <h2
              className="text-3xl md:text-5xl font-serif tracking-wider text-[#F7F3EC] mt-2 mb-4 font-light"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              How It Works
            </h2>
            <p className="text-xs text-[#999999] tracking-widest uppercase">
              Four deliberate steps from discovery to restorative calm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-[#171719]/30 border border-[#26262B] relative">
              <span className="text-4xl font-serif text-[#C6A66B]/30 block mb-4">01</span>
              <h3 className="text-base font-serif tracking-wider text-[#F7F3EC] mb-2 uppercase">
                Discover
              </h3>
              <p className="text-xs text-[#999999] leading-relaxed">
                Explore our professional massage experiences and select the treatment suited to your physical needs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#171719]/30 border border-[#26262B] relative">
              <span className="text-4xl font-serif text-[#C6A66B]/30 block mb-4">02</span>
              <h3 className="text-base font-serif tracking-wider text-[#F7F3EC] mb-2 uppercase">
                Personalise
              </h3>
              <p className="text-xs text-[#999999] leading-relaxed">
                Choose your preferred therapist, date, time slot, and specify custom comfort requirements.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#171719]/30 border border-[#26262B] relative">
              <span className="text-4xl font-serif text-[#C6A66B]/30 block mb-4">03</span>
              <h3 className="text-base font-serif tracking-wider text-[#F7F3EC] mb-2 uppercase">
                Reserve
              </h3>
              <p className="text-xs text-[#999999] leading-relaxed">
                Complete the standard booking payment through our secure encrypted payment processor.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#171719]/30 border border-[#26262B] relative">
              <span className="text-4xl font-serif text-[#C6A66B]/30 block mb-4">04</span>
              <h3 className="text-base font-serif tracking-wider text-[#F7F3EC] mb-2 uppercase">
                Confirm
              </h3>
              <p className="text-xs text-[#999999] leading-relaxed">
                Receive your verified appointment reference, calendar passport, and approved arrival protocol.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. THERAPIST DIRECTORY WITH FILTERS */}
      <section id="therapists" className="py-24 bg-[#0B0B0D] border-t border-[#171719]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-[#C6A66B] font-medium">
                Accredited Artisans
              </span>
              <h2
                className="text-3xl md:text-5xl font-serif tracking-wider text-[#F7F3EC] mt-2 font-light"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Therapist Directory
              </h2>
              <p className="text-xs text-[#999999] tracking-widest uppercase mt-2">
                Every practitioner is state-licensed, insured, and verified.
              </p>
            </div>

            {/* Filter controls */}
            <div className="mt-6 md:mt-0 flex flex-wrap gap-3">
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="bg-[#171719] border border-[#26262B] rounded-lg px-3 py-2 text-xs text-[#DFCA9A] focus:outline-none"
              >
                <option value="all">All Genders</option>
                <option value="female">Female Practitioners</option>
                <option value="male">Male Practitioners</option>
              </select>

              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="bg-[#171719] border border-[#26262B] rounded-lg px-3 py-2 text-xs text-[#DFCA9A] focus:outline-none"
              >
                <option value="all">All Service Cities</option>
                <option value="New York">New York</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="Miami">Miami</option>
                <option value="Chicago">Chicago</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTherapists.map((therapist) => (
              <div
                key={therapist.id}
                className="group rounded-2xl bg-[#171719]/40 border border-[#26262B] hover:border-[#C6A66B]/50 p-6 flex flex-col justify-between transition-all duration-400 hover:shadow-[0_0_25px_rgba(198,166,107,0.12)]"
              >
                <div>
                  <div className="aspect-[3/4] rounded-xl overflow-hidden mb-5 relative">
                    <img
                      src={therapist.image}
                      alt={therapist.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0B0B0D]/80 backdrop-blur-md border border-[#C6A66B]/30 text-[10px] text-[#DFCA9A]">
                      <ShieldCheck className="w-3 h-3 text-[#C6A66B]" />
                      <span>{therapist.licenseNumber}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-1">
                    <h3
                      className="text-lg font-serif text-[#F7F3EC] tracking-wide"
                      style={{ fontFamily: "var(--font-cormorant), serif" }}
                    >
                      {therapist.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-[#DFCA9A]">
                      <Star className="w-3.5 h-3.5 fill-[#DFCA9A]" />
                      <span>{therapist.rating}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#C6A66B] mb-2">{therapist.title}</p>
                  <p className="text-xs text-[#999999] line-clamp-3 leading-relaxed mb-4">
                    {therapist.bio}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {therapist.specialisations.slice(0, 3).map((spec, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#26262B]/60 text-[#DFCA9A]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="text-[11px] text-[#999999] space-y-1 pt-3 border-t border-[#26262B]">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-[#C6A66B]" />
                      <span>{therapist.serviceAreas.join(", ")}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-[#C6A66B]" />
                      <span>{therapist.availability.join(", ")}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenBooking(undefined, therapist.id)}
                  className="mt-6 w-full py-2.5 rounded-full border border-[#C6A66B]/30 hover:border-[#C6A66B] hover:bg-[#C6A66B]/10 text-xs tracking-widest uppercase text-[#DFCA9A] transition-all cursor-pointer"
                >
                  Reserve with {therapist.name.split(" ")[0]}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PROFESSIONAL STANDARDS & PRIVACY */}
      <section id="standards" className="py-24 bg-[#0B0B0D] border-t border-[#171719]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-[#C6A66B] font-medium">
              Sanctuary Ethics
            </span>
            <h2
              className="text-3xl md:text-5xl font-serif tracking-wider text-[#F7F3EC] mt-2 mb-4 font-light"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Professional Standards & Privacy
            </h2>
            <p className="text-xs text-[#999999] tracking-widest uppercase">
              Dignity, legal compliance, and absolute mutual respect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#171719]/30 border border-[#26262B] space-y-4">
              <div className="w-10 h-10 rounded-full border border-[#C6A66B]/40 flex items-center justify-center text-[#DFCA9A]">
                <ShieldCheck className="w-5 h-5 text-[#C6A66B]" />
              </div>
              <h3 className="text-base font-serif text-[#F7F3EC] uppercase tracking-wider">
                Strict Non-Sexual Protocol
              </h3>
              <p className="text-xs text-[#999999] leading-relaxed">
                Services provided by Veloura therapists are strictly therapeutic and relaxation-oriented. Inappropriate conduct, sexual remarks, or breach of professional boundaries trigger immediate termination with zero refund and legal referral.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#171719]/30 border border-[#26262B] space-y-4">
              <div className="w-10 h-10 rounded-full border border-[#C6A66B]/40 flex items-center justify-center text-[#DFCA9A]">
                <Lock className="w-5 h-5 text-[#C6A66B]" />
              </div>
              <h3 className="text-base font-serif text-[#F7F3EC] uppercase tracking-wider">
                Discreet Confidentiality
              </h3>
              <p className="text-xs text-[#999999] leading-relaxed">
                We handle every appointment with diplomatic discretion. Private addresses, hotel suite access, and client identification details are encrypted and never disclosed to unauthorized third parties.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#171719]/30 border border-[#26262B] space-y-4">
              <div className="w-10 h-10 rounded-full border border-[#C6A66B]/40 flex items-center justify-center text-[#DFCA9A]">
                <Award className="w-5 h-5 text-[#C6A66B]" />
              </div>
              <h3 className="text-base font-serif text-[#F7F3EC] uppercase tracking-wider">
                Verified Licensure & Safety
              </h3>
              <p className="text-xs text-[#999999] leading-relaxed">
                Each practitioner maintains active, verified state massage therapy licenses (CAMTC, NYSED, FL-Board, IL-DFPR) and comprehensive liability insurance, ensuring rigorous clinical safety standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. LOCATIONS & JURISDICTIONS */}
      <section id="locations" className="py-24 bg-[#0B0B0D] border-t border-[#171719]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-[#C6A66B] font-medium">
              Territorial Scope
            </span>
            <h2
              className="text-3xl md:text-5xl font-serif tracking-wider text-[#F7F3EC] mt-2 mb-4 font-light"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Authorised Locations
            </h2>
            <p className="text-xs text-[#999999] tracking-widest uppercase">
              Operated only in approved jurisdictions where full statutory licensure is established.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((loc) => (
              <div
                key={loc.id}
                className={`p-6 rounded-2xl border ${
                  loc.active
                    ? "bg-[#171719]/40 border-[#C6A66B]/30"
                    : "bg-[#171719]/10 border-[#26262B] opacity-60"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-base font-serif text-[#F7F3EC]">{loc.city}</h4>
                  <span
                    className={`text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
                      loc.active
                        ? "bg-[#C6A66B]/20 text-[#DFCA9A] border border-[#C6A66B]/30"
                        : "bg-[#26262B] text-[#999999]"
                    }`}
                  >
                    {loc.active ? "Active Sanctuary" : "Rolling Out"}
                  </span>
                </div>
                <p className="text-xs text-[#999999] mb-3">{loc.notes}</p>
                {loc.active && (
                  <p className="text-[11px] text-[#DFCA9A]">
                    {loc.therapistCount} Accredited Senior Practitioners Available
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        services={services}
        therapists={therapists}
        selectedServiceId={selectedServiceId}
        selectedTherapistId={selectedTherapistId}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        initialTab={authTab}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(email) => setUserEmail(email)}
      />
    </div>
  );
}
