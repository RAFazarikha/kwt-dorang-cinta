import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section id="beranda" className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=2070')",
        }}
      />

      <div className="container-custom relative grid items-center lg:grid-cols-2">
        <div className="space-y-8">
          <div className="inline-flex rounded-full bg-secondary/20 px-4 py-2 text-sm text-primary">
            Pertanian Perkotaan Modern
          </div>

          <div className="space-y-6">
            <h1 className="max-w-2xl text-5xl font-bold leading-tight tracking-tight text-foreground">
              KWT Dorang Cinta – Urban Farming untuk Hidup Lebih Sehat
            </h1>

            <p className="max-w-xl text-lg leading-8 text-muted-foreground">
              Menghadirkan sayuran hidroponik segar, bebas pestisida,
              dan penuh nutrisi langsung dari greenhouse komunitas kami
              ke meja makan Anda.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button className="h-12 rounded-lg bg-primary px-6 text-white hover:bg-secondary">
              Belanja Produk
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              className="h-12 rounded-lg border-border bg-white px-6"
            >
              Lihat Kegiatan
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}