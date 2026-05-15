"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu } from "lucide-react"
import type { User } from "@supabase/supabase-js"
import { Button, buttonVariants } from "@/components/ui/button"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

import { createClient } from "@/lib/supabase/client"

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

const phoneNumber = "6281235816937"
const message = "Halo, saya tertarik dengan sayuran hidroponiknya!"
const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

export default function Navbar() {
  const supabase = createClient()

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      setUser(user)
    }

    getUser()

    // realtime auth listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const role = user?.user_metadata?.role

  let url = "";

  if (role === "admin") {
    url = "/admin"
  } else {
    url = "/user"
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border bg-white/90 backdrop-blur">
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
        <div className="hidden lg:flex lg:flex-row lg:gap-3">
          {user ? (
            <Link
              href={url}
              className={buttonVariants({
                variant: "default",
                size: "default",
                className:
                  "rounded-lg bg-primary px-6 text-white hover:bg-secondary",
              })}
            >
              Dashboard
            </Link>
          ) : (
            <>
              <a
                href={waLink}
                className={buttonVariants({
                  variant: "default",
                  size: "default",
                  className:
                    "w-min rounded-lg px-6",
                })}
              >
                Gabung Komunitas
              </a>
              <Link
                href="/login"
                className={buttonVariants({
                  variant: "secondary",
                  size: "default",
                  className:
                    "w-min rounded-lg px-6",
                })}
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* Mobile Sidebar */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger render={
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-secondary/10"
              >
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
                <div className="flex flex-col gap-3 border-t border-border p-6">
                  {user ? (
                    <Link
                      href={url}
                      className={buttonVariants({
                        variant: "default",
                        size: "default",
                        className:
                          "w-full rounded-lg bg-primary px-6 text-white hover:bg-secondary",
                      })}
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <>
                      <a
                        href={waLink}
                        className={buttonVariants({
                          variant: "default",
                          size: "default",
                          className:
                            "w-full rounded-lg",
                        })}
                      >
                        Gabung Komunitas
                      </a>
                      <Link
                        href="/login"
                        className={buttonVariants({
                          variant: "secondary",
                          size: "default",
                          className:
                            "w-full rounded-lg",
                        })}
                      >
                        Login
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}