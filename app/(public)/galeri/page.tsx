import Footer from "@/components/footer";
import GaleriSection from "@/components/galeri-section";
import Navbar from "@/components/navbar";


export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <GaleriSection />
      <Footer />
    </main>
  )
}