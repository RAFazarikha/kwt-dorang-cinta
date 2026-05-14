"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "sonner"

import { createClient } from "@/lib/supabase/client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import {
  CalendarDays,
  ClipboardCheck,
  MapPin,
  Users,
} from "lucide-react"

type DutySchedule = {
  id: string
  shift_time: string
  day_of_week: number
}

type Event = {
  id: string
  title: string
  description: string
  location: string
  event_date: string
}

export default function AttendanceForm() {
  const pathname = usePathname()
  const router = useRouter()

  const supabase = createClient()

  const isRoutine = pathname.includes("absensi-piket")
  const isEvent = pathname.includes("absensi-event")

  const [loading, setLoading] = useState(false)

  const [memberId, setMemberId] = useState("")
  const [schedule, setSchedule] = useState<DutySchedule | null>(null)
  const [eventData, setEventData] = useState<Event | null>(null)

  const [notes, setNotes] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data: member, error: memberError } = await supabase
        .from("members")
        .select("id")
        .eq("id", user.id)
        .single()

      if (memberError || !member) {
        console.error(memberError)
        return
      }

      setMemberId(member.id)

      // =========================
      // TODAY
      // =========================
      const now = new Date()

      const todayDate = now
        .toLocaleDateString("en-CA")

      const dayOfWeek = now.getDay()

      // =========================
      // ABSENSI PIKET
      // =========================
      if (isRoutine) {
        const { data, error } = await supabase
          .from("duty_schedules")
          .select("*")
          .eq("member_id", member.id)
          .eq("day_of_week", dayOfWeek)
          .maybeSingle()
          console.log("TODAY:", dayOfWeek)
        if (error) {
          console.error(error)
        }

        if (data) {
          setSchedule(data)
        }
      }

      // =========================
      // ABSENSI EVENT
      // =========================
      if (isEvent) {
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .eq("event_date", todayDate)
          .eq("is_published", true)

        console.log("TODAY:", todayDate)
        console.log("EVENT:", data)

        if (error) {
          console.error(error)
        }

        if (data && data.length > 0) {
          setEventData(data[0])
        }
      }
    }

    fetchData()
  }, [isRoutine, isEvent, supabase])

  const handleSubmit = async () => {
    try {
      setLoading(true)

      const todayDate = new Date()
        .toLocaleDateString("en-CA")

      // =========================
      // ABSENSI PIKET
      // =========================
      if (isRoutine && schedule) {

        // CHECK SUDAH ABSEN
        const { data: existingAttendance } = await supabase
          .from("routine_attendances")
          .select("id")
          .eq("member_id", memberId)
          .eq("schedule_id", schedule.id)
          .eq("duty_date", todayDate)
          .maybeSingle()

        if (existingAttendance) {
          toast.warning("Anda sudah melakukan absensi piket hari ini")
          return
        }

        // INSERT ABSENSI
        const { error } = await supabase
          .from("routine_attendances")
          .insert({
            schedule_id: schedule.id,
            member_id: memberId,
            duty_date: todayDate,
            status: "Hadir",
            notes,
          })

        if (error) throw error

        toast.success("Absensi piket berhasil")

        router.push("/user")
        router.refresh()

        return
      }

      // =========================
      // ABSENSI EVENT
      // =========================
      if (isEvent && eventData) {

        // CHECK SUDAH ABSEN
        const { data: existingAttendance } = await supabase
          .from("event_attendances")
          .select("id")
          .eq("member_id", memberId)
          .eq("event_id", eventData.id)
          .maybeSingle()

        if (existingAttendance) {
          toast.warning("Anda sudah melakukan absensi event")
          return
        }

        // INSERT ABSENSI
        const { error } = await supabase
          .from("event_attendances")
          .insert({
            event_id: eventData.id,
            member_id: memberId,
          })

        if (error) throw error

        toast.success("Absensi event berhasil")

        router.push("/user")
        router.refresh()

        return
      }

    } catch (error) {
      console.error(error)
      toast.error("Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="rounded-2xl border-border shadow-sm">
      <CardContent className="space-y-8 p-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-primary">
            {isRoutine ? "Absensi Piket" : "Absensi Event"}
          </h2>

          <p className="mt-2 text-muted-foreground">
            {isRoutine
              ? "Lakukan absensi sesuai jadwal piket hari ini."
              : "Lakukan absensi kegiatan event hari ini."}
          </p>
        </div>

        {/* ROUTINE */}
        {isRoutine && schedule && (
          <div className="rounded-2xl bg-secondary/10 p-5 space-y-4">
            <div className="flex items-center gap-3">
              <ClipboardCheck className="h-5 w-5 text-primary" />

              <h3 className="text-lg font-semibold text-primary">
                Jadwal Piket Hari Ini
              </h3>
            </div>

            <div className="space-y-2">
              <p>
                <span className="font-medium">
                  Shift:
                </span>{" "}
                {schedule.shift_time}
              </p>

              <p>
                <span className="font-medium">
                  Hari:
                </span>{" "}
                {new Date().toLocaleDateString(
                  "id-ID",
                  {
                    weekday: "long",
                  }
                )}
              </p>
            </div>
          </div>
        )}

        {/* EVENT */}
        {isEvent && eventData && (
          <div className="rounded-2xl bg-secondary/10 p-5 space-y-4">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-primary" />

              <h3 className="text-lg font-semibold text-primary">
                Event Hari Ini
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />

                <span>{eventData.title}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />

                <span>{eventData.location}</span>
              </div>

              <p className="text-sm text-muted-foreground">
                {eventData.description}
              </p>
            </div>
          </div>
        )}

        {/* NOTES */}
        <div className="space-y-2">
          <Label>Catatan</Label>

          <Textarea
            placeholder="Tambahkan catatan jika diperlukan"
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
          />
        </div>

        {/* EMPTY */}
        {!schedule && isRoutine && (
          <div className="rounded-2xl border border-dashed p-6 text-center text-muted-foreground">
            Tidak ada jadwal piket hari ini.
          </div>
        )}

        {!eventData && isEvent && (
          <div className="rounded-2xl border border-dashed p-6 text-center text-muted-foreground">
            Tidak ada event hari ini.
          </div>
        )}

        {/* SUBMIT */}
        <Button
          onClick={handleSubmit}
          disabled={
            loading ||
            (isRoutine && !schedule) ||
            (isEvent && !eventData)
          }
          className="w-full bg-primary hover:bg-secondary"
        >
          {loading
            ? "Menyimpan..."
            : "Kirim Absensi"}
        </Button>
      </CardContent>
    </Card>
  )
}