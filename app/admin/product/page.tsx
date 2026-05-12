import ProductForm from "@/components/admin/product-form";


export default function ProductPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-primary">
          Product
        </h1>

        <p className="mt-2 text-muted-foreground">
          Kelola product yang akan tampil pada landing page.
        </p>
      </div>

      <ProductForm />
    </div>
  )
}