"use client";

import { useState } from "react";
import { Search, Menu, X, ChevronDown, User } from "lucide-react";
import Image from "next/image";

const navLinks = [
  {
    label: "Where we Fly",
    href: "#",
    hasDropdown: true,
    items: [
      { label: "Destinations", href: "/where-we-fly/destinations" },
      { label: "Our Network", href: "/where-we-fly/our-network" },
      { label: "Map", href: "/where-we-fly/map" },
    ],
  },
  {
    label: "Experience",
    href: "#",
    hasDropdown: true,
    items: [
      { label: "Baggage Guide", href: "/experience/baggage/baggage-guide" },
      { label: "Advance Purchase Excess Baggage", href: "/experience/baggage/advance-purchase-excess-baggage" },
      { label: "Executive Economy", href: "/experience/cabins/executive-economy" },
      { label: "Economy", href: "/experience/cabins/economy" },
      { label: "Extra Legroom", href: "/experience/seat/extra-legroom" },
      { label: "Preferred Seat", href: "/experience/seat/preferred-seat" },
      { label: "In-Flight Seat Upgrade", href: "/experience/in-flight-seat-upgrade" },
      { label: "Magazines", href: "/experience/magazines-humsafar-air-safety" },
      { label: "Sohni Dharti Remittance Program", href: "/experience/sdrp" },
      { label: "Travel Advisories", href: "/announcement/travel-advisories-oia" },
    ],
  },
  {
    label: "Loyalty Programs",
    href: "#",
    hasDropdown: true,
    items: [
      { label: "Corporate Club", href: "/loyalty-programs/corporate-club" },
      { label: "Family Program", href: "/loyalty-programs/family-program" },
      { label: "Children Program", href: "/loyalty-programs/children-program" },
      { label: "A+ Individual", href: "/loyalty-programs/a-individual" },
      { label: "A+ Benefits", href: "/loyalty-programs/loyalty-benefits" },
      { label: "Awards & Rewards", href: "/loyalty-programs/awards-rewards" },
      { label: "Terms and Conditions", href: "/loyalty-programs/terms-and-conditions" },
      { label: "Contact Award +Plus & FAQs", href: "/loyalty-programs/contact-award-plus-faqs" },
    ],
  },
  {
    label: "Deals",
    href: "/deals/online-discounts",
    hasDropdown: false,
    items: [],
  },
  {
    label: "Corporate Website",
    href: "https://www.piac.com.pk/corporate/",
    hasDropdown: false,
    items: [],
  },
];

const tickerItems = [
  { text: "Direct Flights from Lahore to London Starting 30 March 2026 ✈️", href: "/announcement/lhe-to-lhr" },
  { text: "Attention Passengers - Flight Update", href: "/announcement/attention-passengers-flight-update" },
  { text: "PIA flights will operate from Terminal 5 at King Khalid Airport Riyadh", href: "/announcement/ruh-operation" },
  { text: "✈ PIA Resumes Flights to Manchester, Starting from October 25, 2025", href: "/announcement/uk-flights" },
  { text: "Travel Advisories & Other Important Announcements", href: "/announcement/travel-advisories-oia" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <>
      {/* Announcement Ticker */}
      <div className="bg-pia-navy text-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto flex items-center h-[32px]">
          <div className="bg-pia-blue px-3 py-1 text-xs font-semibold flex-shrink-0 uppercase tracking-wide">
            News
          </div>
          <div className="overflow-hidden flex-1 relative">
            <div className="ticker-animate flex items-center whitespace-nowrap">
              {[...tickerItems, ...tickerItems].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="inline-block text-xs px-6 hover:text-pia-gold transition-colors"
                >
                  {item.text}
                  <span className="mx-4 text-white/30">|</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-center justify-between h-[70px]">
            {/* PIA Logo */}
            <a href="/" className="flex items-center flex-shrink-0">
              <Image
                src="https://www.piac.com.pk/images/assets/pia-logo.svg"
                alt="PIA | Great People to Fly With"
                width={180}
                height={55}
                className="h-[50px] w-auto"
                priority
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-0">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.hasDropdown ? setOpenDropdown(link.label) : undefined}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <a
                    href={link.href}
                    className={`flex items-center gap-1 px-4 py-6 text-sm font-medium transition-colors ${
                      openDropdown === link.label
                        ? "text-pia-blue bg-pia-gray-light"
                        : "text-pia-dark hover:text-pia-blue"
                    }`}
                  >
                    {link.label}
                    {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5" />}
                  </a>

                  {/* Dropdown */}
                  {link.hasDropdown && openDropdown === link.label && (
                    <div className="absolute top-full left-0 bg-white shadow-lg rounded-b-lg border border-gray-100 min-w-[260px] py-2 z-50">
                      {link.items.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-pia-dark hover:bg-pia-gray-light hover:text-pia-blue transition-colors"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Search className="w-5 h-5 text-pia-dark" />
              </button>
              <a
                href="#"
                className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold bg-pia-blue text-white rounded px-3 py-2 hover:bg-pia-navy transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                Award +Plus Login
              </a>

              {/* Mobile menu button */}
              <button
                className="lg:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-pia-dark" />
                ) : (
                  <Menu className="w-6 h-6 text-pia-dark" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block px-3 py-2 text-sm font-medium text-pia-dark hover:bg-pia-gray-light rounded"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 pb-1">
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-xs font-bold bg-pia-blue text-white rounded px-3 py-2"
                >
                  <User className="w-3.5 h-3.5" />
                  Award +Plus Login
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
