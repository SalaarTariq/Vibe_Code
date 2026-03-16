"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const newsItems = [
  {
    image: "https://www.piac.com.pk/images/news/ISB_MAN_thumbnail.png",
    title: "PIA Reconnects Islamabad & Manchester!",
    description: "After a five-year hiatus, PIA proudly resumes service with 2 weekly flights connecting Islamabad to Manchester.",
    hasVideo: true,
  },
  {
    image: "https://www.piac.com.pk/images/news/KDU_PIA.png",
    title: "Unveiling Skardu with PIA",
    description: "Explore the stunning mountain scenery and rich cultural heritage of northern Pakistan with PIA.",
    hasVideo: true,
  },
  {
    image: "https://www.piac.com.pk/images/news/DiningVDO.png",
    title: "Dining with Luxury",
    description: "Experience our onboard culinary journey blending global flavors with Pakistani hospitality.",
    hasVideo: true,
  },
  {
    image: "https://www.piac.com.pk/images/news/baku_snap.png",
    title: "Baku awaits you",
    description: "Discover the Europe of Asia where history, culture and affordability come together.",
    hasVideo: true,
  },
];

export default function OurNews() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  const next = () => {
    setStartIndex((prev) =>
      prev + 1 > newsItems.length - visibleCount ? 0 : prev + 1
    );
  };

  const prev = () => {
    setStartIndex((prev) =>
      prev - 1 < 0 ? newsItems.length - visibleCount : prev - 1
    );
  };

  const visibleItems = newsItems.slice(startIndex, startIndex + visibleCount);
  // Handle wrap-around
  if (visibleItems.length < visibleCount) {
    visibleItems.push(...newsItems.slice(0, visibleCount - visibleItems.length));
  }

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-pia-navy mb-2">
            Our News
          </h2>
          <div className="w-16 h-1 bg-pia-blue mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors hidden md:block"
          >
            <ChevronLeft className="w-5 h-5 text-pia-dark" />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors hidden md:block"
          >
            <ChevronRight className="w-5 h-5 text-pia-dark" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleItems.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="group rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer bg-white border border-gray-100"
              >
                {/* Thumbnail */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Play button overlay */}
                  {item.hasVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                      <div className="w-14 h-14 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-semibold text-pia-navy mb-2 group-hover:text-pia-blue transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-3">
                    {item.description}
                  </p>
                  <a
                    href="https://www.youtube.com/@pakistaninternationalairline"
                    className="inline-flex items-center gap-1 text-sm font-medium text-pia-blue hover:underline"
                  >
                    Learn More
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile navigation */}
          <div className="flex justify-center gap-3 mt-6 md:hidden">
            <button onClick={prev} className="bg-white shadow rounded-full p-2">
              <ChevronLeft className="w-5 h-5 text-pia-dark" />
            </button>
            <button onClick={next} className="bg-white shadow rounded-full p-2">
              <ChevronRight className="w-5 h-5 text-pia-dark" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
