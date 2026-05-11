import Image from "next/image"
import { ArrowUpRight, Leaf } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"

const products = [
  {
    title: "Selada Hidroponik",
    category: "Sayuran Segar",
    image:
      "https://images.unsplash.com/photo-1739802798738-0b2276b4b7df?q=80&w=870",
    description:
      "Selada hijau segar bebas pestisida dengan kualitas premium langsung dari greenhouse.",
  },
  {
    title: "Pakcoy Organik",
    category: "Hydroponic Farm",
    image:
      "https://images.unsplash.com/photo-1597216148867-c934590e6ea3?q=80&w=774",
    description:
      "Pakcoy sehat kaya nutrisi yang dipanen setiap hari untuk menjaga kesegaran.",
  },
  {
    title: "Bayam Brazil",
    category: "Urban Farming",
    image:
      "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?q=80&w=435",
    description:
      "Bayam brazil segar dengan tekstur lembut dan kandungan gizi tinggi.",
  },
  {
    title: "Caisim Hijau",
    category: "Fresh Vegetable",
    image:
      "https://images.unsplash.com/photo-1707225405402-924a5fcafced?q=80&w=870",
    description:
      "Caisim hidroponik berkualitas dengan rasa segar dan bebas bahan kimia.",
  },
  {
    title: "Bibit Tanaman",
    category: "Edukasi Pertanian",
    image:
      "https://images.unsplash.com/photo-1646342425012-f098cd304508?q=80&w=870",
    description:
      "Bibit tanaman unggulan untuk kebutuhan urban farming dan hidroponik rumahan.",
  },
  {
    title: "Budidaya Lele",
    category: "Perikanan",
    image:
      "https://images.unsplash.com/photo-1672476831182-2f8698899b27?q=80&w=870",
    description:
      "Lele budidaya sehat yang dikelola secara modern dan ramah lingkungan.",
  },
]

export default function ProductSection() {
  return (
    <section id="produk" className="bg-muted/30">
      <div className="container-custom">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-sm font-medium text-primary">
            <Leaf className="h-4 w-4" />
            Produk Unggulan
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-primary md:text-5xl">
            Produk Sehat dari
            <span className="block">
              KWT Dorang Cinta
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Menghadirkan hasil urban farming dan hidroponik berkualitas
            tinggi yang segar, sehat, dan ramah lingkungan untuk
            kebutuhan keluarga Anda.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product, index) => (
            <Card
              key={index}
              className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg py-0!"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
                  {product.category}
                </div>
              </div>

              {/* Content */}
              <CardContent className="space-y-5 p-6">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground transition-colors group-hover:text-primary">
                    {product.title}
                  </h3>

                  <p className="mt-3 leading-7 text-muted-foreground">
                    {product.description}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  className="group/button h-auto p-0 text-primary hover:bg-transparent hover:text-secondary"
                >
                  Lihat Detail

                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1 group-hover/button:-translate-y-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 flex justify-center">
          <Button className="h-12 rounded-lg bg-primary px-8 text-white hover:bg-secondary">
            Lihat Semua Produk
          </Button>
        </div>
      </div>
    </section>
  )
}