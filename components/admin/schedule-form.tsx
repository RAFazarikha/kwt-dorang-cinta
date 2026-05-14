"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { createClient } from "@/lib/supabase/client"

import {
  createSchedule,
  updateSchedule,
} from "@/app/admin/actions/schedule-actions"

import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
} from "@/components/ui/card"

import { Label } from "@/components/ui/label"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  CalendarDays,
} from "lucide-react"

type Member = {
  id: string
  full_name: string
}

interface ScheduleFormProps {
  initialData?: {
    id: string
    member_id: string
    day_of_week: number
    shift_time: string
  }
}

const DAYS = [
  { label: "Senin", value: 1 },
  { label: "Selasa", value: 2 },
  { label: "Rabu", value: 3 },
  { label: "Kamis", value: 4 },
  { label: "Jumat", value: 5 },
  { label: "Sabtu", value: 6 },
  { label: "Minggu", value: 7 },
]

const SHIFT_OPTIONS = [
  {
    label: "Pagi",
    value: "Pagi",
  },
  {
    label: "Sore",
    value: "Sore",
  },
]

export default function ScheduleForm({
  initialData,
}: ScheduleFormProps) {
  const router = useRouter()
  const supabase = createClient()

  // STATE
  const [members, setMembers] = useState<Member[]>([])
  const [selectedMember, setSelectedMember] = useState(
    initialData?.member_id || ""
  )

  const [dayOfWeek, setDayOfWeek] = useState<number>(
    initialData?.day_of_week || 1
  )

  const [shiftTime, setShiftTime] = useState(
    initialData?.shift_time || ""
  )

  const [loading, setLoading] = useState(false)

  const isEdit = !!initialData

  // FETCH MEMBERS
  useEffect(() => {
    const fetchMembers = async () => {
      const { data, error } = await supabase
        .from("members")
        .select("id, full_name")
        .filter("role", "eq", "member")
        .order("full_name", { ascending: true })

      if (error) {
        console.error(error)
        return
      }

      setMembers(data)
    }

    fetchMembers()
  }, [supabase])

  // HANDLE SUBMIT
  const handleSubmit = async () => {
    try {
      setLoading(true)

      const payload = {
        member_id: selectedMember,
        day_of_week: dayOfWeek,
        shift_time: shiftTime,
      }

      if (isEdit) {
        await updateSchedule(initialData.id, payload)

        toast.success("Jadwal berhasil diperbarui")

        router.push("/admin")
      } else {
        await createSchedule(payload)

        toast.success("Jadwal berhasil ditambahkan")

        // reset form
        setSelectedMember("")
        setDayOfWeek(1)
        setShiftTime("")
      }

      router.refresh()
    } catch (error: unknown) {
      console.error(error)

      const message =
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan"

      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const memberOptions = members.map((member) => ({
    label: member.full_name,
    value: member.id,
  }))

  const dayOptions = DAYS.map((day) => ({
    label: day.label,
    value: String(day.value),
  }))

  return (
    <Card className="rounded-2xl border-border shadow-sm">
      <CardContent className="space-y-8 p-6">

        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-primary">
            {isEdit ? "Edit Jadwal" : "Tambah Jadwal"}
          </h2>

          <p className="mt-2 text-muted-foreground">
            {isEdit
              ? "Perbarui data jadwal anggota."
              : "Input data jadwal piket anggota."}
          </p>
        </div>

        {/* Member */}
        <div className="space-y-2">
          <Label>Pilih Anggota</Label>

          <Select
            value={selectedMember}
            onValueChange={(value) => setSelectedMember(value || "")}
            items={memberOptions}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih anggota" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Daftar Anggota</SelectLabel>

                {members.map((member) => (
                  <SelectItem
                    key={member.id}
                    value={member.id}
                  >
                    {member.full_name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Day */}
        <div className="space-y-2">
          <Label>Hari Bertugas</Label>

          <Select
            value={String(dayOfWeek)}
            onValueChange={(value) =>
              setDayOfWeek(Number(value))
            }
            items={dayOptions}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih hari" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Hari</SelectLabel>

                {DAYS.map((day) => (
                  <SelectItem
                    key={day.value}
                    value={String(day.value)}
                  >
                    {day.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Shift */}
        <div className="space-y-2">
          <Label>Shift Bertugas</Label>

          <Select
            value={shiftTime}
            onValueChange={(value) => setShiftTime(value || "")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih shift" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Shift</SelectLabel>

                {SHIFT_OPTIONS.map((shift) => (
                  <SelectItem
                    key={shift.value}
                    value={shift.value}
                  >
                    {shift.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Preview */}
        <div className="rounded-2xl bg-secondary/10 p-5">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-primary" />

            <h3 className="text-lg font-semibold text-primary">
              Preview Jadwal
            </h3>
          </div>

          <div className="mt-4 space-y-2">
            <p>
              <span className="font-medium">
                Anggota:
              </span>{" "}
              {members.find(
                (member) =>
                  member.id === selectedMember
              )?.full_name || "-"}
            </p>

            <p>
              <span className="font-medium">
                Hari:
              </span>{" "}
              {DAYS.find(
                (day) =>
                  day.value === dayOfWeek
              )?.label || "-"}
            </p>

            <p>
              <span className="font-medium">
                Shift:
              </span>{" "}
              {shiftTime || "-"}
            </p>
          </div>
        </div>

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-primary hover:bg-secondary"
        >
          {loading
            ? "Menyimpan..."
            : isEdit
              ? "Update Jadwal"
              : "Simpan Jadwal"}
        </Button>

      </CardContent>
    </Card>
  )
}