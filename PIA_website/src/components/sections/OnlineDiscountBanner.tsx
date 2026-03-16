"use client";

import Image from "next/image";

export default function OnlineDiscountBanner() {
  return (
    <a href="/pia-online-discounts" className="block">
      <div className="relative w-full h-[180px] md:h-[280px] lg:h-[360px] overflow-hidden">
        <Image
          src="https://www.piac.com.pk/images/tabBanners/Online_Discount_1920x360.jpg"
          alt="Exclusive Online Discounts"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
    </a>
  );
}
