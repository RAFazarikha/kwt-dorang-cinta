import Link from "next/link"
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import { FaInstagram } from "react-icons/fa6"

const navItems = [
  {
    label: "Beranda",
    href: "/#beranda",
  },
  {
    label: "Produk",
    href: "/products",
  },
  {
    label: "Tentang Kami",
    href: "#",
  },
  {
    label: "Galeri",
    href: "#",
  },
  {
    label: "Kontak",
    href: "#kontak",
  },
]

export default function Footer() {
  return (
    <footer id="kontak" className="border-t border-border bg-muted/40">
      <div className="container-custom py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-5 lg:col-span-2">
            <div>
              <h2 className="text-3xl font-bold text-primary">
                KWT Dorang Cinta
              </h2>

              <p className="mt-4 max-w-md leading-7 text-muted-foreground">
                Komunitas urban farming dan hidroponik modern yang
                berfokus pada ketahanan pangan, pemberdayaan perempuan,
                dan produk sehat ramah lingkungan.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/kwt_dorangcinta/"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm transition hover:bg-primary hover:text-white"
              >
                <FaInstagram className="h-5 w-5" />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm transition hover:bg-primary hover:text-white"
              >
                <Mail className="h-5 w-5" />
              </a>

              <a
                href="https://wa.me/6281235816937"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm transition hover:bg-primary hover:text-white"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-foreground">
              Navigasi
            </h3>

            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground transition hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-foreground">
              Kontak
            </h3>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-1/6 text-primary" />

                <p className="w-5/6 leading-7 text-muted-foreground">
                  RT.10 RW.03 Kelurahan Perak Barat,
                  Kecamatan Krembangan,
                  Surabaya, Jawa Timur
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-1/6 text-primary" />

                <p className="w-5/6 text-muted-foreground">
                  +62 812-3581-6937
                </p>
              </div>

              <div className="flex items-center gap-3">
                <FaInstagram className="h-5 w-1/6 text-primary" />

                <p className="w-5/6 text-muted-foreground">
                  @kwt_dorangcinta
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2026 KWT Dorang Cinta. Menanam Harapan,
              Menuai Masa Depan.
            </p>

            <div className="flex gap-6 text-sm">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                Kebijakan Privasi
              </Link>

              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                Syarat & Ketentuan
              </Link>

              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                Bantuan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}