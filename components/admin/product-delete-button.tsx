"use client"

import { toast } from "sonner"

import { deleteProduct } from "@/app/admin/actions/product-actions"

import { DeleteDialog } from "@/components/admin/delete-dialog"
import { useRouter } from "next/navigation"


export function ProductDeleteButton({
  id,
}: {
  id: string
}) {
  const router = useRouter()
  const handleDelete = async () => {
    try {
      await deleteProduct(id)

      toast.success(
        "Produk berhasil dihapus"
      )
      router.refresh()
    } catch (error) {
      toast.error(
        "Gagal menghapus produk: " + (error as Error).message
      )
    }
  }

  return (
    <DeleteDialog
      title="Hapus Produk"
      description="Produk akan dihapus permanen dari database."
      onDelete={handleDelete}
    />
  )
}