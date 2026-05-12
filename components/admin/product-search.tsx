"use client"

import { useRouter, useSearchParams } from "next/navigation"

import { Input } from "@/components/ui/input"

export function ProductSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSearch = (
    value: string
  ) => {
    const params = new URLSearchParams(
      searchParams.toString()
    )

    if (value) {
      params.set("search", value)
    } else {
      params.delete("search")
    }

    router.push(`/admin?${params.toString()}`)
  }

  return (
    <Input
      placeholder="Cari produk..."
      onChange={(e) =>
        handleSearch(e.target.value)
      }
      className="max-w-sm"
    />
  )
}