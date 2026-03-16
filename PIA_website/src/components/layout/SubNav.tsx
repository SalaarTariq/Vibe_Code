"use client";

import { useState } from "react";
import Image from "next/image";

const tabBanners = [
  {
    label: "Charter Flight",
    image: "https://www.piac.com.pk/images/tabBanners/chartered-flight.jpg",
    href: "https://charter.piac.com.pk",
  },
  {
    label: "Online Discount",
    image: "https://www.piac.com.pk/images/tabBanners/Online_Discount_1920x360.jpg",
    href: "/pia-online-discounts",
  },
  {
    label: "Web & Mobile Check-In",
    image: "https://www.piac.com.pk/images/tabBanners/new_checkin_1920x360.jpg",
    href: "/facilities/web-mobile-check-in",
  },
  {
    label: "Call n Fly",
    image: "https://www.piac.com.pk/images/tabBanners/call%20and%20fly%202.jpg",
    href: "#",
  },
  {
    label: "Nusuk",
    image: "https://www.piac.com.pk/images/tabBanners/Nusuk_Banner_II.jpg",
    href: "https://www.nusuk.sa/",
  },
];

export default function SubNav() {
  const [activeTab, setActiveTab] = useState<number | null>(null);

  return (
    <div>
      {/* Tab buttons */}
      <div className="bg-pia-navy">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-center overflow-x-auto">
            {tabBanners.map((tab, index) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(activeTab === index ? null : index)}
                className={`flex items-center gap-2 px-5 py-3 text-xs font-medium transition-colors whitespace-nowrap border-b-2 ${
                  activeTab === index
                    ? "text-white bg-pia-blue border-white"
                    : "text-white/80 border-transparent hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab banner image */}
      {activeTab !== null && (
        <a href={tabBanners[activeTab].href} className="block">
          <div className="relative w-full h-[180px] md:h-[280px] lg:h-[360px]">
            <Image
              src={tabBanners[activeTab].image}
              alt={tabBanners[activeTab].label}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </a>
      )}
    </div>
  );
}
