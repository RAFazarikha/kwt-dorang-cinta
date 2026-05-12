"use client"

import { useState } from "react"

import { useRouter } from "next/navigation"

import { createClient } from "@/lib/supabase/client"

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

import Image from "next/image"

interface ProductFormProps {
  initialData?: {
    id: string
    name: string
    price: number
    stock: number
    image_url: string
  }
}

export default function ProductForm({
  initialData,
}: ProductFormProps) {
  const router = useRouter()

  const supabase = createClient()

  // =========================
  // STATE
  // =========================
  const [name, setName] = useState(
    initialData?.name || ""
  )

  const [price, setPrice] = useState(
    initialData?.price || 0
  )

  const [stock, setStock] = useState(
    initialData?.stock || 0
  )

  const [imageUrl, setImageUrl] =
    useState(
      initialData?.image_url || ""
    )

  const [loading, setLoading] =
    useState(false)

  const isEdit = !!initialData

  // =========================
  // HANDLE SUBMIT
  // =========================
  const handleSubmit = async () => {
    try {
      setLoading(true)

      // =========================
      // UPDATE
      // =========================
      if (isEdit) {
        const { error } = await supabase
          .from("products")
          .update({
            name,
            price,
            stock,
            image_url: imageUrl,
          })
          .eq("id", initialData.id)

        if (error) {
          toast.error(error.message)
          return
        }

        toast.success(
          "Produk berhasil diperbarui"
        )

        router.push("/admin")
        router.refresh()

        return
      }

      // =========================
      // CREATE
      // =========================
      const { error } = await supabase
        .from("products")
        .insert({
          name,
          price,
          stock,
          image_url: imageUrl,
        })

      if (error) {
        toast.error(error.message)
        return
      }

      toast.success(
        "Produk berhasil ditambahkan"
      )

      // reset form
      setName("")
      setPrice(0)
      setStock(0)
      setImageUrl("")

      router.push("/admin")
      router.refresh()
    } catch (error) {
      console.error(error)

      toast.error(
        "Terjadi kesalahan"
      )
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
            {isEdit
              ? "Edit Produk"
              : "Tambah Produk"}
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
              onChange={(e) =>
                setName(e.target.value)
              }
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
                onChange={(e) =>
                  setPrice(
                    Number(e.target.value)
                  )
                }
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
                onChange={(e) =>
                  setStock(
                    Number(e.target.value)
                  )
                }
              />

              <InputGroupAddon>
                <Boxes />
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>

        {/* Image URL */}
        <div className="space-y-2">
          <Label>URL Gambar Produk</Label>

          <InputGroup>
            <InputGroupInput
              placeholder="https://..."
              value={imageUrl}
              onChange={(e) =>
                setImageUrl(
                  e.target.value
                )
              }
            />

            <InputGroupAddon>
              <ImageIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>

        {/* Preview */}
        {imageUrl && (
          <div className="overflow-hidden rounded-2xl border border-border">
            <Image
              width={100}
              height={100}
              src={imageUrl}
              alt="Preview"
              className="h-64 w-full object-cover"
            />
          </div>
        )}

        <div className="rounded-2xl bg-secondary/10 p-5">
          <h3 className="text-lg font-semibold text-primary">
            Preview Produk
          </h3>

          <div className="mt-4 space-y-2">
            <p>
              <span className="font-medium">
                Nama:
              </span>{" "}
              {name || "-"}
            </p>

            <p>
              <span className="font-medium">
                Harga:
              </span>{" "}
              Rp{" "}
              {Number(price).toLocaleString(
                "id-ID"
              )}
            </p>

            <p>
              <span className="font-medium">
                Stok:
              </span>{" "}
              {stock}
            </p>
          </div>
        </div>

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-primary hover:bg-secondary"
        >
          {loading
            ? "Menyimpan..."
            : isEdit
            ? "Update Produk"
            : "Simpan Produk"}
        </Button>
      </CardContent>
    </Card>
  )
}