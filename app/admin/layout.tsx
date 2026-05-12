import AdminSidebar from "@/components/admin/admin-sidebar"


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-muted/20">
      <AdminSidebar />

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  )
}