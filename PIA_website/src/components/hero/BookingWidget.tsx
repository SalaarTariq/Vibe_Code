"use client";

import { useState } from "react";
import {
  Plane,
  CheckSquare,
  FileText,
  Clock,
  Calendar,
  ArrowRightLeft,
  Users,
  Search,
} from "lucide-react";
/* eslint-disable @next/next/no-img-element */

const tabs = [
  { id: "flight", label: "Book", icon: Plane },
  { id: "checkin", label: "Web Check-In", icon: CheckSquare },
  { id: "booking", label: "My Booking", icon: FileText },
  { id: "status", label: "Flight Status", icon: Clock },
  { id: "schedules", label: "Schedules", icon: Calendar },
];

export default function BookingWidget() {
  const [activeTab, setActiveTab] = useState("flight");
  const [tripType, setTripType] = useState("roundTrip");
  const [flexibleDates, setFlexibleDates] = useState(false);
  const [umrahBooking, setUmrahBooking] = useState(false);
  const [showPassengers, setShowPassengers] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const totalPassengers = adults + children + infants;

  return (
    <div className="relative z-30 -mt-16 md:-mt-24 lg:-mt-32">
      <div className="max-w-[1100px] mx-auto px-4">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b bg-pia-navy">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 md:px-6 py-3.5 text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "text-white bg-pia-blue border-b-2 border-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Flight Search Form */}
          {activeTab === "flight" && (
            <div className="p-4 md:p-6">
              {/* Trip Type Radio */}
              <div className="flex flex-wrap items-center gap-6 mb-5">
                {[
                  { value: "oneWay", label: "One Way" },
                  { value: "roundTrip", label: "Round Trip" },
                  { value: "multiCity", label: "Multi City" },
                ].map((type) => (
                  <label
                    key={type.value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="tripType"
                      value={type.value}
                      checked={tripType === type.value}
                      onChange={(e) => setTripType(e.target.value)}
                      className="w-4 h-4 text-pia-blue accent-pia-blue"
                    />
                    <span className="text-sm text-pia-dark">{type.label}</span>
                  </label>
                ))}
              </div>

              {/* Search Fields */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                {/* From */}
                <div className="md:col-span-3">
                  <label className="text-xs text-gray-500 mb-1 block font-medium">
                    Departure
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pia-blue focus:border-transparent bg-white">
                    <option value="">Select City</option>
                    <option value="ISB">Islamabad (ISB)</option>
                    <option value="LHE">Lahore (LHE)</option>
                    <option value="KHI">Karachi (KHI)</option>
                    <option value="PEW">Peshawar (PEW)</option>
                    <option value="MUX">Multan (MUX)</option>
                    <option value="SKT">Sialkot (SKT)</option>
                    <option value="UET">Quetta (UET)</option>
                  </select>
                </div>

                {/* Swap button */}
                <div className="md:col-span-1 flex justify-center">
                  <button className="bg-pia-blue text-white rounded-full p-2 hover:bg-pia-navy transition-colors hover:rotate-180 duration-300">
                    <ArrowRightLeft className="w-4 h-4" />
                  </button>
                </div>

                {/* To */}
                <div className="md:col-span-3">
                  <label className="text-xs text-gray-500 mb-1 block font-medium">
                    Arrival
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pia-blue focus:border-transparent bg-white">
                    <option value="">Select City</option>
                    <option value="DXB">Dubai (DXB)</option>
                    <option value="JED">Jeddah (JED)</option>
                    <option value="LHR">London (LHR)</option>
                    <option value="CDG">Paris (CDG)</option>
                    <option value="YYZ">Toronto (YYZ)</option>
                    <option value="KUL">Kuala Lumpur (KUL)</option>
                    <option value="GYD">Baku (GYD)</option>
                    <option value="MAN">Manchester (MAN)</option>
                  </select>
                </div>

                {/* Departure Date */}
                <div className="md:col-span-2">
                  <label className="text-xs text-gray-500 mb-1 block font-medium">
                    Departure Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pia-blue focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Return Date */}
                {tripType === "roundTrip" && (
                  <div className="md:col-span-2">
                    <label className="text-xs text-gray-500 mb-1 block font-medium">
                      Return Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="date"
                        className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pia-blue focus:border-transparent"
                      />
                    </div>
                  </div>
                )}

                {/* Passengers */}
                <div className={tripType === "roundTrip" ? "md:col-span-1" : "md:col-span-3"}>
                  <label className="text-xs text-gray-500 mb-1 block font-medium">
                    Passengers
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => setShowPassengers(!showPassengers)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pia-blue text-left bg-white flex items-center gap-2"
                    >
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{totalPassengers}</span>
                    </button>

                    {/* Passengers dropdown */}
                    {showPassengers && (
                      <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[250px] z-50">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium">Adults</div>
                              <div className="text-xs text-gray-400">12+ years</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => setAdults(Math.max(1, adults - 1))}
                                className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-100"
                              >
                                -
                              </button>
                              <span className="text-sm w-4 text-center">{adults}</span>
                              <button
                                onClick={() => setAdults(Math.min(9, adults + 1))}
                                className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium">Children</div>
                              <div className="text-xs text-gray-400">2-11 years</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => setChildren(Math.max(0, children - 1))}
                                className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-100"
                              >
                                -
                              </button>
                              <span className="text-sm w-4 text-center">{children}</span>
                              <button
                                onClick={() => setChildren(Math.min(9, children + 1))}
                                className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium">Infants</div>
                              <div className="text-xs text-gray-400">0-23 months</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => setInfants(Math.max(0, infants - 1))}
                                className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-100"
                              >
                                -
                              </button>
                              <span className="text-sm w-4 text-center">{infants}</span>
                              <button
                                onClick={() => setInfants(Math.min(9, infants + 1))}
                                className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => setShowPassengers(false)}
                          className="mt-3 w-full text-center text-sm text-pia-blue font-medium hover:underline"
                        >
                          Done
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Cabin Class & Currency row */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end mt-3">
                <div className="md:col-span-3">
                  <label className="text-xs text-gray-500 mb-1 block font-medium">
                    Cabin Class
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pia-blue focus:border-transparent bg-white">
                    <option value="economy">Economy</option>
                    <option value="executive_economy">Executive Economy</option>
                    <option value="business">Business</option>
                  </select>
                </div>
                <div className="md:col-span-3">
                  <label className="text-xs text-gray-500 mb-1 block font-medium">
                    Currency
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pia-blue focus:border-transparent bg-white">
                    <option value="PKR">PKR - Pakistani Rupee</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="AED">AED - UAE Dirham</option>
                    <option value="SAR">SAR - Saudi Riyal</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                  </select>
                </div>
              </div>

              {/* Bottom row */}
              <div className="flex flex-wrap items-center justify-between mt-4 gap-3">
                <div className="flex flex-wrap items-center gap-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={flexibleDates}
                      onChange={(e) => setFlexibleDates(e.target.checked)}
                      className="w-4 h-4 accent-pia-blue"
                    />
                    <span className="text-sm text-pia-dark">
                      My Dates are Flexible
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={umrahBooking}
                      onChange={(e) => setUmrahBooking(e.target.checked)}
                      className="w-4 h-4 accent-pia-blue"
                    />
                    <span className="text-sm text-pia-dark">Umrah Booking</span>
                  </label>
                </div>

                <button className="bg-pia-blue hover:bg-pia-navy text-white font-semibold rounded-lg px-8 py-3 text-sm flex items-center gap-2 transition-colors">
                  <Search className="w-4 h-4" />
                  Search Flights
                </button>
              </div>
            </div>
          )}

          {/* Web Check-In Tab */}
          {activeTab === "checkin" && (
            <div className="p-4 md:p-6">
              <p className="text-sm text-gray-600 mb-4">
                For a seamless travel experience, you can now use our mobile application for automated exchange/refund.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block font-medium">
                    Booking Reference / PNR
                  </label>
                  <input
                    type="text"
                    placeholder="Enter PNR"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pia-blue"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block font-medium">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pia-blue"
                  />
                </div>
                <button className="bg-pia-blue hover:bg-pia-navy text-white font-semibold rounded-lg px-6 py-2.5 text-sm transition-colors">
                  Check In
                </button>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <a href="https://play.google.com/store/apps/details?id=com.piac.thepiaapp.android" className="block">
                  <img
                    src="https://www.piac.com.pk/modules/mod_mobile_banner/googleplay.png"
                    alt="Get it on Google Play"
                    className="h-[40px] w-auto"
                  />
                </a>
                <a href="https://apps.apple.com/us/app/pia-app/id1143220222" className="block">
                  <img
                    src="https://www.piac.com.pk/modules/mod_mobile_banner/appstore.png"
                    alt="Download on the App Store"
                    className="h-[40px] w-auto"
                  />
                </a>
              </div>
            </div>
          )}

          {/* My Booking Tab */}
          {activeTab === "booking" && (
            <div className="p-4 md:p-6">
              <p className="text-sm text-gray-600 mb-4">
                For a seamless travel experience, you can now use our mobile application for automated exchange/refund.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block font-medium">
                    Booking Reference / PNR
                  </label>
                  <input
                    type="text"
                    placeholder="Enter PNR"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pia-blue"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block font-medium">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pia-blue"
                  />
                </div>
                <button className="bg-pia-blue hover:bg-pia-navy text-white font-semibold rounded-lg px-6 py-2.5 text-sm transition-colors">
                  Retrieve Booking
                </button>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <a href="https://play.google.com/store/apps/details?id=com.piac.thepiaapp.android" className="block">
                  <img
                    src="https://www.piac.com.pk/modules/mod_mobile_banner/googleplay.png"
                    alt="Get it on Google Play"
                    className="h-[40px] w-auto"
                  />
                </a>
                <a href="https://apps.apple.com/us/app/pia-app/id1143220222" className="block">
                  <img
                    src="https://www.piac.com.pk/modules/mod_mobile_banner/appstore.png"
                    alt="Download on the App Store"
                    className="h-[40px] w-auto"
                  />
                </a>
              </div>
            </div>
          )}

          {/* Flight Status Tab */}
          {activeTab === "status" && (
            <div className="p-4 md:p-6">
              {/* Search type toggle */}
              <div className="flex items-center gap-6 mb-4">
                {[
                  { value: "route", label: "Search by Route" },
                  { value: "flight", label: "Search by Flight Number" },
                ].map((type) => (
                  <label
                    key={type.value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="statusSearchType"
                      value={type.value}
                      defaultChecked={type.value === "route"}
                      className="w-4 h-4 text-pia-blue accent-pia-blue"
                    />
                    <span className="text-sm text-pia-dark">{type.label}</span>
                  </label>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block font-medium">From</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pia-blue bg-white">
                    <option value="">Select City</option>
                    <option value="ISB">Islamabad (ISB)</option>
                    <option value="LHE">Lahore (LHE)</option>
                    <option value="KHI">Karachi (KHI)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block font-medium">To</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pia-blue bg-white">
                    <option value="">Select City</option>
                    <option value="DXB">Dubai (DXB)</option>
                    <option value="LHR">London (LHR)</option>
                    <option value="JED">Jeddah (JED)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block font-medium">
                    Departure Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pia-blue"
                  />
                </div>
                <button className="bg-pia-blue hover:bg-pia-navy text-white font-semibold rounded-lg px-6 py-2.5 text-sm transition-colors">
                  Check Status
                </button>
              </div>
            </div>
          )}

          {/* Schedules Tab */}
          {activeTab === "schedules" && (
            <div className="p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block font-medium">From</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pia-blue bg-white">
                    <option value="">Select City</option>
                    <option value="ISB">Islamabad (ISB)</option>
                    <option value="LHE">Lahore (LHE)</option>
                    <option value="KHI">Karachi (KHI)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block font-medium">To</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pia-blue bg-white">
                    <option value="">Select City</option>
                    <option value="DXB">Dubai (DXB)</option>
                    <option value="LHR">London (LHR)</option>
                    <option value="JED">Jeddah (JED)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block font-medium">Date</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pia-blue"
                  />
                </div>
                <button className="bg-pia-blue hover:bg-pia-navy text-white font-semibold rounded-lg px-6 py-2.5 text-sm transition-colors">
                  View Schedules
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
