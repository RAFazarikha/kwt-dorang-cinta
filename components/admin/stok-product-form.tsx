"use client"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  AlertTriangle,
  Boxes,
  Package,
  Wallet,
} from "lucide-react"
import { updateStokProduct } from "@/app/admin/actions/product-actions"

interface Product {
  id: string
  name: string
  price: number
  stock: number
  image_url: string
}

interface StokProductFormProps {
  products: Product[]
}

export default function StokProductForm({
  products,
}: StokProductFormProps) {

  const router = useRouter()

  // =========================
  // STATE
  // =========================

  const [selectedProductId, setSelectedProductId] =
    useState<string | null>(null)

  const [additionalStock, setAdditionalStock] =
    useState(0)

  const [loading, setLoading] =
    useState(false)

  // =========================
  // SELECTED PRODUCT
  // =========================

  const selectedProduct =
    useMemo(() => {

      return products.find(
        (product) =>
          product.id ===
          selectedProductId
      )
    }, [
      products,
      selectedProductId,
    ])

  // =========================
  // FINAL STOCK
  // =========================

  const finalStock =
    (selectedProduct?.stock || 0) +
    additionalStock

  // =========================
  // HANDLE SUBMIT
  // =========================

  const handleSubmit =
    async () => {

      try {

        if (!selectedProduct) {
          toast.error(
            "Pilih produk terlebih dahulu"
          )
          return
        }

        if (
          additionalStock <= 0
        ) {
          toast.error(
            "Jumlah stok harus lebih dari 0"
          )
          return
        }

        setLoading(true)

        await updateStokProduct(
          selectedProduct.id,
          {
            stock: finalStock,
          }
        )

        toast.success(
          "Stok berhasil ditambahkan"
        )

        setSelectedProductId("")
        setAdditionalStock(0)

        router.refresh()

      } catch (error) {

        console.error(error)

        toast.error(
          "Gagal menambahkan stok"
        )

      } finally {

        setLoading(false)
      }
    }

  const productOptions = products.map((product) => ({
    label: product.name,
    value: product.id.toString()
  }));

  return (
    <Card className="rounded-2xl border-border shadow-sm">

      <CardContent className="space-y-8 p-6">

        {/* HEADER */}
        <div>
          <h2 className="text-2xl font-bold text-primary">
            Tambah Stok Produk
          </h2>

          <p className="mt-2 text-muted-foreground">
            Pilih produk lalu tambahkan jumlah stok.
          </p>
        </div>

        {/* ALERT */}
        <Alert className="border-primary/20 bg-primary/5">

          <AlertTriangle className="h-4 w-4 text-primary" />

          <AlertTitle>
            Penambahan Stok Saja
          </AlertTitle>

          <AlertDescription>
            Form ini hanya digunakan
            untuk menambahkan stok
            produk. Data produk lain
            seperti nama, harga,
            dan gambar tidak dapat
            diubah.
          </AlertDescription>
        </Alert>

        {/* SELECT PRODUCT */}
        <div className="space-y-2">

          <Label>
            Pilih Produk
          </Label>

          <Select
            value={
              selectedProductId
            }
            onValueChange={
              setSelectedProductId
            }
            items={productOptions}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih produk" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Pilih Produk</SelectLabel>
                {products.map(
                  (product) => (
                    <SelectItem
                      key={product.id}
                      value={
                        product.id
                      }
                    >
                      {product.name}
                    </SelectItem>
                  )
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* DETAIL PRODUK */}
        {selectedProduct && (
          <div className="space-y-6 rounded-2xl border bg-muted/30 p-5">

            <h3 className="text-lg font-semibold text-primary">
              Detail Produk
            </h3>

            {/* NAMA */}
            <div className="space-y-2">

              <Label>
                Nama Produk
              </Label>

              <InputGroup>

                <InputGroupInput
                  value={
                    selectedProduct.name
                  }
                  disabled
                />

                <InputGroupAddon>
                  <Package />
                </InputGroupAddon>
              </InputGroup>
            </div>

            {/* HARGA */}
            <div className="space-y-2">

              <Label>
                Harga Produk
              </Label>

              <InputGroup>

                <InputGroupInput
                  value={`Rp ${Number(
                    selectedProduct.price
                  ).toLocaleString(
                    "id-ID"
                  )}`}
                  disabled
                />

                <InputGroupAddon>
                  <Wallet />
                </InputGroupAddon>
              </InputGroup>
            </div>

            {/* STOK SAAT INI */}
            <div className="space-y-2">

              <Label>
                Stok Saat Ini
              </Label>

              <InputGroup>

                <InputGroupInput
                  value={
                    selectedProduct.stock
                  }
                  disabled
                />

                <InputGroupAddon>
                  <Boxes />
                </InputGroupAddon>
              </InputGroup>
            </div>

            {/* TAMBAH STOK */}
            <div className="space-y-2">

              <Label>
                Tambah Stok
              </Label>

              <InputGroup>

                <InputGroupInput
                  type="number"
                  placeholder="Masukkan jumlah stok tambahan"
                  value={
                    additionalStock
                  }
                  onChange={(e) =>
                    setAdditionalStock(
                      Number(
                        e.target.value
                      )
                    )
                  }
                />

                <InputGroupAddon>
                  <Boxes />
                </InputGroupAddon>
              </InputGroup>
            </div>

            {/* HASIL STOK */}
            <div className="rounded-xl bg-primary/5 p-4">

              <p className="text-sm text-muted-foreground">
                Total stok setelah ditambahkan
              </p>

              <h4 className="mt-2 text-3xl font-bold text-primary">
                {finalStock}
              </h4>
            </div>
          </div>
        )}

        {/* BUTTON */}
        <Button
          onClick={handleSubmit}
          disabled={
            loading ||
            !selectedProduct
          }
          className="w-full bg-primary hover:bg-secondary"
        >
          {loading
            ? "Menyimpan..."
            : "Tambah Stok"}
        </Button>
      </CardContent>
    </Card>
  )
}