"use client"

import Link from "next/link"
import { Menu } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

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
    label: "Event",
    href: "/events",
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

const phoneNumber = "6281235816937";
const message = "Halo, saya tertarik dengan sayuran hidroponiknya!";
const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

export default function Navbar() {
  return (
    <header className="fixed w-full top-0 z-50 border-b border-border bg-white/90 backdrop-blur">
      <div className="container-custom flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <h1 className="font-heading text-2xl font-bold text-primary">
            KWT Dorang Cinta
          </h1>
        </Link>

        {/* Desktop Navbar */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Button */}
        <div className="hidden lg:block">
          <a
            href={waLink}
            className={buttonVariants({ variant: "default", size: "default", className: "rounded-lg bg-primary px-6 text-white hover:bg-secondary" })}
          >
            Gabung Komunitas
          </a>
        </div>

        {/* Mobile Sidebar */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger render={
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-secondary/10">
                  <Menu className="h-6 w-6 text-primary" />
              </Button>
            }>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-70 border-l border-border bg-background p-0"
            >
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="border-b border-border p-6">
                  <h2 className="font-heading text-2xl font-bold text-primary">
                    KWT Dorang Cinta
                  </h2>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Urban Farming & Hidroponik Modern
                  </p>
                </div>

                {/* Navigation */}
                <nav className="flex flex-1 flex-col gap-2 p-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary/10 hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                {/* Footer */}
                <div className="border-t border-border p-6">
                  <a
                    href={waLink}
                    className={buttonVariants({ variant: "default", size: "default", className: "rounded-lg bg-primary px-6 text-white hover:bg-secondary" })}
                  >
                    Gabung Komunitas
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}