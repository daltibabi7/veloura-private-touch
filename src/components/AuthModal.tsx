"use client";

import React, { useState } from "react";
import { X, Lock, Mail, User, ShieldCheck } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  initialTab?: "login" | "signup";
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
}

export default function AuthModal({
  isOpen,
  initialTab = "login",
  onClose,
  onLoginSuccess,
}: AuthModalProps) {
  const [tab, setTab] = useState<"login" | "signup">(initialTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    localStorage.setItem("veloura_user_email", email);
    onLoginSuccess(email);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-[#0B0B0D] border border-[#C6A66B]/30 rounded-2xl p-6 md:p-8 shadow-[0_0_40px_rgba(198,166,107,0.15)] text-[#F7F3EC]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#999999] hover:text-[#DFCA9A] p-1"
          aria-label="Close authentication modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-full border border-[#C6A66B]/40 flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="w-5 h-5 text-[#C6A66B]" />
          </div>
          <h3
            className="text-2xl font-serif tracking-wider"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            {tab === "login" ? "Client Sanctuary Login" : "Create Private Account"}
          </h3>
          <p className="text-xs text-[#999999] mt-1">Discreet & Encrypted Client Access</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#171719] mb-5 text-xs uppercase tracking-widest">
          <button
            type="button"
            onClick={() => setTab("login")}
            className={`flex-1 pb-2.5 font-medium transition-colors ${
              tab === "login"
                ? "border-b-2 border-[#C6A66B] text-[#DFCA9A]"
                : "text-[#999999] hover:text-[#F7F3EC]"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setTab("signup")}
            className={`flex-1 pb-2.5 font-medium transition-colors ${
              tab === "signup"
                ? "border-b-2 border-[#C6A66B] text-[#DFCA9A]"
                : "text-[#999999] hover:text-[#F7F3EC]"
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === "signup" && (
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#DFCA9A] mb-1">
                Full Legal Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#999999] absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Eleanor Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#171719] border border-[#26262B] focus:border-[#C6A66B] rounded-lg pl-9 pr-3 py-2 text-xs text-[#F7F3EC] focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#DFCA9A] mb-1">
              Confidential Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#999999] absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="client@sanctuary.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#171719] border border-[#26262B] focus:border-[#C6A66B] rounded-lg pl-9 pr-3 py-2 text-xs text-[#F7F3EC] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#DFCA9A] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#999999] absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#171719] border border-[#26262B] focus:border-[#C6A66B] rounded-lg pl-9 pr-3 py-2 text-xs text-[#F7F3EC] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#C6A66B] to-[#DFCA9A] text-[#0B0B0D] font-semibold text-xs tracking-[0.2em] uppercase mt-2 hover:shadow-[0_0_20px_rgba(198,166,107,0.3)] transition-all cursor-pointer"
          >
            {tab === "login" ? "Access Client Portal" : "Join Veloura Circle"}
          </button>
        </form>
      </div>
    </div>
  );
}
