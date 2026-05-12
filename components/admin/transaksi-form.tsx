"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"

// Import Server Actions yang baru dibuat
import { createTransaction, updateTransaction } from "@/app/admin/actions/transaction-actions"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, User, Wallet, Boxes } from "lucide-react"

type Product = {
  id: string
  name: string
  price: number
  stock: number
}

interface TransaksiFormProps {
  initialData?: {
    id: string
    buyer_name: string
    product_id: string
    quantity: number
    unit_price: number
    total_price: number
  }
}

export default function TransaksiForm({ initialData }: TransaksiFormProps) {
  const router = useRouter()
  const supabase = createClient()

  // STATE
  const [products, setProducts] = useState<Product[]>([])
  const [buyerName, setBuyerName] = useState(initialData?.buyer_name || "")
  const [selectedProduct, setSelectedProduct] = useState(initialData?.product_id || "")
  const [quantity, setQuantity] = useState(initialData?.quantity || 1)
  const [unitPrice, setUnitPrice] = useState(initialData?.unit_price || 0)
  const [totalPrice, setTotalPrice] = useState(initialData?.total_price || 0)
  const [loading, setLoading] = useState(false)

  const isEdit = !!initialData

  // FETCH PRODUCTS (Tetap menggunakan client untuk fetch awal, atau bisa dipindah ke action juga)
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("name", { ascending: true })

      if (error) {
        console.error(error)
        return
      }
      setProducts(data)
    }

    fetchProducts()
  }, [supabase])

  const handleProductChange = (value: string | null) => {
    if (!value) return
    setSelectedProduct(value)
    const product = products.find((item) => item.id === value)

    if (product) {
      setUnitPrice(product.price)
      setTotalPrice(product.price * quantity)
    }
  }

  const handleQuantityChange = (value: number) => {
    setQuantity(value)
    setTotalPrice(unitPrice * value)
  }

  // =========================
  // HANDLE SUBMIT DENGAN ACTIONS
  // =========================
  const handleSubmit = async () => {
    try {
      setLoading(true)

      const payload = {
        buyer_name: buyerName,
        product_id: selectedProduct,
        quantity,
        unit_price: unitPrice,
      }

      if (isEdit) {
        // Panggil action update
        await updateTransaction(initialData.id, payload)
        toast.success("Transaksi berhasil diperbarui")
        router.push("/admin")
      } else {
        // Panggil action create
        await createTransaction(payload)
        toast.success("Transaksi berhasil ditambahkan")

        // reset form
        setBuyerName("")
        setSelectedProduct("")
        setQuantity(1)
        setUnitPrice(0)
        setTotalPrice(0)
      }

      router.refresh()
    } catch (error: unknown) {
      console.error(error)
      const message = error instanceof Error ? error.message : "Terjadi kesalahan"
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="rounded-2xl border-border shadow-sm">
      <CardContent className="space-y-8 p-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-primary">
            {isEdit ? "Edit Transaksi" : "Tambah Transaksi"}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {isEdit ? "Perbarui data transaksi." : "Input data transaksi penjualan produk."}
          </p>
        </div>

        {/* Buyer */}
        <div className="space-y-2">
          <Label>Nama Pembeli</Label>
          <InputGroup>
            <InputGroupInput
              placeholder="Masukkan nama pembeli"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
            />
            <InputGroupAddon><User /></InputGroupAddon>
          </InputGroup>
        </div>

        {/* Product */}
        <div className="space-y-2">
          <Label>Pilih Produk</Label>
          <Select value={selectedProduct} onValueChange={handleProductChange}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih produk" />
            </SelectTrigger>
            <SelectContent>
              {products.map((product) => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Quantity */}
        <div className="space-y-2">
          <Label>Jumlah Produk</Label>
          <InputGroup>
            <InputGroupInput
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => handleQuantityChange(Number(e.target.value))}
            />
            <InputGroupAddon><Boxes /></InputGroupAddon>
          </InputGroup>
        </div>

        {/* Price */}
        <div className="space-y-2">
          <Label>Harga Satuan</Label>
          <InputGroup>
            <InputGroupInput type="number" value={unitPrice} disabled />
            <InputGroupAddon><Wallet /></InputGroupAddon>
          </InputGroup>
        </div>

        {/* Preview */}
        <div className="rounded-2xl bg-secondary/10 p-5">
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-primary">Preview Transaksi</h3>
          </div>
          <div className="mt-4 space-y-2">
            <p><span className="font-medium">Pembeli:</span> {buyerName || "-"}</p>
            <p><span className="font-medium">Jumlah:</span> {quantity}</p>
            <p>
              <span className="font-medium">Harga Satuan:</span> Rp {Number(unitPrice).toLocaleString("id-ID")}
            </p>
            <div className="pt-3">
              <h4 className="text-3xl font-bold text-primary">
                Rp {Number(totalPrice).toLocaleString("id-ID")}
              </h4>
            </div>
          </div>
        </div>

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-primary hover:bg-secondary"
        >
          {loading ? "Menyimpan..." : isEdit ? "Update Transaksi" : "Simpan Transaksi"}
        </Button>
      </CardContent>
    </Card>
  )
}