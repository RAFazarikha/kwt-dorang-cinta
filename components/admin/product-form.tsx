"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Package,
  ImageIcon,
  Wallet,
  Boxes,
} from "lucide-react"
import { createProduct, updateProduct } from "@/app/admin/actions/product-actions"
import ImageUpload from "../ui/image-upload"

interface ProductFormProps {
  initialData?: {
    id: string
    name: string
    price: number
    stock: number
    image_url: string
  }
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter()

  // =========================
  // STATE
  // =========================
  const [name, setName] = useState(initialData?.name || "")
  const [price, setPrice] = useState(initialData?.price || 0)
  const [stock, setStock] = useState(initialData?.stock || 0)

  // Kita cukup gunakan satu state ini saja untuk gambar
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || "")
  const [loading, setLoading] = useState(false)

  const isEdit = !!initialData

  // =========================
  // HANDLE SUBMIT
  // =========================
  const handleSubmit = async () => {
    try {
      setLoading(true)

      const payload = {
        name: name,
        price: price,
        stock: stock,
        image_url: imageUrl,
      }

      if (isEdit) {
        await updateProduct(initialData.id, payload)
        toast.success("Produk berhasil diperbarui")
        router.push("/admin")
      } else {
        await createProduct(payload)
        toast.success("Produk berhasil ditambahkan")

        // reset form
        setName("")
        setPrice(0)
        setStock(0)
        setImageUrl("")
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
            {isEdit ? "Edit Produk" : "Tambah Produk"}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {isEdit
              ? "Perbarui data produk."
              : "Tambahkan produk baru untuk KWT Dorang Cinta."}
          </p>
        </div>

        {/* Product Name */}
        <div className="space-y-2">
          <Label>Nama Produk</Label>
          <InputGroup>
            <InputGroupInput
              type="text"
              placeholder="Contoh: Selada Hidroponik"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputGroupAddon>
              <Package />
            </InputGroupAddon>
          </InputGroup>
        </div>

        {/* Price & Stock */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Price */}
          <div className="space-y-2">
            <Label>Harga Produk</Label>
            <InputGroup>
              <InputGroupInput
                type="number"
                placeholder="Masukkan harga"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
              <InputGroupAddon>
                <Wallet />
              </InputGroupAddon>
            </InputGroup>
          </div>

          {/* Stock */}
          <div className="space-y-2">
            <Label>Stok Produk</Label>
            <InputGroup>
              <InputGroupInput
                type="number"
                placeholder="Masukkan stok"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
              <InputGroupAddon>
                <Boxes />
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>

        {/* Upload Gambar via Cloudinary */}
        <div className="space-y-2">
          <label className="block text-sm font-medium mb-2">Upload Gambar (Otomatis)</label>
          <ImageUpload
            value={imageUrl}
            onChange={(url) => setImageUrl(url)}
            onRemove={() => setImageUrl("")}
          />
        </div>

        {/* Atau Input Image URL Manual */}
        <div className="space-y-2">
          <Label>URL Gambar</Label>
          <InputGroup>
            <InputGroupInput
              placeholder="https://..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              disabled
            />
            <InputGroupAddon>
              <ImageIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="rounded-2xl bg-secondary/10 p-5">
          <h3 className="text-lg font-semibold text-primary">
            Preview Produk
          </h3>
          <div className="mt-4 space-y-2">
            <p>
              <span className="font-medium">Nama:</span> {name || "-"}
            </p>
            <p>
              <span className="font-medium">Harga:</span> Rp {Number(price).toLocaleString("id-ID")}
            </p>
            <p>
              <span className="font-medium">Stok:</span> {stock}
            </p>
          </div>
        </div>

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-primary hover:bg-secondary"
        >
          {loading ? "Menyimpan..." : isEdit ? "Update Produk" : "Simpan Produk"}
        </Button>
      </CardContent>
    </Card>
  )
}