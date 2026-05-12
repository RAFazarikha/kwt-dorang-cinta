import AdminSidebar from "@/components/admin/admin-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Render Sidebar */}
        <AdminSidebar />

        <main className="flex-1 overflow-x-hidden">
          {/* Tombol trigger ini otomatis akan hilang di desktop dan muncul di mobile */}
          <div className="flex h-16 items-center border-b px-4 md:hidden">
            <SidebarTrigger />
          </div>

          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}