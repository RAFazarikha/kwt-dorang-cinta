import { createClient } from "@/lib/supabase/server"
import { ProductTable } from "@/components/admin/product-table"
import { TransactionTable } from "@/components/admin/transaksi-table"
import { EventTable } from "@/components/admin/event-table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { TablePagination } from "@/components/admin/table-pagination"
import {
  CalendarDays,
  Receipt,
  Sprout,
  Users,
  ClipboardCheck,
  CalendarClock,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { MemberTable } from "@/components/admin/member-table"
import { ScheduleTable } from "@/components/admin/schedule-table"
import { AttendancesTable } from "@/components/admin/attendances-table"

export interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  location: string | null;
  image_url: string | null;
  is_published: boolean | null;
  created_at: string | null;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number | null;
  image_url: string | null;
  created_at: string | null;
}

export interface Transaction {
  id: string;
  buyer_name: string;
  product_id: string | null;
  quantity: number;
  unit_price: number;
  total_price: number | null;
  transaction_date: string | null;
}

// Gunakan ini untuk data transaksi yang di-fetch beserta data produknya
export interface TransactionWithProduct extends Transaction {
  products?: {
    name: string;
    // Tambahkan properti produk lain jika Anda me-select lebih dari sekadar nama
  } | null;
}

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string
    search?: string
  }>
}) {

  const params = await searchParams

  const page = Number(params.page) || 1
  const search = params.search || ""

  const limit = 5

  const from = (page - 1) * limit
  const to = from + limit - 1

  const supabase = await createClient()

  // =========================
  // STATISTICS
  // =========================
  const [
    productsResult,
    transactionsResult,
    eventsResult,
    membersResult,
    schedulesResult,
  ] = await Promise.all([
    supabase
      .from("products")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("transactions")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("events")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("members")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("duty_schedules")
      .select("*", {
        count: "exact",
        head: true,
      }),
  ])

  // =========================
  // FETCH PRODUCTS
  // =========================
  let query = supabase
    .from("products")
    .select("*", {
      count: "exact",
    })

  // search
  if (search) {
    query = query.ilike(
      "name",
      `%${search}%`
    )
  }

  const {
    data: products,
    count,
  } = await query
    .range(from, to)
    .order("created_at", {
      ascending: false,
    })

  // =========================
  // FETCH TRANSACTIONS
  // =========================
  const { data: transactions } =
    await supabase
      .from("transactions")
      .select(`
        *,
        products (
          name
        )
      `)
      .order("transaction_date", {
        ascending: false,
      })

  // =========================
  // FETCH EVENTS
  // =========================
  const { data: events } =
    await supabase
      .from("events")
      .select("*")
      .order("event_date", {
        ascending: false,
      })

  // =========================
  // FETCH MEMBERS
  // =========================

  const { data: members } =
    await supabase
      .from("members")
      .select("*")
      .order("joined_at", {
        ascending: false,
      })

  // =========================
  // ROUTINE ATTENDANCES
  // =========================
  const {
    data: rawRoutineAttendances,
  } = await supabase
    .from("routine_attendances")
    .select(`
      id,
      duty_date,
      status,
      notes,
      members (
        full_name
      ),
      duty_schedules (
        shift_time
      )
    `)
    .order("duty_date", {
      ascending: false,
    })

  // Format datanya di sini:
  const routineAttendances = rawRoutineAttendances?.map((item) => ({
    ...item,
    // Ambil elemen pertama jika bentuknya array
    members: Array.isArray(item.members) ? item.members[0] : item.members,
    duty_schedules: Array.isArray(item.duty_schedules) ? item.duty_schedules[0] : item.duty_schedules,
  })) || []

  // =========================
  // EVENT ATTENDANCES
  // =========================
  const {
    data: rawEventAttendances,
  } = await supabase
    .from("event_attendances")
    .select(`
      id,
      attended_at,
      members (
        full_name
      ),
      events (
        title,
        location,
        event_date
      )
    `)
    .order("attended_at", {
      ascending: false,
    })

  // Format datanya di sini:
  const eventAttendances = rawEventAttendances?.map((item) => ({
    ...item,
    // Ambil elemen pertama jika bentuknya array
    members: Array.isArray(item.members) ? item.members[0] : item.members,
    events: Array.isArray(item.events) ? item.events[0] : item.events,
  })) || []

  // =========================
  // FETCH SCHEDULES
  // =========================

  const { data: schedules } =
    await supabase
      .from("duty_schedules")
      .select(`
        *,
        members (
          full_name
        )
      `)
      .order("created_at", {
        ascending: false,
      })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-primary">
          Dashboard Admin
        </h1>

        <p className="mt-2 text-muted-foreground">
          Kelola seluruh data KWT Dorang Cinta.
        </p>
      </div>

      <Tabs
        defaultValue="products"
        className="space-y-6"
        >
        <TabsList className="grid h-auto! w-full grid-cols-1 gap-6 bg-transparent p-0 md:grid-cols-2 xl:grid-cols-3">

          {/* PRODUK */}
          <TabsTrigger
            value="products"
            className="h-auto! border-0 bg-transparent p-0 data-[state=active]:bg-transparent"
          >
            <Card className="w-full rounded-2xl border-border shadow-sm transition hover:border-primary">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-muted-foreground">
                    Total Produk
                  </p>

                  <h2 className="mt-2 text-4xl font-bold text-primary">
                    {productsResult.count || 0}
                  </h2>
                </div>

                <div className="rounded-full bg-accent/50 p-4">
                  <Sprout className="h-10 w-10 text-primary" />
                </div>
              </CardContent>
            </Card>
          </TabsTrigger>

          {/* TRANSAKSI */}
          <TabsTrigger
            value="transactions"
            className="h-auto! border-0 bg-transparent p-0 data-[state=active]:bg-transparent"
          >
            <Card className="w-full rounded-2xl border-border shadow-sm transition hover:border-primary">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-muted-foreground">
                    Total Transaksi
                  </p>

                  <h2 className="mt-2 text-4xl font-bold text-primary">
                    {transactionsResult.count || 0}
                  </h2>
                </div>

                <div className="rounded-full bg-accent/50 p-4">
                  <Receipt className="h-10 w-10 text-primary" />
                </div>
              </CardContent>
            </Card>
          </TabsTrigger>

          {/* EVENT */}
          <TabsTrigger
            value="events"
            className="h-auto! border-0 bg-transparent p-0 data-[state=active]:bg-transparent"
          >
            <Card className="w-full rounded-2xl border-border shadow-sm transition hover:border-primary">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-muted-foreground">
                    Total Event
                  </p>

                  <h2 className="mt-2 text-4xl font-bold text-primary">
                    {eventsResult.count || 0}
                  </h2>
                </div>

                <div className="rounded-full bg-accent/50 p-4">
                  <CalendarDays className="h-10 w-10 text-primary" />
                </div>
              </CardContent>
            </Card>
          </TabsTrigger>

          {/* MEMBER */}
          <TabsTrigger
            value="members"
            className="h-auto! border-0 bg-transparent p-0 data-[state=active]:bg-transparent"
          >
            <Card className="w-full rounded-2xl border-border shadow-sm transition hover:border-primary">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-muted-foreground">
                    Total Anggota
                  </p>

                  <h2 className="mt-2 text-4xl font-bold text-primary">
                    {membersResult.count || 0}
                  </h2>
                </div>

                <div className="rounded-full bg-accent/50 p-4">
                  <Users className="h-10 w-10 text-primary" />
                </div>
              </CardContent>
            </Card>
          </TabsTrigger>

          {/* ABSENSI */}
          <TabsTrigger
            value="attendances"
            className="h-auto! border-0 bg-transparent p-0 data-[state=active]:bg-transparent"
          >
            <Card className="w-full h-full rounded-2xl border-border shadow-sm transition hover:border-primary">
              <CardContent className="flex h-full items-center justify-between p-6">
                <div>
                  <h2 className="text-3xl font-bold text-primary">
                    Data Absensi
                  </h2>

                  <p className="mt-3 text-muted-foreground">
                    Absensi Piket dan Event
                  </p>
                </div>

                <div className="rounded-full bg-accent/50 p-4">
                  <ClipboardCheck className="h-10 w-10 text-primary" />
                </div>
              </CardContent>
            </Card>
          </TabsTrigger>

          {/* JADWAL PIKET */}
          <TabsTrigger
            value="schedules"
            className="h-auto! border-0 bg-transparent p-0 data-[state=active]:bg-transparent"
          >
            <Card className="w-full rounded-2xl border-border shadow-sm transition hover:border-primary">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-muted-foreground">
                    Jadwal Piket
                  </p>

                  <h2 className="mt-2 text-4xl font-bold text-primary">
                    {schedulesResult.count || 0}
                  </h2>
                </div>

                <div className="rounded-full bg-accent/50 p-4">
                  <CalendarClock className="h-10 w-10 text-primary" />
                </div>
              </CardContent>
            </Card>
          </TabsTrigger>
          </TabsList>

        <TabsContent value="products">
          <ProductTable
            products={products || []}
          />
        </TabsContent>

        <TabsContent value="transactions">
          <TransactionTable
            transactions={transactions || []}
          />
        </TabsContent>

        <TabsContent value="events">
          <EventTable
            events={events || []}
          />
        </TabsContent>

        <TabsContent value="members">
          <MemberTable
            members={members || []}
          />
        </TabsContent>

        <TabsContent value="attendances">
          <AttendancesTable
            routineAttendances={
              routineAttendances || []
            }
            eventAttendances={
              eventAttendances || []
            }
          />
        </TabsContent>

        <TabsContent value="schedules">
          <ScheduleTable
            schedules={schedules || []}
          />
        </TabsContent>

        {/* Pagination */}
        <TablePagination
          page={page}
          hasNextPage={
            (count || 0) > page * limit
          }
        />
      </Tabs>
    </div>
  )
}