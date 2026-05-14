import Link from "next/link"

import { createClient } from "@/lib/supabase/server"

import { logoutAction } from "@/app/(auth)/actions"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import { Button, buttonVariants } from "@/components/ui/button"

import {
  CalendarCheck,
  ClipboardList,
  LogOut,
  User,
} from "lucide-react"

export default async function UserPage() {
  const supabase = await createClient()

  // =========================
  // GET AUTH USER
  // =========================
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let fullName = "Member"

  // =========================
  // GET MEMBER DATA
  // =========================
  if (user) {
    const { data: member } = await supabase
      .from("members")
      .select("full_name")
      .eq("id", user.id)
      .maybeSingle()

    if (member) {
      fullName = member.full_name
    }
  }

  return (
    <main className="min-h-screen bg-muted/40">
      <div className="mx-auto flex min-h-screen max-w-md flex-col p-4">

        {/* HEADER */}
        <div className="mb-6 rounded-3xl bg-primary p-5 text-primary-foreground shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
              <User className="h-7 w-7" />
            </div>

            <div className="flex-1">
              <p className="text-sm opacity-80">
                Selamat Datang
              </p>

              <h1 className="line-clamp-1 text-2xl font-bold">
                {fullName}
              </h1>
            </div>
          </div>
        </div>

        {/* MENU */}
        <div className="space-y-4">

          {/* ABSENSI PIKET */}
          <Card className="rounded-3xl border-none shadow-sm">
            <CardHeader className="pb-3">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <ClipboardList className="h-6 w-6 text-primary" />
              </div>

              <CardTitle>
                Absensi Piket
              </CardTitle>

              <CardDescription>
                Lakukan absensi jadwal piket harian.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Link href="/user/absensi-piket" className={buttonVariants({ className: "h-11 w-full rounded-2xl" })}>
                Buka Absensi
              </Link>
            </CardContent>
          </Card>

          {/* ABSENSI EVENT */}
          <Card className="rounded-3xl border-none shadow-sm">
            <CardHeader className="pb-3">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <CalendarCheck className="h-6 w-6 text-primary" />
              </div>

              <CardTitle>
                Absensi Event
              </CardTitle>

              <CardDescription>
                Lakukan absensi event hari ini.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Link href="/user/absensi-event" className={buttonVariants({ className: "h-11 w-full rounded-2xl" })}>
                Buka Absensi
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* LOGOUT */}
        <div className="mt-auto pt-6">
          <Button
            type="submit"
            variant="destructive"
            onClick={logoutAction}
            className="h-11 w-full rounded-2xl"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </main>
  )
}