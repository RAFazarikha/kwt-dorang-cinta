import TransaksiForm from "@/components/admin/transaksi-form"

export default function TransaksiPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-primary">
          Transaksi
        </h1>

        <p className="mt-2 text-muted-foreground">
          Kelola pencatatan transaksi penjualan.
        </p>
      </div>

      <TransaksiForm />
    </div>
  )
}