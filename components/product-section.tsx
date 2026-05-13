import Image from "next/image"
import Link from "next/link"

import {
  ArrowUpRight,
  Leaf,
} from "lucide-react"

import { createClient } from "@/lib/supabase/server"

import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
} from "@/components/ui/card"

interface ProductSectionProps {
  isHome?: boolean
}

export default async function ProductSection({
  isHome = false,
}: ProductSectionProps) {

  const supabase =
    await createClient()

  // =========================
  // FETCH PRODUCTS
  // =========================

  let query = supabase
    .from("products")
    .select("*")
    .order("created_at", {
      ascending: false,
    })

  // Jika halaman home
  // tampilkan hanya 6 produk
  if (isHome) {
    query = query.limit(6)
  }

  const {
    data: products,
  } = await query

  return (
    <section
      id="produk"
      className="bg-muted/30 custom"
    >
      <div className="container-custom">

        {/* HEADER */}
        <div className="mx-auto mb-16 max-w-3xl text-center">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">

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

            Menghadirkan hasil urban farming dan hidroponik berkualitas tinggi yang segar, sehat, dan ramah lingkungan untuk kebutuhan keluarga Anda.
          </p>
        </div>

        {/* EMPTY STATE */}
        {!products ||
          products.length === 0 ? (
          <div className="py-20 text-center">

            <h3 className="text-2xl font-semibold text-primary">
              Produk Belum Tersedia
            </h3>

            <p className="mt-3 text-muted-foreground">
              Saat ini belum ada produk yang ditampilkan.
            </p>
          </div>
        ) : (

          <>
            {/* PRODUCT GRID */}
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

              {products.map(
                (product) => (
                  <Card
                    key={product.id}
                    className="group overflow-hidden rounded-xl border border-border bg-card py-0! shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
                  >

                    {/* IMAGE */}
                    <div className="relative h-64 overflow-hidden">

                      <Image
                        src={
                          product.image_url ||
                          "/placeholder.jpg"
                        }
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
                        Produk KWT
                      </div>
                    </div>

                    {/* CONTENT */}
                    <CardContent className="space-y-5 p-6">

                      <div>

                        <h3 className="text-2xl font-semibold text-foreground transition-colors group-hover:text-primary">

                          {product.name}
                        </h3>

                        <p className="mt-3 line-clamp-3 leading-7 text-muted-foreground">

                          {product.description ||
                            "Produk segar dan sehat hasil budidaya KWT Dorang Cinta."}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">

                        <div>

                          <p className="text-sm text-muted-foreground">
                            Harga
                          </p>

                          <h4 className="text-xl font-bold text-primary">

                            Rp{" "}
                            {Number(
                              product.price
                            ).toLocaleString(
                              "id-ID"
                            )}
                          </h4>
                        </div>

                        <Button
                          variant="ghost"
                          className="group/button h-auto p-0 text-primary hover:bg-transparent hover:text-secondary"
                        >

                          Detail

                          <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/button:-translate-y-1 group-hover/button:translate-x-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              )}
            </div>

            {/* CTA */}
            {isHome && (
              <div className="mt-16 flex justify-center">
                <Link href="/products">
                  <Button className="h-12 rounded-lg bg-primary px-8 text-white hover:bg-secondary">
                    Lihat Semua Produk
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}