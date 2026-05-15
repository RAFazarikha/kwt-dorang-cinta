import Image from "next/image"

import {
  CalendarDays,
  MapPin,
  ArrowUpRight,
} from "lucide-react"

import { createClient } from "@/lib/supabase/server"

import { Button, buttonVariants } from "@/components/ui/button"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import Link from "next/link"

interface EventSectionProps {
  isHome?: boolean
}

export default async function EventSection({
  isHome = false,
}: EventSectionProps) {
  const supabase =
    await createClient()

  const now = new Date()

  const todayDate = now
    .toLocaleDateString("en-CA")

  // =========================
  // FETCH EVENTS
  // =========================
  let query = supabase
    .from("events")
    .select("*")
    .eq("is_published", true)
    .gte("event_date", todayDate)
    .order("event_date", {
      ascending: true,
    })

  if (isHome) {
    query = query.limit(6)
  }

  const {
    data: events,
  } = await query

  return (
    <section className="custom bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <CalendarDays className="h-4 w-4" />
            Event & Kegiatan
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-primary md:text-5xl">
            Kegiatan Bersama
            <span className="block">
              KWT Dorang Cinta
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Ikuti berbagai kegiatan urban farming,
            edukasi hidroponik, dan program
            pemberdayaan masyarakat bersama
            komunitas kami.
          </p>
        </div>

        {/* Event Grid */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {events?.map((event) => (
            <Card
              key={event.id}
              className="group overflow-hidden rounded-xl border border-border bg-card py-0! shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={
                    event.image_url ||
                    "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1200"
                  }
                  alt={event.title}
                  fill
                  sizes="100"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

                {/* Date Badge */}
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-primary backdrop-blur">
                  {new Date(
                    event.event_date
                  ).toLocaleDateString(
                    "id-ID",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </div>
              </div>

              {/* Content */}
              <CardContent className="space-y-5 p-6">
                {/* Title */}
                <div>
                  <h3 className="capitalize line-clamp-2 text-2xl font-semibold text-foreground transition-colors group-hover:text-primary">
                    {event.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 leading-7 text-muted-foreground">
                    {event.description}
                  </p>
                </div>

                {/* Meta */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4 text-primary" />

                    <span>
                      {new Date(
                        event.event_date
                      ).toLocaleDateString(
                        "id-ID",
                        {
                          weekday:
                            "long",
                          day: "numeric",
                          month:
                            "long",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />

                    <span>
                      {event.location}
                    </span>
                  </div>
                </div>

                {/* Action */}
                <Button
                  variant="ghost"
                  className="group/button h-auto p-0 text-primary hover:bg-transparent hover:text-secondary"
                >
                  Lihat Detail

                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1 group-hover/button:-translate-y-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {!events?.length && (
          <div className="rounded-2xl border border-dashed border-border bg-muted/20 py-20 text-center">
            <CalendarDays className="mx-auto h-14 w-14 text-muted-foreground" />

            <h3 className="mt-6 text-2xl font-semibold text-foreground">
              Belum Ada Event
            </h3>

            <p className="mt-3 text-muted-foreground">
              Event dan kegiatan terbaru akan
              segera diumumkan.
            </p>
          </div>
        )}

        {/* CTA */}
        {isHome &&events && events.length > 0 && (
          <div className="mt-16 flex justify-center">
            <Link href="/events"
                className={buttonVariants({ variant: "default", size: "default", className: "h-12 rounded-xl bg-primary px-8 text-white hover:bg-secondary" })}>
              Lihat Semua Event
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}