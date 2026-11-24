import React from "react";
import Link from "next/link";
import { Shield, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0B0B0D] border-t border-[#171719] pt-16 pb-12 text-[#999999] text-xs">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-[#C6A66B]/50 flex items-center justify-center">
                <span className="font-serif text-[#C6A66B] text-sm font-light">V</span>
              </div>
              <span
                className="text-xl font-serif tracking-[0.25em] text-[#F7F3EC] uppercase"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                VELOURA PRIVATE TOUCH
              </span>
            </div>
            <p className="text-xs text-[#DFCA9A] tracking-widest uppercase font-light">
              An Experience Beyond Ordinary Relaxation.
            </p>
            <p className="text-xs leading-relaxed max-w-md text-[#999999]">
              An exclusive, appointment-based luxury wellness brand operating in select metropolitan jurisdictions throughout the United States. Providing professional, strictly therapeutic massage in tranquil client environments.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-[#DFCA9A]/80">
              <Shield className="w-3.5 h-3.5 text-[#C6A66B]" />
              <span>State Licensed • Non-Sexual Therapeutic Practice • Background Verified</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.25em] uppercase text-[#F7F3EC] mb-4">
              Explore Sanctuary
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="#experiences" className="hover:text-[#C6A66B] transition-colors">
                  Experiences & Rate Card
                </Link>
              </li>
              <li>
                <Link href="#therapists" className="hover:text-[#C6A66B] transition-colors">
                  Therapist Directory
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-[#C6A66B] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#locations" className="hover:text-[#C6A66B] transition-colors">
                  Jurisdictions & Locations
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#C6A66B] transition-colors">
                  Client Portal
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#C6A66B] transition-colors">
                  Administrator Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Statutory & Legal */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.25em] uppercase text-[#F7F3EC] mb-4">
              Governance & Safety
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="#standards" className="hover:text-[#C6A66B] transition-colors">
                  Professional Standards & Ethics
                </Link>
              </li>
              <li>
                <Link href="#standards" className="hover:text-[#C6A66B] transition-colors">
                  Client & Therapist Safety Charter
                </Link>
              </li>
              <li>
                <Link href="#standards" className="hover:text-[#C6A66B] transition-colors">
                  Consent & Zero Tolerance Policy
                </Link>
              </li>
              <li>
                <Link href="#standards" className="hover:text-[#C6A66B] transition-colors">
                  Cancellation & Refund Protocols
                </Link>
              </li>
              <li>
                <span className="text-[#DFCA9A] block pt-2">Discreet Concierge:</span>
                <span className="text-[#F7F3EC]">concierge@velouraprivatetouch.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-4 rounded-xl bg-[#171719]/60 border border-[#26262B] mb-8 text-[11px] leading-relaxed text-[#888888]">
          <strong className="text-[#DFCA9A] uppercase tracking-wider block mb-1">
            Mandatory Statutory Disclosure
          </strong>
          VELOURA PRIVATE TOUCH strictly complies with state and municipal massage therapy regulatory frameworks. All therapists are independent, state-certified licensed massage therapists (LMT/CMT). Services are purely therapeutic and relaxation-oriented. Any solicitation or conduct of a sexual nature is unequivocally prohibited and results in immediate session termination, reporting, and permanent platform exclusion.
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-[#171719] text-[11px]">
          <p>© 2026 VELOURA PRIVATE TOUCH. All rights reserved.</p>
          <p className="mt-2 md:mt-0 text-[#C6A66B]/70 tracking-widest uppercase">
            Curated Luxury & Absolute Discretion
          </p>
        </div>
      </div>
    </footer>
  );
}
