"use client"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
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
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
} from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  MoreHorizontal,
  Pencil,
} from "lucide-react"
import { DataTable } from "@/components/admin/data-table"
import { TransactionDeleteButton } from "@/components/admin/transaksi-delete-button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Transaction {
  id: string
  buyer_name: string
  quantity: number
  total_price: number | null
  transaction_date: string | null

  products?: {
    name: string
  } | null
}

interface TransactionTableProps {
  transactions: Transaction[]
}

export function TransactionTable({
  transactions,
}: TransactionTableProps) {

  const router = useRouter()

  const searchParams =
    useSearchParams()

  const selectedMonth =
    searchParams.get("month") || "all"

  const currentYear =
    new Date().getFullYear()

  const selectedYear =
    searchParams.get("year") ||
    String(currentYear)

  const selectedProduct =
    searchParams.get("product") || "all"

  // =========================
  // FILTER OPTIONS
  // =========================

  const uniqueProducts = [
    ...new Set(
      transactions.map(
        (t) =>
          t.products?.name || "-"
      )
    ),
  ]

  const uniqueYears = [
    ...new Set(
      transactions.map((t) =>
        t.transaction_date
          ? new Date(
              t.transaction_date
            ).getFullYear()
          : null
      )
    ),
  ].filter(Boolean)

  // =========================
  // HANDLE FILTER
  // =========================

  const updateFilter = (
    key: string,
    value: string | null
  ) => {

    const params =
      new URLSearchParams(
        searchParams.toString()
      )

    params.set(key, value ? value : "all")

    router.push(
      `?${params.toString()}`
    )
  }

  // =========================
  // FILTER DATA
  // =========================

  const filteredTransactions =
    transactions.filter(
      (transaction) => {

        const date =
          transaction.transaction_date
            ? new Date(
                transaction.transaction_date
              )
            : null

        const month = date
          ? String(
              date.getMonth() + 1
            ).padStart(2, "0")
          : null

        const year = date
          ? String(
              date.getFullYear()
            )
          : null

        const product =
          transaction.products?.name ||
          "-"

        const matchMonth =
          selectedMonth === "all" ||
          month === selectedMonth

        const matchYear =
          selectedYear === "all" ||
          year === selectedYear

        const matchProduct =
          selectedProduct === "all" ||
          product === selectedProduct

        return (
          matchMonth &&
          matchYear &&
          matchProduct
        )
      }
    )

  // =========================
  // CHART DATA
  // =========================

  const chartData = (() => {

    // FILTER BULAN
    if (selectedMonth !== "all") {

      const weeklyData = [
        {
          label: "Minggu 1",
          total: 0,
        },
        {
          label: "Minggu 2",
          total: 0,
        },
        {
          label: "Minggu 3",
          total: 0,
        },
        {
          label: "Minggu 4",
          total: 0,
        },
        {
          label: "Minggu 5",
          total: 0,
        },
      ]

      filteredTransactions.forEach(
        (transaction) => {

          if (
            !transaction.transaction_date
          )
            return

          const date = new Date(
            transaction.transaction_date
          )

          const day = date.getDate()

          const weekIndex =
            Math.floor(
              (day - 1) / 7
            )

          weeklyData[
            weekIndex
          ].total +=
            transaction.total_price || 0
        }
      )

      return weeklyData
    }

    // FILTER TAHUN
    const monthlyData = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ].map((month) => ({
      label: month,
      total: 0,
    }))

    filteredTransactions.forEach(
      (transaction) => {

        if (
          !transaction.transaction_date
        )
          return

        const date = new Date(
          transaction.transaction_date
        )

        const month =
          date.getMonth()

        monthlyData[
          month
        ].total +=
          transaction.total_price || 0
      }
    )

    return monthlyData
  })()

  const chartConfig = {
    total: {
      label: "Total Transaksi",
    },
  }

  // =========================
  // TABLE DATA
  // =========================

  const tableData =
    filteredTransactions.map(
      (transaction) => ({
        pembeli:
          transaction.buyer_name,

        produk:
          transaction.products?.name ||
          "-",

        qty: transaction.quantity,

        total: `Rp ${Number(
          transaction.total_price
        ).toLocaleString(
          "id-ID"
        )}`,

        tanggal:
          transaction.transaction_date
            ? new Date(
                transaction.transaction_date
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
                    href={`/admin/transaksi/${transaction.id}`}
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
                  <TransactionDeleteButton
                    transaksiId={
                      transaction.id
                    }
                  />
                }
              />
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      })
    ) || []

  type TableItem =
    typeof tableData[0]

  const columns: {
    key: keyof TableItem
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
    {
      key: "action",
      label: "Action",
    },
  ]

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>
            Grafik Transaksi
          </CardTitle>

          <CardDescription>
            {selectedProduct === "all"
              ? "Semua Produk"
              : selectedProduct}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="h-87.5 w-full"
          >
            <LineChart
              accessibilityLayer
              data={chartData}
            >
              <CartesianGrid
                vertical={false}
              />

              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />

              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent />
                }
              />

              <Line
                type="monotone"
                dataKey="total"
                stroke="var(--chart-1)"
                strokeWidth={3}
                dot={{
                  fill: "var(--chart-4)",
                  strokeWidth: 2,
                  r: 5,
                }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* FILTER */}
      <div className="grid gap-6 md:grid-cols-3">

        {/* BULAN */}
        <Select
          value={selectedMonth}
          onValueChange={(value) =>
            updateFilter(
              "month",
              value
            )
          }
        >
          <SelectTrigger className={'w-full px-4 border-primary'}>
            <SelectValue placeholder="Pilih Bulan" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all" className={'px-4'}>
              Semua Bulan
            </SelectItem>

            {Array.from({
              length: 12,
            }).map((_, index) => {

              const value = String(
                index + 1
              ).padStart(2, "0")

              return (
                <SelectItem
                  key={value}
                  value={value}
                  className={'px-4'}
                >
                  Bulan {index + 1}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>

        {/* TAHUN */}
        <Select
          value={selectedYear}
          onValueChange={(value) =>
            updateFilter(
              "year",
              value
            )
          }
        >
          <SelectTrigger className={'w-full px-4 border-primary'}>
            <SelectValue placeholder="Pilih Tahun" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all" className={'px-4'}>
              Semua Tahun
            </SelectItem>

            {uniqueYears.map((year) => (
              <SelectItem
                key={year}
                value={String(year)}
                className={'px-4'}
              >
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* PRODUK */}
        <Select
          value={selectedProduct}
          onValueChange={(value) =>
            updateFilter(
              "product",
              value
            )
          }
        >
          <SelectTrigger className={'w-full px-4 border-primary'}>
            <SelectValue placeholder="Pilih Produk" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all" className={'px-4'}>
              Semua Produk
            </SelectItem>

            {uniqueProducts.map(
              (product) => (
                <SelectItem
                  key={product}
                  value={product}
                  className={'px-4'}
                >
                  {product}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>

      {/* TABLE */}
      <DataTable
        columns={columns}
        data={tableData}
      />
    </div>
  )
}