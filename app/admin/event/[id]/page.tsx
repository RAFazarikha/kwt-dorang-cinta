import { EventForm } from "@/components/admin/event-form"
import { createClient } from "@/lib/supabase/server"

export default async function EditEventPage({
  params,
}: {
  params: Promise<{
    id: string
  }>
}) {
  const { id } = await params

  const supabase = await createClient()

  const { data: event } =
    await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single()

  if (!event) {
    return (
      <div>
        Event tidak ditemukan
      </div>
    )
  }
  return (
    <div className="space-y-8">
      <EventForm
        initialData={event}
      />
    </div>
  )
}