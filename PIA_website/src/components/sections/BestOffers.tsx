"use client";

import Image from "next/image";

const offers = [
  {
    from: "Islamabad",
    fromCode: "ISB",
    to: "Dubai",
    toCode: "DXB",
    price: "PKR 61,425.00",
    image: "https://www.piac.com.pk/images/offers/DXB_1.png",
  },
  {
    from: "Islamabad",
    fromCode: "ISB",
    to: "Paris",
    toCode: "CDG",
    price: "PKR 167,425.00",
    image: "https://www.piac.com.pk/images/offers/Paris%20-%20Shanzillizay.png",
  },
  {
    from: "Islamabad",
    fromCode: "ISB",
    to: "Toronto",
    toCode: "YYZ",
    price: "PKR 471,880.00",
    image: "https://www.piac.com.pk/images/offers/YTO.png",
  },
  {
    from: "Islamabad",
    fromCode: "ISB",
    to: "Kuala Lumpur",
    toCode: "KUL",
    price: "PKR 102,886.00",
    image: "https://www.piac.com.pk/images/offers/kuala_lumpur.jpeg",
  },
  {
    from: "Lahore",
    fromCode: "LHE",
    to: "Baku",
    toCode: "GYD",
    price: "PKR 110,332.00",
    image: "https://www.piac.com.pk/images/offers/baku_offers.png",
  },
];

export default function BestOffers() {
  return (
    <section className="py-12 md:py-16 bg-pia-gray-light">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-pia-navy mb-2">
            Best Offers
          </h2>
          <div className="w-16 h-1 bg-pia-blue mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              {/* Destination Image */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={offer.image}
                  alt={`${offer.from} to ${offer.to}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                />
                {/* Route overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <div className="flex items-center justify-between text-white">
                    <span className="text-sm font-bold">{offer.fromCode}</span>
                    <div className="flex-1 flex items-center justify-center px-2">
                      <div className="h-[1px] flex-1 bg-white/60"></div>
                      <svg className="w-4 h-4 mx-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                      </svg>
                      <div className="h-[1px] flex-1 bg-white/60"></div>
                    </div>
                    <span className="text-sm font-bold">{offer.toCode}</span>
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="p-4">
                <div className="text-sm text-gray-600 mb-1">
                  {offer.from} to {offer.to}
                </div>
                <div className="text-sm font-medium text-pia-dark mb-3">
                  From <span className="price text-pia-blue font-bold">{offer.price}</span>*
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="#"
                    className="flex-1 text-center text-xs font-semibold bg-pia-blue text-white rounded px-3 py-2 hover:bg-pia-navy transition-colors"
                  >
                    Book Now
                  </a>
                  <a
                    href="/facilities/booking-conditions"
                    className="flex-1 text-center text-xs font-semibold border border-pia-blue text-pia-blue rounded px-3 py-2 hover:bg-pia-blue hover:text-white transition-colors"
                  >
                    More Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
