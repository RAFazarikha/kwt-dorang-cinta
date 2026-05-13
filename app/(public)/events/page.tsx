import EventSection from "@/components/event-section";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";


export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <EventSection />
      <Footer />
    </main>
  )
}