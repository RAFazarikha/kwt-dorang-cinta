import TransaksiForm from "@/components/admin/transaksi-form"
import { createClient } from "@/lib/supabase/server"

export default async function EditProductPage({
  params,
}: {
  params: Promise<{
    id: string
  }>
}) {
  const { id } = await params

  const supabase = await createClient()

  const { data: transaksi } =
    await supabase
      .from("transactions")
      .select("*")
      .eq("id", id)
      .single()

  if (!transaksi) {
    return (
      <div>
        Transaksi tidak ditemukan
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <TransaksiForm
        initialData={transaksi}
      />
    </div>
  )
}