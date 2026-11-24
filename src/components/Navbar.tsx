"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Menu, X, Calendar, User, Compass } from "lucide-react";

interface NavbarProps {
  onOpenBooking?: () => void;
  onOpenAuth?: (tab: "login" | "signup") => void;
  userEmail?: string | null;
  onLogout?: () => void;
}

export default function Navbar({ onOpenBooking, onOpenAuth, userEmail, onLogout }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0B0B0D]/80 backdrop-blur-md border-b border-[#171719] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full border border-[#C6A66B]/50 flex items-center justify-center transition-all duration-300 group-hover:border-[#C6A66B] group-hover:shadow-[0_0_15px_rgba(198,166,107,0.3)]">
            <span className="font-serif text-[#C6A66B] text-base font-light tracking-wider">V</span>
          </div>
          <div className="flex flex-col">
            <span
              className="text-lg md:text-xl font-serif tracking-[0.25em] text-[#F7F3EC] uppercase group-hover:text-[#DFCA9A] transition-colors"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              VELOURA
            </span>
            <span className="text-[9px] tracking-[0.35em] text-[#C6A66B] uppercase font-medium">
              PRIVATE TOUCH
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs tracking-[0.2em] uppercase text-[#F7F3EC]/80 font-light">
          <Link href="#experiences" className="hover:text-[#C6A66B] transition-colors">
            Experiences
          </Link>
          <Link href="#therapists" className="hover:text-[#C6A66B] transition-colors">
            Therapists
          </Link>
          <Link href="#how-it-works" className="hover:text-[#C6A66B] transition-colors">
            How It Works
          </Link>
          <Link href="#standards" className="hover:text-[#C6A66B] transition-colors">
            Professional Standards
          </Link>
          <Link href="#locations" className="hover:text-[#C6A66B] transition-colors">
            Locations
          </Link>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {userEmail ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-xs tracking-wider text-[#DFCA9A] hover:text-[#F7F3EC] py-2 px-3 rounded border border-[#C6A66B]/20"
              >
                <User className="w-3.5 h-3.5" />
                <span>My Account</span>
              </Link>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="text-xs text-[#999999] hover:text-[#F7F3EC] cursor-pointer"
                >
                  Sign Out
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth?.("login")}
              className="text-xs tracking-[0.18em] uppercase text-[#999999] hover:text-[#F7F3EC] transition-colors px-3 py-2 cursor-pointer"
            >
              Client Login
            </button>
          )}

          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C6A66B] via-[#DFCA9A] to-[#C6A66B] text-[#0B0B0D] font-medium text-xs tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(198,166,107,0.2)] hover:shadow-[0_0_25px_rgba(198,166,107,0.45)] hover:scale-[1.02] transition-all duration-300 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Reserve Experience</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-[#DFCA9A] p-2 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0B0D] border-b border-[#171719] px-6 py-6 space-y-4 text-xs tracking-[0.2em] uppercase animate-fadeIn">
          <Link
            href="#experiences"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#F7F3EC] hover:text-[#C6A66B]"
          >
            Experiences
          </Link>
          <Link
            href="#therapists"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#F7F3EC] hover:text-[#C6A66B]"
          >
            Therapists
          </Link>
          <Link
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#F7F3EC] hover:text-[#C6A66B]"
          >
            How It Works
          </Link>
          <Link
            href="#standards"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#F7F3EC] hover:text-[#C6A66B]"
          >
            Professional Standards
          </Link>
          <Link
            href="#locations"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#F7F3EC] hover:text-[#C6A66B]"
          >
            Locations
          </Link>

          <div className="pt-4 border-t border-[#171719] space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking?.();
              }}
              className="w-full py-3 rounded-full bg-[#C6A66B] text-[#0B0B0D] font-medium tracking-[0.2em] uppercase text-center block"
            >
              Reserve Experience ($200)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth?.("login");
              }}
              className="w-full py-2.5 rounded-full border border-[#C6A66B]/30 text-[#DFCA9A] tracking-[0.18em] uppercase text-center block"
            >
              Client Login / Register
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
