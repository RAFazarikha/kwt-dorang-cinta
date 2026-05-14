"use client"

import { useState } from "react" // 1. Import useState
import { toast } from "sonner"
import { DeleteDialog } from "@/components/admin/delete-dialog"
import { useRouter } from "next/navigation"
import { deleteMember } from "@/app/admin/actions/member-actions"

export function MemberDeleteButton({
  anggotaId,
}: {
  anggotaId: string
}) {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = async () => {
    try {
      await deleteMember(anggotaId)

      toast.success("Anggota berhasil dihapus")

      setIsOpen(false)

      router.refresh()
    } catch (error) {
      toast.error(
        "Gagal menghapus anggota: " + (error as Error).message
      )
    }
  }

  return (
    <DeleteDialog
      // 4. Masukkan state ke dalam properti dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Hapus Anggota"
      description="Anggota akan dihapus permanen dari database."
      onDelete={handleDelete}
    />
  )
}