export interface Service {
  id: string;
  name: string;
  tagline: string;
  duration: number; // minutes
  price: number; // USD
  description: string;
  included: string[];
  image: string;
}

export interface Therapist {
  id: string;
  name: string;
  title: string;
  gender: 'female' | 'male' | 'non-binary';
  image: string;
  bio: string;
  experienceYears: number;
  licenseNumber: string;
  verified: boolean;
  specialisations: string[];
  languages: string[];
  serviceAreas: string[]; // e.g. ["Manhattan", "Brooklyn", "Beverly Hills"]
  rating: number;
  reviewCount: number;
  availability: string[]; // e.g. ["Mon", "Tue", "Thu", "Fri", "Sat"]
}

export interface Booking {
  id: string;
  reference: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCity: string;
  customerState: string;
  customerZip: string;
  serviceId: string;
  serviceName: string;
  therapistId: string;
  therapistName: string;
  therapistGenderPref: string;
  appointmentDate: string;
  appointmentTime: string;
  serviceLocation: string;
  accessibilityNotes?: string;
  status: 'PENDING_PAYMENT' | 'PAYMENT_VERIFIED' | 'CONFIRMED' | 'ASSIGNED' | 'COMPLETED' | 'CANCELLED' | 'REFUNDED';
  totalPrice: number;
  consentSigned: boolean;
  paymentId?: string;
}

export interface LocationConfig {
  id: string;
  state: string;
  city: string;
  active: boolean;
  therapistCount: number;
  notes: string;
}

export const INITIAL_SERVICES: Service[] = [
  {
    id: "signature-experience",
    name: "THE SIGNATURE EXPERIENCE",
    tagline: "Total Mind & Body Harmony",
    duration: 75,
    price: 200,
    description: "A professional full-body relaxation massage designed to create a calm, restorative and deeply comfortable experience. Fluid, tailored strokes dissolve physical stress.",
    included: [
      "75-minute customized relaxation massage",
      "Organic botanical warming massage oils",
      "Tailored pressure and focal tension release",
      "Aromatherapy inhalation and soundscape harmony",
      "Post-session restorative hydration & warm towel ritual"
    ],
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "deep-restore",
    name: "THE DEEP RESTORE",
    tagline: "Therapeutic Release & Alignment",
    duration: 75,
    price: 200,
    description: "A professional deep-tissue massage focused on chronic muscle tension, structural posture alignment, and deep physical recovery through deliberate neuromuscular techniques.",
    included: [
      "75-minute deep-tissue therapeutic session",
      "Targeted trigger-point and myofascial release",
      "Infused arnica and therapeutic herbal balms",
      "Active mobility and joint decompression",
      "Post-treatment posture and recovery consultation"
    ],
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "personal-escape",
    name: "THE PERSONAL ESCAPE",
    tagline: "Bespoke Comfort & Complete Privacy",
    duration: 75,
    price: 200,
    description: "A personalized professional massage experience entirely customized to the customer's sensory, ambient, and comfort preferences in absolute discretion.",
    included: [
      "75-minute bespoke multi-modality massage",
      "Pre-session personalized consultation & sensory profile",
      "Selection of artisanal organic body elixirs",
      "Dedicated focus areas tailored to your exact comfort",
      "Private ambient light & sound atmosphere customization"
    ],
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80"
  }
];

export const INITIAL_THERAPISTS: Therapist[] = [
  {
    id: "th-1",
    name: "Sienna Vance, LMT",
    title: "Master Neuromuscular & Swedish Therapist",
    gender: "female",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    bio: "With over 9 years of luxury wellness experience across New York and Zurich, Sienna specializes in calming the nervous system while providing targeted musculoskeletal release with utmost discretion.",
    experienceYears: 9,
    licenseNumber: "NY-LMT-048922",
    verified: true,
    specialisations: ["Relaxation Massage", "Deep Tissue", "Myofascial Release", "Aromatherapy"],
    languages: ["English", "French"],
    serviceAreas: ["New York, NY", "Manhattan", "Brooklyn"],
    rating: 4.98,
    reviewCount: 142,
    availability: ["Monday", "Wednesday", "Friday", "Saturday"]
  },
  {
    id: "th-2",
    name: "Julian Mercer, CMT",
    title: "Senior Sports & Deep Tissue Specialist",
    gender: "male",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    bio: "Julian brings 8 years of rigorous clinical bodywork and luxury spa background. His approach emphasizes posture restoration, chronic tension relief, and disciplined professional boundaries.",
    experienceYears: 8,
    licenseNumber: "CA-CMT-882194",
    verified: true,
    specialisations: ["Deep Tissue", "Sports Recovery", "Trigger Point", "Swedish"],
    languages: ["English", "Spanish"],
    serviceAreas: ["Los Angeles, CA", "Beverly Hills", "Santa Monica"],
    rating: 4.96,
    reviewCount: 98,
    availability: ["Tuesday", "Thursday", "Friday", "Sunday"]
  },
  {
    id: "th-3",
    name: "Elena Rostova, LMT",
    title: "Holistic Wellness & Craniosacral Practitioner",
    gender: "female",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
    bio: "Former luxury resort practitioner in Sedona and Miami, Elena combines flowing Swedish strokes with breathwork and sensory balance to relieve deep executive fatigue.",
    experienceYears: 11,
    licenseNumber: "FL-LMT-901423",
    verified: true,
    specialisations: ["Signature Relaxation", "Craniosacral Touch", "Lymphatic Balance"],
    languages: ["English", "Italian"],
    serviceAreas: ["Miami, FL", "South Beach", "Brickell"],
    rating: 5.0,
    reviewCount: 187,
    availability: ["Wednesday", "Thursday", "Saturday", "Sunday"]
  },
  {
    id: "th-4",
    name: "Marcus Thorne, LMT",
    title: "Therapeutic Bodywork & Recovery Specialist",
    gender: "male",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    bio: "Marcus provides structured, deliberate bodywork crafted around individual anatomy. Certified with the highest state honors, he guarantees a respectful, calm, and tailored session.",
    experienceYears: 7,
    licenseNumber: "IL-LMT-338901",
    verified: true,
    specialisations: ["Deep Restore", "Structural Release", "Relaxation"],
    languages: ["English"],
    serviceAreas: ["Chicago, IL", "Gold Coast", "Loop"],
    rating: 4.95,
    reviewCount: 76,
    availability: ["Monday", "Tuesday", "Thursday", "Saturday"]
  }
];

export const INITIAL_LOCATIONS: LocationConfig[] = [
  { id: "loc-1", state: "New York", city: "New York City (Manhattan & Brooklyn)", active: true, therapistCount: 4, notes: "Fully licensed by NY State Dept of Education Professional Licensing" },
  { id: "loc-2", state: "California", city: "Los Angeles & Beverly Hills", active: true, therapistCount: 3, notes: "Compliant with CAMTC California Massage Therapy Council standards" },
  { id: "loc-3", state: "Florida", city: "Miami & South Beach", active: true, therapistCount: 2, notes: "Compliant with Florida Board of Massage Therapy" },
  { id: "loc-4", state: "Illinois", city: "Chicago (Downtown & North Shore)", active: true, therapistCount: 2, notes: "Compliant with Illinois Department of Financial and Professional Regulation" },
  { id: "loc-5", state: "Texas", city: "Austin & Dallas", active: false, therapistCount: 0, notes: "Licensing accreditation in progress for Q3 rollout" }
];
