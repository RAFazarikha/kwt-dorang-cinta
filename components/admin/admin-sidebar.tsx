"use client"

import Link from "next/link"
import { LayoutDashboard, Receipt, CalendarDays, Sprout } from "lucide-react"

const menus = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Produk",
    href: "/admin/product",
    icon: Sprout,
  },
  {
    title: "Transaksi",
    href: "/admin/transaksi",
    icon: Receipt,
  },
  {
    title: "Event",
    href: "/admin/event",
    icon: CalendarDays,
  },
]

export default function AdminSidebar() {
  return (
    <aside className="hidden w-72 border-r border-border bg-white lg:block">
      <div className="border-b border-border p-6">
        <h1 className="text-2xl font-bold text-primary">
          KWT Dorang Cinta
        </h1>
      </div>

      <div className="space-y-2 p-4">
        {menus.map((menu) => {
          const Icon = menu.icon

          return (
            <Link
              key={menu.title}
              href={menu.href}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground transition hover:bg-secondary/10 hover:text-primary"
            >
              <Icon className="h-5 w-5" />
              {menu.title}
            </Link>
          )
        })}
      </div>
    </aside>
  )
}