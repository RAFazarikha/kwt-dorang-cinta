import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ProductSection from "@/components/product-section";


export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ProductSection />
      <Footer />
    </main>
  )
}