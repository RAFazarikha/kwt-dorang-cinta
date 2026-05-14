"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Receipt, CalendarDays, Sprout, Package, Users, CalendarClock } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { logoutAction } from "@/app/(auth)/actions"
import { buttonVariants } from "../ui/button"

const menus = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Transaksi",
    href: "/admin/transaksi",
    icon: Receipt,
  },
  {
    title: "Tambah Stok",
    href: "/admin/product/stok",
    icon: Package,
  },
  {
    title: "Produk",
    href: "/admin/product",
    icon: Sprout,
  },
  {
    title: "Event",
    href: "/admin/event",
    icon: CalendarDays,
  },
  {
    title: "Anggota",
    href: "/admin/member",
    icon: Users,
  },
  {
    title: "Jadwal Piket",
    href: "/admin/schedule",
    icon: CalendarClock,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border p-6">
        <h1 className="text-2xl font-bold text-primary">
          KWT Dorang Cinta
        </h1>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2 p-2">
              {menus.map((menu) => {
                const Icon = menu.icon
                const isActive = pathname === menu.href // Opsional: Untuk menandai menu aktif

                return (
                  <SidebarMenuItem key={menu.title}>
                    <SidebarMenuButton
                      isActive={isActive}
                      className="px-4 py-6 text-base"
                      render={
                        <Link href={menu.href} className="flex items-center gap-3">
                          <Icon className="h-5 w-5" />
                          <span>{menu.title}</span>
                        </Link>
                      }
                    >
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2 p-2">
              <SidebarMenuItem>
                <SidebarMenuButton
                  className={buttonVariants({ variant: "destructive", size: "default", className:"px-4 py-6 text-base" })}
                  onClick={logoutAction}
                >
                  Logout
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  )
}