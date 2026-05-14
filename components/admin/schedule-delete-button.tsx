"use client"

import { useState } from "react" // 1. Import useState
import { toast } from "sonner"
import { DeleteDialog } from "@/components/admin/delete-dialog"
import { useRouter } from "next/navigation"
import { deleteSchedule } from "@/app/admin/actions/schedule-actions"

export function ScheduleDeleteButton({
  jadwalId,
}: {
  jadwalId: string
}) {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = async () => {
    try {
      await deleteSchedule(jadwalId)

      toast.success("Jadwal piket berhasil dihapus")

      setIsOpen(false)

      router.refresh()
    } catch (error) {
      toast.error(
        "Gagal menghapus jadwal piket: " + (error as Error).message
      )
    }
  }

  return (
    <DeleteDialog
      // 4. Masukkan state ke dalam properti dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Hapus Jadwal Piket"
      description="Jadwal Piket akan dihapus permanen dari database."
      onDelete={handleDelete}
    />
  )
}