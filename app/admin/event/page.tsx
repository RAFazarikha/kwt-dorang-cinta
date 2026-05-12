import { EventForm } from "@/components/admin/event-form"

export default function EventPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-primary">
          Event & Acara
        </h1>

        <p className="mt-2 text-muted-foreground">
          Kelola event yang akan tampil pada landing page.
        </p>
      </div>

      <EventForm />
    </div>
  )
}