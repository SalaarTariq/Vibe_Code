"use client";

import Image from "next/image";

export default function MobileApp() {
  return (
    <section className="py-12 md:py-16 bg-pia-gray-light">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {/* Phone mockup */}
          <div className="relative w-[180px] h-[340px] flex-shrink-0">
            <Image
              src="https://www.piac.com.pk/modules/mod_mobile_banner/iphone.png"
              alt="PIA Mobile App"
              fill
              className="object-contain"
              sizes="180px"
            />
          </div>

          {/* Text content */}
          <div className="text-center md:text-left max-w-md">
            <h2 className="text-2xl md:text-3xl font-bold text-pia-navy mb-4">
              Check out our mobile app
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Download the PIA app for a seamless travel experience. Book flights, check-in online, manage your bookings, and get real-time flight status updates right from your phone.
            </p>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <a
                href="https://apps.apple.com/us/app/pia-app/id1143220222"
                className="block"
              >
                <Image
                  src="https://www.piac.com.pk/modules/mod_mobile_banner/appstore.png"
                  alt="Download on the App Store"
                  width={150}
                  height={45}
                  className="h-[45px] w-auto"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.piac.thepiaapp.android"
                className="block"
              >
                <Image
                  src="https://www.piac.com.pk/modules/mod_mobile_banner/googleplay.png"
                  alt="Get it on Google Play"
                  width={150}
                  height={45}
                  className="h-[45px] w-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
