import ProductForm from "@/components/admin/product-form"

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

  const { data: product } =
    await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single()

  if (!product) {
    return (
      <div>
        Produk tidak ditemukan
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <ProductForm
        initialData={product}
      />
    </div>
  )
}