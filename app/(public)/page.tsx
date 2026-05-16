import AboutSection from "@/components/about-section";
import EventSection from "@/components/event-section";
import FeatureSection from "@/components/feature-section";
import Footer from "@/components/footer";
import GaleriSection from "@/components/galeri-section";
import HeroSection from "@/components/hero-section";
import Navbar from "@/components/navbar";
import ProductSection from "@/components/product-section";


export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeatureSection />
      <ProductSection isHome />
      <EventSection isHome />
      <GaleriSection isHome />
      <Footer />
    </main>
  )
}