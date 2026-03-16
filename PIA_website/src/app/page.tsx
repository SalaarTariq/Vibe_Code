import Navbar from "@/components/layout/Navbar";
import SubNav from "@/components/layout/SubNav";
import HeroCarousel from "@/components/hero/HeroCarousel";
import BookingWidget from "@/components/hero/BookingWidget";
import OurServices from "@/components/sections/OurServices";
import BestOffers from "@/components/sections/BestOffers";
import CorporateProgram from "@/components/sections/CorporateProgram";
import OurNews from "@/components/sections/OurNews";
import NewsletterBar from "@/components/layout/NewsletterBar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-pia-bg">
      <Navbar />
      <SubNav />
      <main>
        <HeroCarousel />
        <BookingWidget />
        <OurServices />
        <BestOffers />
        <CorporateProgram />
        <OurNews />
      </main>
      <NewsletterBar />
      <Footer />
    </div>
  );
}
