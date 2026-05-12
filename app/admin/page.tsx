import { createClient } from "@/lib/supabase/server"
import Link from "next/link"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Image from "next/image"
import { ProductDeleteButton } from "@/components/admin/product-delete-button"
import { ProductSearch } from "@/components/admin/product-search"
import { DataTable } from "@/components/admin/data-table"
import { TablePagination } from "@/components/admin/table-pagination"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CalendarDays, MoreHorizontal, Pencil, Receipt, Sprout } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

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
  // TABLE DATA
  // =========================
  const productTableData =
    products?.map((product) => ({
      nama: product.name,

      harga: `Rp ${Number(
        product.price
      ).toLocaleString("id-ID")}`,

      stok: product.stock,

      gambar: (
        <Image
          width={56}
          height={56}
          src={product.image_url}
          alt={product.name}
          className="h-14 w-14 rounded-lg object-cover"
        />
      ),

      action: (
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button
              size="icon"
              variant="ghost"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          }>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem render={
              <Link
                href={`/admin/product/${product.id}`}
                className={buttonVariants({ variant: "outline", className: "w-full justify-start" })}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Link>
            }>
            </DropdownMenuItem>

            <DropdownMenuItem className="text-red-600" render={
              <ProductDeleteButton
                id={product.id}
              />
            }>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    })) || []

  // =========================
  // TRANSACTION TABLE DATA
  // =========================
  const transactionTableData =
    transactions?.map((transaction) => ({
      pembeli: transaction.buyer_name,

      produk:
        transaction.products?.name ||
        "-",

      qty: transaction.quantity,

      total: `Rp ${Number(
        transaction.total_price
      ).toLocaleString("id-ID")}`,

      tanggal: transaction.transaction_date
        ? new Date(
            transaction.transaction_date
          ).toLocaleDateString("id-ID")
        : "-",
    })) || []

  // =========================
  // EVENT TABLE DATA
  // =========================
  const eventTableData =
    events?.map((event) => ({
      judul: event.title,

      lokasi: event.location || "-",

      tanggal: new Date(
        event.event_date
      ).toLocaleDateString("id-ID"),

      status: event.is_published
        ? "Published"
        : "Draft",
    })) || []

  // =========================
  // TABLE COLUMNS
  // =========================
  type ProductTableItem = typeof productTableData[0];

  const productColumns: { key: keyof ProductTableItem; label: string }[] = [
    {
      key: "nama",
      label: "Nama Produk",
    },
    {
      key: "harga",
      label: "Harga",
    },
    {
      key: "stok",
      label: "Stok",
    },
    {
      key: "gambar",
      label: "Gambar",
    },
    {
      key: "action",
      label: "Action",
    },
  ]

  type TransactionTableItem =
    typeof transactionTableData[0]

  const transactionColumns: {
    key: keyof TransactionTableItem
    label: string
  }[] = [
    {
      key: "pembeli",
      label: "Pembeli",
    },
    {
      key: "produk",
      label: "Produk",
    },
    {
      key: "qty",
      label: "Qty",
    },
    {
      key: "total",
      label: "Total",
    },
    {
      key: "tanggal",
      label: "Tanggal",
    },
  ]

  type EventTableItem =
    typeof eventTableData[0]

  const eventColumns: {
    key: keyof EventTableItem
    label: string
  }[] = [
    {
      key: "judul",
      label: "Judul Event",
    },
    {
      key: "lokasi",
      label: "Lokasi",
    },
    {
      key: "tanggal",
      label: "Tanggal",
    },
    {
      key: "status",
      label: "Status",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-primary">
          Dashboard Produk
        </h1>

        <p className="mt-2 text-muted-foreground">
          Kelola produk KWT Dorang Cinta.
        </p>
      </div>

      <Tabs
        defaultValue="products"
        className="space-y-6"
        >
        <TabsList className="grid h-auto! w-full grid-cols-1 gap-6 bg-transparent p-0 md:grid-cols-2 xl:grid-cols-3">
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

                <div className="rounded-full bg-secondary/10 p-4">
                  <Receipt className="h-7 w-7 text-primary" />
                </div>
              </CardContent>
            </Card>
          </TabsTrigger>
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

                <div className="rounded-full bg-secondary/10 p-4">
                  <CalendarDays className="h-7 w-7 text-primary" />
                </div>
              </CardContent>
            </Card>
          </TabsTrigger>
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

                <div className="rounded-full bg-secondary/10 p-4">
                  <Sprout className="h-7 w-7 text-primary" />
                </div>
              </CardContent>
            </Card>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          {/* Search + Button */}
          <div className="mb-3 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <ProductSearch />

            <Link href="/admin/product">
              <Button className="bg-primary hover:bg-secondary">
                Tambah Produk
              </Button>
            </Link>
          </div>

          <DataTable
            columns={productColumns}
            data={productTableData}
          />
        </TabsContent>

        <TabsContent value="transactions">
          <DataTable
            columns={transactionColumns}
            data={transactionTableData}
          />
        </TabsContent>

        <TabsContent value="events">
          <DataTable
            columns={eventColumns}
            data={eventTableData}
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