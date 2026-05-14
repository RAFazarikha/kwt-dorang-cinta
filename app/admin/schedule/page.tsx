import ScheduleForm from "@/components/admin/schedule-form";

export default function SchedulePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-primary">
          Jadwal Piket
        </h1>

        <p className="mt-2 text-muted-foreground">
          Kelola jadwal piket dari KWT Dorang Cinta.
        </p>
      </div>

      <ScheduleForm />
    </div>
  )
}