"use client";

import Image from "next/image";

export default function CorporateProgram() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background with dark overlay */}
      <div className="absolute inset-0 bg-pia-navy" />
      <div className="absolute inset-0 opacity-20">
        <Image
          src="https://www.piac.com.pk/images/banners/piasub.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-pia-navy/90 via-pia-navy/80 to-pia-navy/90" />

      <div className="max-w-[1400px] mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            A+ Executive Corporate Program
          </h2>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8">
            Our business services offer flexibility and exclusive savings for your company. We provide tailored solutions based on your travel spend to maximize your corporate travel budget. You can collectively earn rewards from all employee travel and redeem them for dynamic flights.
          </p>
          <a
            href="/loyalty-programs/corporate-club"
            className="inline-flex items-center gap-2 bg-pia-blue hover:bg-pia-blue-light text-white font-semibold rounded-lg px-8 py-3 text-sm transition-colors"
          >
            Become a Member
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
