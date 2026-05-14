import MemberForm from "@/components/admin/member-form"
import { createClient as createAdminClient } from "@supabase/supabase-js"

export default async function EditMemberPage({
  params,
}: {
  params: Promise<{
    id: string
  }>
}) {
  const { id } = await params

  // 1. Inisialisasi Admin Client (karena ini Server Component, ini sangat aman)
  const supabaseAdmin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )

  // 2. Ambil data secara paralel menggunakan Promise.all
  const [memberResult, authResult] = await Promise.all([
    supabaseAdmin
      .from("members")
      .select("*")
      .eq("id", id)
      .single(),
    supabaseAdmin.auth.admin.getUserById(id)
  ])

  // 3. Handle jika data members tidak ditemukan atau error
  if (memberResult.error || !memberResult.data) {
    console.error("MEMBER FETCH ERROR:", memberResult.error?.message)
    return (
      <div className="flex h-40 items-center justify-center text-muted-foreground">
        Member tidak ditemukan.
      </div>
    )
  }

  // 4. Handle jika data auth tidak ditemukan atau error
  if (authResult.error || !authResult.data.user) {
    console.error("AUTH FETCH ERROR:", authResult.error?.message)
    return (
      <div className="flex h-40 items-center justify-center text-muted-foreground">
        Data autentikasi member tidak ditemukan.
      </div>
    )
  }

  // 5. Gabungkan data
  const combinedData = {
    ...memberResult.data,
    email: authResult.data.user.email,
    // Tambahkan field lain dari authResult jika Form kamu membutuhkannya
    // contoh: created_at: authResult.data.user.created_at
  }

  return (
    <div className="space-y-8">
      <MemberForm initialData={combinedData} />
    </div>
  )
}