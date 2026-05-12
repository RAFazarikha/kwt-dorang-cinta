import Image from "next/image"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Button,
  buttonVariants,
} from "@/components/ui/button"
import {
  MoreHorizontal,
  Pencil,
} from "lucide-react"
import { ProductSearch } from "@/components/admin/product-search"
import { DataTable } from "@/components/admin/data-table"
import { ProductDeleteButton } from "@/components/admin/product-delete-button"

interface Product {
  id: string
  name: string
  price: number
  stock: number | null
  image_url: string
}

interface ProductTableProps {
  products: Product[]
}

export function ProductTable({
  products,
}: ProductTableProps) {

  const tableData =
    products?.map((product) => ({
      nama: product.name,

      harga: `Rp ${Number(
        product.price
      ).toLocaleString("id-ID")}`,

      stok: product.stock,

      gambar: (
        <Image
          width={56}
          height={56}
          src={product.image_url || ""}
          alt={product.name}
          className="h-14 w-14 rounded-lg object-cover"
        />
      ),

      action: (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                size="icon"
                variant="ghost"
                data-slot="dropdown-menu-trigger"
              >
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            }
          />

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              render={
                <Link
                  href={`/admin/product/${product.id}`}
                  className={buttonVariants({
                    variant: "outline",
                    className:
                      "w-full justify-start",
                  })}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              }
            />

            <DropdownMenuItem
              className="text-red-600"
              render={
                <ProductDeleteButton
                  productId={product.id}
                  imageUrl={product.image_url}
                />
              }
            />
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    })) || []

  type TableItem =
    typeof tableData[0]

  const columns: {
    key: keyof TableItem
    label: string
  }[] = [
    {
      key: "nama",
      label: "Nama Produk",
    },
    {
      key: "harga",
      label: "Harga",
    },
    {
      key: "stok",
      label: "Stok",
    },
    {
      key: "gambar",
      label: "Gambar",
    },
    {
      key: "action",
      label: "Action",
    },
  ]

  return (
    <div>
      <div className="mb-3 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <ProductSearch />

        <Link href="/admin/product">
          <Button className="bg-primary hover:bg-secondary">
            Tambah Produk
          </Button>
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={tableData}
      />
    </div>
  )
}