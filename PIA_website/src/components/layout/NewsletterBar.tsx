"use client";

import Image from "next/image";

export default function NewsletterBar() {
  return (
    <section className="bg-pia-navy py-8">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Newsletter */}
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg mb-3">
              Get the latest sales straight to your inbox.
            </h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="E-mail Address"
                className="flex-1 px-4 py-2.5 rounded-lg text-sm bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pia-blue"
              />
              <select className="px-4 py-2.5 rounded-lg text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pia-blue">
                <option value="">Preferred City of Departure</option>
                <option value="ISB">Islamabad</option>
                <option value="LHE">Lahore</option>
                <option value="KHI">Karachi</option>
                <option value="PEW">Peshawar</option>
                <option value="MUX">Multan</option>
              </select>
              <button className="bg-pia-blue hover:bg-pia-blue-light text-white font-semibold rounded-lg px-6 py-2.5 text-sm transition-colors whitespace-nowrap">
                Sign Up
              </button>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="privacy-agree"
                className="w-3.5 h-3.5 accent-pia-blue rounded"
              />
              <label htmlFor="privacy-agree" className="text-white/50 text-xs">
                By signing up, you agree to PIA&apos;s{" "}
                <a href="#" className="text-white/70 underline hover:text-white transition-colors">
                  Privacy Policy
                </a>.
              </label>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-20 bg-white/20" />

          {/* Mobile App */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-[100px] h-[180px] hidden sm:block">
              <Image
                src="https://www.piac.com.pk/modules/mod_mobile_banner/iphone.png"
                alt="PIA Mobile App"
                fill
                className="object-contain"
                sizes="100px"
              />
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-white font-semibold text-sm text-center sm:text-left">
                Download PIA App
              </span>
              <a href="https://play.google.com/store/apps/details?id=com.piac.thepiaapp.android" className="block">
                <Image
                  src="https://www.piac.com.pk/modules/mod_mobile_banner/googleplay.png"
                  alt="Get it on Google Play"
                  width={140}
                  height={42}
                  className="h-[42px] w-auto"
                />
              </a>
              <a href="https://apps.apple.com/us/app/pia-app/id1143220222" className="block">
                <Image
                  src="https://www.piac.com.pk/modules/mod_mobile_banner/appstore.png"
                  alt="Download on the App Store"
                  width={140}
                  height={42}
                  className="h-[42px] w-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
