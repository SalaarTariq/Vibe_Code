"use client";

import Image from "next/image";

const services = [
  {
    image: "https://www.piac.com.pk/images/services/services1.png",
    title: "Pre-book Meal",
    description:
      "Indulge in anticipation with our Pre-booked Meals — a culinary journey designed to elevate your dining experience",
  },
  {
    image: "https://www.piac.com.pk/images/services/servies2.png",
    title: "Seat Selection",
    description:
      "Tailor your travel experience with our Seat Selection feature, where comfort meets choice.",
  },
  {
    image: "https://www.piac.com.pk/images/services/services3.png",
    title: "Pre-book Baggage",
    description:
      "Simplify your travel with ease and foresight by opting for our Pre-book Baggage service.",
  },
  {
    image: "https://www.piac.com.pk/images/services/services4.png",
    title: "Special Assistance",
    description:
      "Elevate your journey with our Special Assistance services, including personalized wheelchair support.",
    href: "/help-contact/special-assistance",
  },
];

export default function OurServices() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-pia-navy mb-2">
            Our Services
          </h2>
          <div className="w-16 h-1 bg-pia-blue mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-white border border-gray-100"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-pia-navy mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
