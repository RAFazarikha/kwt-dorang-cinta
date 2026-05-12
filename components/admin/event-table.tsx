import { DataTable } from "@/components/admin/data-table"

interface Event {
  id: string
  title: string
  location: string | null
  event_date: string
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
  ]

  return (
    <DataTable
      columns={columns}
      data={tableData}
    />
  )
}