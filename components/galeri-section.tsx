import Image from "next/image"
import Link from "next/link"

import { Camera, ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

interface GaleriSectionProps {
  isHome?: boolean
}

const galleryItems = [
  {
    id: 1,
    title: "Panen Sayur Hidroponik Bersama",
    src: "/bg-hero.jpg",
    // Gambar utama, mengambil 2 kolom dan 2 baris (Besar di kiri)
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    title: "Perawatan Bibit Unggul",
    src: "/bg-hero.jpg",
    // Mengambil 1 kolom dan 1 baris (Kanan atas)
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    title: "Edukasi Urban Farming",
    src: "/bg-hero.jpg",
    // Mengambil 1 kolom dan 1 baris (Kanan tengah)
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 4,
    title: "Kunjungan Rutin Anggota",
    src: "/bg-hero.jpg",
    // Mengambil 1 kolom dan 1 baris (Kiri bawah)
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 5,
    title: "Bazar Hasil Tani Warga",
    src: "/bg-hero.jpg",
    // Mengambil 2 kolom dan 1 baris (Melebar di kanan bawah)
    className: "md:col-span-2 md:row-span-1",
  },
]

export default async function GaleriSection({
  isHome = false,
}: GaleriSectionProps) {

  // Jika ini di halaman home, batasi jumlah item sesuai desain bento grid awal (misal 5 gambar)
  const displayItems = isHome ? galleryItems.slice(0, 5) : galleryItems

  return (
    <section id="galeri" className="bg-background py-20">
      <div className="container-custom">
        {/* HEADER */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Camera className="h-4 w-4" />
            Galeri Kegiatan
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-primary md:text-5xl">
            Jejak Langkah &
            <span className="block">Aktivitas KWT Dorang Cinta</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Momen kebersamaan, semangat bertani, dan dedikasi kami dalam
            membangun lingkungan yang lebih hijau dan sehat.
          </p>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[280px]">
          {displayItems.map((item) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-muted/30 shadow-sm transition-all duration-300 hover:shadow-md ${item.className}`}
            >
              {/* IMAGE */}
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* OVERLAY & CONTENT */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

              <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-end p-6 md:p-8 translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                <h3 className="text-lg font-semibold text-white md:text-xl drop-shadow-md">
                  {item.title}
                </h3>
                <div className="h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:h-auto group-hover:mt-2 group-hover:opacity-100">
                  <p className="text-sm text-gray-200">
                    KWT Dorang Cinta
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        {isHome && (
          <div className="mt-16 flex justify-center">
            <Link
              href="/galeri"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "h-12 rounded-xl bg-primary px-8 text-white hover:bg-secondary",
              })}
            >
              Lihat Semua Galeri
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}