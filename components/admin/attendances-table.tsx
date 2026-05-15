"use client"

import { useState } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { Badge } from "@/components/ui/badge"

import { DataTable } from "@/components/admin/data-table"

interface RoutineAttendance {
  id: string
  duty_date: string
  status: string
  notes: string | null

  members?: {
    full_name: string
  } | null

  duty_schedules?: {
    shift_time: string
  } | null
}

interface EventAttendance {
  id: string
  attended_at: string | null

  members?: {
    full_name: string
  } | null

  events?: {
    title: string
    location: string
    event_date: string
  } | null
}

interface AttendancesTableProps {
  routineAttendances: RoutineAttendance[]
  eventAttendances: EventAttendance[]
}

export function AttendancesTable({
  routineAttendances,
  eventAttendances,
}: AttendancesTableProps) {

  const [tab, setTab] =
    useState("routine")

  // =========================
  // ROUTINE TABLE
  // =========================

  const routineTableData =
    routineAttendances.map(
      (attendance) => ({
        member:
          attendance.members
            ?.full_name || "-",

        shift:
          attendance
            .duty_schedules
            ?.shift_time || "-",

        tanggal:
          attendance.duty_date
            ? new Date(
                attendance.duty_date
              ).toLocaleDateString(
                "id-ID"
              )
            : "-",

        status: (
          <Badge variant={(attendance.status === "Hadir") ? "default" : "secondary"} className="w-full">
            {attendance.status}
          </Badge>
        ),

        notes:
          attendance.notes || "-",
      })
    ) || []

  type RoutineItem =
    typeof routineTableData[0]

  const routineColumns: {
    key: keyof RoutineItem
    label: string
  }[] = [
    {
      key: "member",
      label: "Member",
    },
    {
      key: "shift",
      label: "Shift",
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
      key: "notes",
      label: "Catatan",
    },
  ]

  // =========================
  // EVENT TABLE
  // =========================

  const eventTableData =
    eventAttendances.map(
      (attendance) => ({
        member:
          attendance.members
            ?.full_name || "-",

        event:
          attendance.events?.title ||
          "-",

        lokasi:
          attendance.events
            ?.location || "-",

        tanggal:
          attendance.events
            ?.event_date
            ? new Date(
                attendance.events.event_date
              ).toLocaleDateString(
                "id-ID"
              )
            : "-",

        hadir:
          attendance.attended_at
            ? new Date(
                attendance.attended_at
              ).toLocaleString(
                "id-ID"
              )
            : "-",
      })
    ) || []

  type EventItem =
    typeof eventTableData[0]

  const eventColumns: {
    key: keyof EventItem
    label: string
  }[] = [
    {
      key: "member",
      label: "Member",
    },
    {
      key: "event",
      label: "Event",
    },
    {
      key: "lokasi",
      label: "Lokasi",
    },
    {
      key: "tanggal",
      label: "Tanggal Event",
    },
    {
      key: "hadir",
      label: "Waktu Absen",
    },
  ]

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <Card>
        <CardHeader>
          <CardTitle>
            Data Absensi
          </CardTitle>

          <CardDescription>
            Daftar absensi piket dan event member.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* TABS */}
      <Tabs
        value={tab}
        onValueChange={setTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="routine">
            Absensi Piket
          </TabsTrigger>

          <TabsTrigger value="event">
            Absensi Event
          </TabsTrigger>
        </TabsList>

        {/* ROUTINE */}
        <TabsContent
          value="routine"
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle>
                Absensi Piket
              </CardTitle>

              <CardDescription>
                Daftar absensi jadwal piket.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <DataTable
                columns={
                  routineColumns
                }
                data={
                  routineTableData
                }
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* EVENT */}
        <TabsContent
          value="event"
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle>
                Absensi Event
              </CardTitle>

              <CardDescription>
                Daftar absensi event.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <DataTable
                columns={
                  eventColumns
                }
                data={
                  eventTableData
                }
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}