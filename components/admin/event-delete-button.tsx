"use client"

import { useState } from "react" // 1. Import useState
import { toast } from "sonner"
import { DeleteDialog } from "@/components/admin/delete-dialog"
import { useRouter } from "next/navigation"
import { deleteEvent } from "@/app/admin/actions/event-actions"

export function EventDeleteButton({
  eventId,
  imageUrl
}: {
  eventId: string
  imageUrl: string
}) {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = async () => {
    try {
      await deleteEvent(eventId, imageUrl)

      toast.success("Event berhasil dihapus")

      setIsOpen(false)

      router.refresh()
    } catch (error) {
      toast.error(
        "Gagal menghapus event: " + (error as Error).message
      )
    }
  }

  return (
    <DeleteDialog
      // 4. Masukkan state ke dalam properti dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Hapus Event"
      description="Event akan dihapus permanen dari database."
      onDelete={handleDelete}
    />
  )
}