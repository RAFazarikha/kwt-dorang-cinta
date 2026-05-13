import { DataTable } from "@/components/admin/data-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button, buttonVariants } from "../ui/button"
import { MoreHorizontal, Pencil } from "lucide-react"
import Link from "next/link"
import { EventDeleteButton } from "./event-delete-button"

interface Event {
  id: string
  title: string
  location: string | null
  event_date: string
  image_url: string
  is_published: boolean | null
}

interface EventTableProps {
  events: Event[]
}

export function EventTable({
  events,
}: EventTableProps) {

  const tableData =
    events?.map((event) => ({
      judul: event.title,

      lokasi:
        event.location || "-",

      tanggal: new Date(
        event.event_date
      ).toLocaleDateString("id-ID"),

      status:
        event.is_published
          ? "Published"
          : "Draft",

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
                  href={`/admin/event/${event.id}`}
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
                <EventDeleteButton
                  eventId={event.id}
                  imageUrl={event.image_url}
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
      key: "judul",
      label: "Judul Event",
    },
    {
      key: "lokasi",
      label: "Lokasi",
    },
    {
      key: "tanggal",
      label: "Tanggal",
    },
    {
      key: "status",
      label: "Status",
    },
    {
      key: "action",
      label: "Aksi",
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={tableData}
    />
  )
}