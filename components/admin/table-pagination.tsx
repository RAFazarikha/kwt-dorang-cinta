"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

interface Props {
  page: number
  hasNextPage: boolean
}

export function TablePagination({
  page,
  hasNextPage,
}: Props) {
  const router = useRouter()

  return (
    <div className="flex items-center justify-end gap-3">
      <Button
        variant="outline"
        disabled={page <= 1}
        onClick={() =>
          router.push(
            `/admin?page=${page - 1}`
          )
        }
      >
        Previous
      </Button>

      <Button
        variant="outline"
        disabled={!hasNextPage}
        onClick={() =>
          router.push(
            `/admin?page=${page + 1}`
          )
        }
      >
        Next
      </Button>
    </div>
  )
}