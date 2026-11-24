import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VELOURA PRIVATE TOUCH | Luxury Massage & Wellness",
  description: "An Experience Beyond Ordinary Relaxation. Professional, discreet, appointment-based luxury wellness destination.",
  keywords: ["Luxury massage", "Private wellness", "Licensed massage therapy", "Wellness sanctuary", "Veloura Private Touch"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${cormorant.variable} ${manrope.variable} antialiased bg-[#0B0B0D] text-[#F7F3EC]`}
      >
        {children}
      </body>
    </html>
  );
}
