"use client"

import Link from "next/link"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Button,
  buttonVariants,
} from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import {
  CalendarClock,
  MoreHorizontal,
  Pencil,
  Users,
} from "lucide-react"

import { DataTable } from "@/components/admin/data-table"

import { ScheduleDeleteButton } from "@/components/admin/schedule-delete-button"

interface Schedule {
  id: string
  day_of_week: number | null
  shift_time: string | null
  created_at: string | null

  members?: {
    full_name: string
  } | null
}

interface ScheduleTableProps {
  schedules: Schedule[]
}

export function ScheduleTable({
  schedules,
}: ScheduleTableProps) {

  const totalSchedules =
    schedules.length

  const uniqueMembers =
    new Set(
      schedules.map(
        (schedule) =>
          schedule.members
            ?.full_name
      )
    ).size

  const dayLabels: Record<number, string> = {
    1: "Senin",
    2: "Selasa",
    3: "Rabu",
    4: "Kamis",
    5: "Jumat",
    6: "Sabtu",
    7: "Minggu",
  }

  const tableData =
    schedules.map((schedule) => ({
      anggota:
        schedule.members
          ?.full_name || "-",

      hari:
        schedule.day_of_week
          ? dayLabels[
              schedule.day_of_week
            ]
          : "-",

      shift_time:
        schedule.shift_time || "-",

      dibuat:
        schedule.created_at
          ? new Date(
              schedule.created_at
            ).toLocaleDateString(
              "id-ID"
            )
          : "-",

      action: (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                size="icon"
                variant="ghost"
              >
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            }
          />

          <DropdownMenuContent align="end">

            <DropdownMenuItem
              render={
                <Link
                  href={`/admin/schedule/${schedule.id}`}
                  className={buttonVariants({
                    variant:
                      "outline",
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
                <ScheduleDeleteButton
                  jadwalId={
                    schedule.id
                  }
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
      key: "anggota",
      label: "Anggota",
    },
    {
      key: "hari",
      label: "Hari",
    },
    {
      key: "shift_time",
      label: "Shift",
    },
    {
      key: "dibuat",
      label: "Dibuat",
    },
    {
      key: "action",
      label: "Action",
    },
  ]

  return (
    <div className="space-y-4">

      {/* SUMMARY */}
      <div className="grid gap-4 md:grid-cols-2">

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Jadwal
            </CardTitle>

            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">
              {totalSchedules}
            </div>

            <CardDescription>
              Total seluruh jadwal piket
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Anggota
            </CardTitle>

            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">
              {uniqueMembers}
            </div>

            <CardDescription>
              Anggota yang terjadwal
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* TABLE */}
      <DataTable
        columns={columns}
        data={tableData}
      />
    </div>
  )
}