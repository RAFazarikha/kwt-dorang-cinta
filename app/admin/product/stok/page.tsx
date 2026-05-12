import StokProductForm from "@/components/admin/stok-product-form";
import { createClient } from "@/lib/supabase/server"

export default async function StokPage() {
  const supabase = await createClient()

  const { data: products } =
  await supabase
    .from("products")
    .select("*")


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-primary">
          Product
        </h1>

        <p className="mt-2 text-muted-foreground">
          Kelola stok product yang akan tampil pada landing page.
        </p>
      </div>

      <StokProductForm products={products || []} />
    </div>
  )
}