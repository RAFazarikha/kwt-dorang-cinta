"use client"

import { useState } from "react" // 1. Import useState
import { toast } from "sonner"
import { DeleteDialog } from "@/components/admin/delete-dialog"
import { useRouter } from "next/navigation"
import { deleteTransaction } from "@/app/admin/actions/transaction-actions"

export function TransactionDeleteButton({
  transaksiId,
}: {
  transaksiId: string
}) {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = async () => {
    try {
      await deleteTransaction(transaksiId)

      toast.success("Transaksi berhasil dihapus")

      setIsOpen(false)

      router.refresh()
    } catch (error) {
      toast.error(
        "Gagal menghapus transaksi: " + (error as Error).message
      )
    }
  }

  return (
    <DeleteDialog
      // 4. Masukkan state ke dalam properti dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Hapus Transaksi"
      description="Transaksi akan dihapus permanen dari database."
      onDelete={handleDelete}
    />
  )
}