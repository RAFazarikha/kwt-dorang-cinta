import type { ReactNode } from "react"

export default function UserLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl p-6">
        {children}
      </div>
    </div>
  )
}