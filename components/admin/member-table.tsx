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
  CardDescription,
} from "@/components/ui/card"

import {
  MoreHorizontal,
  Pencil,
  Users,
} from "lucide-react"

import { DataTable } from "@/components/admin/data-table"

import { MemberDeleteButton } from "@/components/admin/member-delete-button"

interface Member {
  id: string
  full_name: string
  phone_number: string | null
  role: string | null
  joined_at: string | null
}

interface MemberTableProps {
  members: Member[]
}

export function MemberTable({
  members,
}: MemberTableProps) {

  // =========================
  // SUMMARY
  // =========================

  const totalMembers =
    members.filter(
      (member) =>
        member.role === "member"
    ).length

  const totalAdmins =
    members.filter(
      (member) =>
        member.role === "admin"
    ).length

  // =========================
  // TABLE DATA
  // =========================

  const tableData =
    members.map((member) => ({
      nama:
        member.full_name,

      telepon:
        member.phone_number ||
        "-",

      role:
        member.role || "-",

      bergabung:
        member.joined_at
          ? new Date(
              member.joined_at
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
                  href={`/admin/member/${member.id}`}
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
                <MemberDeleteButton
                  anggotaId={member.id}
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
      key: "nama",
      label: "Nama",
    },
    {
      key: "telepon",
      label: "No. Telepon",
    },
    {
      key: "role",
      label: "Role",
    },
    {
      key: "bergabung",
      label: "Tanggal Bergabung",
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
        <Card className="w-full rounded-2xl border-border shadow-sm transition hover:border-primary">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-muted-foreground">
                Total Anggota
              </p>

              <h2 className="mt-2 text-4xl font-bold text-primary">
                {totalMembers}
              </h2>
              <CardDescription>
                Jumlah seluruh anggota aktif
              </CardDescription>
            </div>

            <div className="rounded-full bg-accent/50 p-4">
              <Users className="h-10 w-10 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="w-full rounded-2xl border-border shadow-sm transition hover:border-primary">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-muted-foreground">
                Total Admin
              </p>

              <h2 className="mt-2 text-4xl font-bold text-primary">
                {totalAdmins}
              </h2>
              <CardDescription>
                Jumlah seluruh admin
              </CardDescription>
            </div>

            <div className="rounded-full bg-accent/50 p-4">
              <Users className="h-10 w-10 text-primary" />
            </div>
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