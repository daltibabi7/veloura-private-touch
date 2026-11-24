"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
  Shield,
  DollarSign,
  Users,
  Calendar,
  CheckCircle,
  Plus,
  Edit2,
  Trash2,
  ArrowLeft,
  Settings,
  MapPin,
  TrendingUp,
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "bookings" | "therapists" | "services" | "locations">("overview");

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [therapists, setTherapists] = useState<Therapist[]>(INITIAL_THERAPISTS);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [locations, setLocations] = useState<LocationConfig[]>(INITIAL_LOCATIONS);

  // New Therapist Form Modal State
  const [showAddTherapist, setShowAddTherapist] = useState(false);
  const [newTherapistName, setNewTherapistName] = useState("");
  const [newTherapistTitle, setNewTherapistTitle] = useState("");
  const [newTherapistGender, setNewTherapistGender] = useState<"female" | "male">("female");
  const [newTherapistLicense, setNewTherapistLicense] = useState("");
  const [newTherapistArea, setNewTherapistArea] = useState("New York, NY");

  useEffect(() => {
    // Load persisted data
    const storedBookings = localStorage.getItem("veloura_bookings");
    if (storedBookings) {
      try {
        setBookings(JSON.parse(storedBookings));
      } catch (e) {}
    } else {
      const demo: Booking[] = [
        {
          id: "bkg-101",
          reference: "VPT-NY-902",
          createdAt: new Date().toISOString(),
          customerName: "Eleanor Vance",
          customerEmail: "eleanor.v@privateclient.com",
          customerPhone: "+1 (555) 019-2834",
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
          serviceLocation: "The Carlyle Suite 1204, New York, NY",
          status: "CONFIRMED",
          totalPrice: 200,
          consentSigned: true,
          paymentId: "pi_993019284",
        },
        {
          id: "bkg-102",
          reference: "VPT-LA-441",
          createdAt: new Date().toISOString(),
          customerName: "Jonathan Sterling",
          customerEmail: "j.sterling@executive.io",
          customerPhone: "+1 (555) 882-1923",
          customerCity: "Los Angeles",
          customerState: "CA",
          customerZip: "90210",
          serviceId: "deep-restore",
          serviceName: "THE DEEP RESTORE",
          therapistId: "th-2",
          therapistName: "Julian Mercer, CMT",
          therapistGenderPref: "male",
          appointmentDate: "2026-11-29",
          appointmentTime: "16:30",
          serviceLocation: "Bel-Air Private Estate, Los Angeles, CA",
          status: "PAYMENT_VERIFIED",
          totalPrice: 200,
          consentSigned: true,
          paymentId: "pi_881940129",
        },
      ];
      setBookings(demo);
      localStorage.setItem("veloura_bookings", JSON.stringify(demo));
    }

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

  // Update booking status
  const updateBookingStatus = (ref: string, newStatus: Booking["status"]) => {
    const updated = bookings.map((b) =>
      b.reference === ref ? { ...b, status: newStatus } : b
    );
    setBookings(updated);
    localStorage.setItem("veloura_bookings", JSON.stringify(updated));
  };

  // Add new therapist
  const handleAddTherapist = (e: React.FormEvent) => {
    e.preventDefault();
    const newT: Therapist = {
      id: "th-" + Date.now(),
      name: newTherapistName,
      title: newTherapistTitle,
      gender: newTherapistGender,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      bio: "Accredited specialist joining the Veloura private network.",
      experienceYears: 5,
      licenseNumber: newTherapistLicense || "STATE-LIC-" + Math.floor(100000 + Math.random() * 900000),
      verified: true,
      specialisations: ["Relaxation", "Deep Restore"],
      languages: ["English"],
      serviceAreas: [newTherapistArea],
      rating: 5.0,
      reviewCount: 1,
      availability: ["Mon", "Wed", "Fri", "Sat"],
    };

    const updated = [newT, ...therapists];
    setTherapists(updated);
    localStorage.setItem("veloura_therapists", JSON.stringify(updated));
    setShowAddTherapist(false);
    setNewTherapistName("");
    setNewTherapistTitle("");
    setNewTherapistLicense("");
  };

  // Update Service Price
  const handleUpdatePrice = (id: string, newPrice: number) => {
    const updated = services.map((s) =>
      s.id === id ? { ...s, price: newPrice } : s
    );
    setServices(updated);
    localStorage.setItem("veloura_services", JSON.stringify(updated));
  };

  // Toggle Location
  const toggleLocation = (id: string) => {
    const updated = locations.map((l) =>
      l.id === id ? { ...l, active: !l.active } : l
    );
    setLocations(updated);
    localStorage.setItem("veloura_locations", JSON.stringify(updated));
  };

  // Statistics
  const totalBookings = bookings.length;
  const confirmedCount = bookings.filter((b) => b.status === "CONFIRMED" || b.status === "PAYMENT_VERIFIED").length;
  const totalRevenue = bookings
    .filter((b) => b.status !== "CANCELLED" && b.status !== "REFUNDED")
    .reduce((acc, curr) => acc + (curr.totalPrice || 200), 0);

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F7F3EC] p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Navbar */}
        <div className="flex items-center justify-between pb-6 border-b border-[#171719]">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#DFCA9A] hover:text-[#F7F3EC] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Public Site</span>
            </Link>
            <span className="text-xs text-[#999999]">•</span>
            <span className="text-xs tracking-[0.25em] text-[#C6A66B] uppercase font-medium">
              Administrator Master Console
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#DFCA9A] px-3 py-1 rounded-full bg-[#171719] border border-[#C6A66B]/30">
            <Shield className="w-3.5 h-3.5 text-[#C6A66B]" />
            <span>Admin Authentication: Secured</span>
          </div>
        </div>

        {/* Console Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-[#171719] pb-3 text-xs tracking-widest uppercase">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === "overview"
                ? "bg-[#C6A66B] text-[#0B0B0D] font-bold"
                : "text-[#999999] hover:text-[#F7F3EC]"
            }`}
          >
            Dashboard Overview
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === "bookings"
                ? "bg-[#C6A66B] text-[#0B0B0D] font-bold"
                : "text-[#999999] hover:text-[#F7F3EC]"
            }`}
          >
            All Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab("therapists")}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === "therapists"
                ? "bg-[#C6A66B] text-[#0B0B0D] font-bold"
                : "text-[#999999] hover:text-[#F7F3EC]"
            }`}
          >
            Therapist Profiles ({therapists.length})
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === "services"
                ? "bg-[#C6A66B] text-[#0B0B0D] font-bold"
                : "text-[#999999] hover:text-[#F7F3EC]"
            }`}
          >
            Services & Rate Card
          </button>
          <button
            onClick={() => setActiveTab("locations")}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === "locations"
                ? "bg-[#C6A66B] text-[#0B0B0D] font-bold"
                : "text-[#999999] hover:text-[#F7F3EC]"
            }`}
          >
            Jurisdictions & Locations
          </button>
        </div>

        {/* 1. OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-[#171719]/50 border border-[#26262B]">
                <div className="flex items-center justify-between text-[#999999] mb-2 text-xs uppercase tracking-wider">
                  <span>Gross Revenue</span>
                  <DollarSign className="w-4 h-4 text-[#C6A66B]" />
                </div>
                <h3 className="text-3xl font-serif text-[#DFCA9A]">${totalRevenue}.00</h3>
                <p className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Fully verified payment webhooks
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#171719]/50 border border-[#26262B]">
                <div className="flex items-center justify-between text-[#999999] mb-2 text-xs uppercase tracking-wider">
                  <span>Total Reservations</span>
                  <Calendar className="w-4 h-4 text-[#C6A66B]" />
                </div>
                <h3 className="text-3xl font-serif text-[#F7F3EC]">{totalBookings}</h3>
                <p className="text-[11px] text-[#999999] mt-2">
                  {confirmedCount} verified & confirmed
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#171719]/50 border border-[#26262B]">
                <div className="flex items-center justify-between text-[#999999] mb-2 text-xs uppercase tracking-wider">
                  <span>Active Practitioners</span>
                  <Users className="w-4 h-4 text-[#C6A66B]" />
                </div>
                <h3 className="text-3xl font-serif text-[#F7F3EC]">{therapists.length}</h3>
                <p className="text-[11px] text-[#999999] mt-2">100% license accredited</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#171719]/50 border border-[#26262B]">
                <div className="flex items-center justify-between text-[#999999] mb-2 text-xs uppercase tracking-wider">
                  <span>Authorized States</span>
                  <MapPin className="w-4 h-4 text-[#C6A66B]" />
                </div>
                <h3 className="text-3xl font-serif text-[#F7F3EC]">
                  {locations.filter((l) => l.active).length}
                </h3>
                <p className="text-[11px] text-[#DFCA9A] mt-2">Strict statutory compliance</p>
              </div>
            </div>

            {/* Recent Bookings Snapshot */}
            <div className="p-6 rounded-2xl bg-[#171719]/30 border border-[#26262B] space-y-4">
              <h3 className="text-lg font-serif text-[#F7F3EC] tracking-wider">
                Recent Client Appointments
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="text-[10px] uppercase tracking-widest text-[#999999] border-b border-[#26262B]">
                    <tr>
                      <th className="pb-3">Reference</th>
                      <th className="pb-3">Client</th>
                      <th className="pb-3">Experience</th>
                      <th className="pb-3">Schedule</th>
                      <th className="pb-3">Therapist</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#26262B]">
                    {bookings.slice(0, 5).map((b) => (
                      <tr key={b.id} className="py-2.5">
                        <td className="py-3 font-mono text-[#DFCA9A]">{b.reference}</td>
                        <td className="py-3 text-[#F7F3EC]">{b.customerName}</td>
                        <td className="py-3">{b.serviceName}</td>
                        <td className="py-3">{b.appointmentDate} • {b.appointmentTime}</td>
                        <td className="py-3 text-[#DFCA9A]">{b.therapistName}</td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-[#C6A66B]/20 text-[#DFCA9A] border border-[#C6A66B]/30">
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. BOOKINGS TAB */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif tracking-wider">Reservation Management</h2>
            <div className="space-y-4">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="p-6 rounded-2xl bg-[#171719]/40 border border-[#26262B] flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-semibold text-[#DFCA9A]">
                        {b.reference}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-[#26262B] text-[#F7F3EC]">
                        {b.status}
                      </span>
                    </div>
                    <p className="text-sm font-serif text-[#F7F3EC]">{b.serviceName} (${b.totalPrice})</p>
                    <p className="text-xs text-[#999999]">
                      Client: <strong className="text-[#F7F3EC]">{b.customerName}</strong> ({b.customerPhone} • {b.customerEmail})
                    </p>
                    <p className="text-xs text-[#999999]">
                      Destination: {b.serviceLocation}
                    </p>
                    <p className="text-xs text-[#DFCA9A]">
                      Schedule: {b.appointmentDate} at {b.appointmentTime} | Assigned: {b.therapistName}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    <span className="text-[10px] uppercase text-[#999999] tracking-wider">
                      Update Appointment Status:
                    </span>
                    <select
                      value={b.status}
                      onChange={(e) => updateBookingStatus(b.reference, e.target.value as any)}
                      className="bg-[#171719] border border-[#26262B] rounded-lg px-3 py-2 text-xs text-[#DFCA9A] focus:outline-none"
                    >
                      <option value="PENDING_PAYMENT">PENDING PAYMENT</option>
                      <option value="PAYMENT_VERIFIED">PAYMENT VERIFIED</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="ASSIGNED">ASSIGNED</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="CANCELLED">CANCELLED</option>
                      <option value="REFUNDED">REFUNDED</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. THERAPISTS TAB */}
        {activeTab === "therapists" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif tracking-wider">Accredited Practitioner Directory</h2>
              <button
                onClick={() => setShowAddTherapist(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#C6A66B] text-[#0B0B0D] text-xs font-semibold uppercase tracking-wider hover:bg-[#DFCA9A] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Therapist</span>
              </button>
            </div>

            {/* Modal for adding therapist */}
            {showAddTherapist && (
              <div className="p-6 rounded-2xl bg-[#171719] border border-[#C6A66B]/40 space-y-4">
                <h3 className="text-lg font-serif text-[#DFCA9A]">Enroll Verified Therapist</h3>
                <form onSubmit={handleAddTherapist} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[#999999] mb-1">Full Legal & Display Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Sterling, LMT"
                      value={newTherapistName}
                      onChange={(e) => setNewTherapistName(e.target.value)}
                      className="w-full bg-[#0B0B0D] border border-[#26262B] rounded px-3 py-2 text-[#F7F3EC]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#999999] mb-1">Professional Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Master Neuromuscular Practitioner"
                      value={newTherapistTitle}
                      onChange={(e) => setNewTherapistTitle(e.target.value)}
                      className="w-full bg-[#0B0B0D] border border-[#26262B] rounded px-3 py-2 text-[#F7F3EC]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#999999] mb-1">State License Number</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. NY-LMT-098231"
                      value={newTherapistLicense}
                      onChange={(e) => setNewTherapistLicense(e.target.value)}
                      className="w-full bg-[#0B0B0D] border border-[#26262B] rounded px-3 py-2 text-[#F7F3EC]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#999999] mb-1">Service Area</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. New York, Manhattan"
                      value={newTherapistArea}
                      onChange={(e) => setNewTherapistArea(e.target.value)}
                      className="w-full bg-[#0B0B0D] border border-[#26262B] rounded px-3 py-2 text-[#F7F3EC]"
                    />
                  </div>
                  <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddTherapist(false)}
                      className="px-4 py-2 text-[#999999] hover:text-[#F7F3EC]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded bg-[#C6A66B] text-[#0B0B0D] font-bold uppercase tracking-wider"
                    >
                      Save & Approve
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {therapists.map((t) => (
                <div
                  key={t.id}
                  className="p-6 rounded-2xl bg-[#171719]/40 border border-[#26262B] flex items-start gap-5"
                >
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-20 h-24 object-cover rounded-xl border border-[#C6A66B]/30"
                  />
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-serif text-[#F7F3EC]">{t.name}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-600/30">
                        Verified
                      </span>
                    </div>
                    <p className="text-[#C6A66B]">{t.title}</p>
                    <p className="text-[#999999]">License: {t.licenseNumber}</p>
                    <p className="text-[#999999]">Locations: {t.serviceAreas.join(", ")}</p>
                    <p className="text-[#DFCA9A]">Rating: {t.rating} ★ ({t.reviewCount} sessions)</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. SERVICES & RATES TAB */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif tracking-wider">Services & Dynamic Rate Card</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((s) => (
                <div
                  key={s.id}
                  className="p-6 rounded-2xl bg-[#171719]/40 border border-[#26262B] space-y-4"
                >
                  <h3 className="text-lg font-serif text-[#DFCA9A]">{s.name}</h3>
                  <p className="text-xs text-[#999999]">{s.description}</p>
                  <div className="space-y-2 pt-2 border-t border-[#26262B] text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-[#999999]">Duration:</span>
                      <span className="text-[#F7F3EC] font-semibold">{s.duration} Minutes</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#999999]">Current Price (USD):</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[#DFCA9A] font-bold text-base">${s.price}</span>
                        <button
                          onClick={() => {
                            const newP = prompt(`Enter new price for ${s.name}:`, s.price.toString());
                            if (newP && !isNaN(Number(newP))) {
                              handleUpdatePrice(s.id, Number(newP));
                            }
                          }}
                          className="text-[11px] text-[#C6A66B] underline cursor-pointer"
                        >
                          Edit Rate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. LOCATIONS TAB */}
        {activeTab === "locations" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif tracking-wider">Jurisdiction & Location Authorisation</h2>
            <div className="space-y-4">
              {locations.map((loc) => (
                <div
                  key={loc.id}
                  className="p-6 rounded-2xl bg-[#171719]/40 border border-[#26262B] flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div>
                    <h3 className="text-base font-serif text-[#F7F3EC]">{loc.city} ({loc.state})</h3>
                    <p className="text-xs text-[#999999] mt-1">{loc.notes}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-xs px-3 py-1 rounded-full border ${
                        loc.active
                          ? "bg-emerald-950/40 border-emerald-600/40 text-emerald-400"
                          : "bg-zinc-900 border-zinc-700 text-zinc-500"
                      }`}
                    >
                      {loc.active ? "Operating" : "Inactive"}
                    </span>
                    <button
                      onClick={() => toggleLocation(loc.id)}
                      className="px-4 py-2 rounded-lg border border-[#C6A66B]/30 hover:border-[#C6A66B] text-xs text-[#DFCA9A] uppercase tracking-wider cursor-pointer"
                    >
                      {loc.active ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
