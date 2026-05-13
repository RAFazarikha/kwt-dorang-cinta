"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Textarea } from "@/components/ui/textarea"
import {
  CalendarDays,
  ImageIcon,
  MapPin,
  NotebookPen,
  Text,
} from "lucide-react"
import ImageUpload from "../ui/image-upload"

interface EventFormProps {
  initialData?: {
    id: string
    title: string
    description: string
    event_date: string
    location: string
    image_url: string
    is_published: boolean
  }
}

export function EventForm({
  initialData,
}: EventFormProps) {
  const router = useRouter()

  const [title, setTitle] = useState(
    initialData?.title || ""
  )

  const [description, setDescription] =
    useState(
      initialData?.description || ""
    )

  const [eventDate, setEventDate] =
    useState(
      initialData?.event_date || ""
    )

  const [location, setLocation] =
    useState(
      initialData?.location || ""
    )

  const [imageUrl, setImageUrl] =
    useState(
      initialData?.image_url || ""
    )

  const [isPublished, setIsPublished] =
    useState(
      initialData?.is_published ?? true
    )

  const [loading, setLoading] =
    useState(false)

  const supabase = createClient()

  const isEdit = !!initialData

  const handleSubmit = async () => {
    try {
      setLoading(true)

      const payload = {
        title,
        description,
        event_date: eventDate,
        location,
        image_url: imageUrl,
        is_published: isPublished,
      }

      if (isEdit) {
        const { error } = await supabase
          .from("events")
          .update(payload)
          .eq("id", initialData.id)

        if (error) {
          toast.error(error.message)
          return
        }

        toast.success(
          "Event berhasil diperbarui"
        )

        router.push("/admin")
      } else {
        const { error } = await supabase
          .from("events")
          .insert(payload)

        if (error) {
          toast.error(error.message)
          return
        }

        toast.success(
          "Event berhasil dibuat"
        )

        // reset form
        setTitle("")
        setDescription("")
        setEventDate("")
        setLocation("")
        setImageUrl("")
        setIsPublished(true)
      }

      router.refresh()
    } catch (error) {
      console.error(error)

      toast.error(
        "Terjadi kesalahan"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="rounded-2xl border-border shadow-sm">
      <CardContent className="space-y-8 p-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-primary">
            {isEdit
              ? "Edit Event"
              : "Tambah Event"}
          </h2>

          <p className="mt-2 text-muted-foreground">
            {isEdit
              ? "Perbarui data event."
              : "Buat event yang akan tampil pada landing page."}
          </p>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label>Judul Event</Label>

          <InputGroup>
            <InputGroupInput
              type="text"
              placeholder="Contoh: Workshop Hidroponik"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <InputGroupAddon>
              <Text />
            </InputGroupAddon>
          </InputGroup>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label>Deskripsi Event</Label>

          <div className="relative">
            <Textarea
              placeholder="Masukkan deskripsi event"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="min-h-30"
            />

            <NotebookPen
              className="absolute top-3 right-3 text-muted-foreground"
              size={18}
            />
          </div>
        </div>

        {/* Date & Location */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Date */}
          <div className="space-y-2">
            <Label>Tanggal Event</Label>

            <InputGroup>
              <InputGroupInput
                type="date"
                value={eventDate}
                onChange={(e) =>
                  setEventDate(
                    e.target.value
                  )
                }
              />

              <InputGroupAddon>
                <CalendarDays />
              </InputGroupAddon>
            </InputGroup>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label>Lokasi Event</Label>

            <InputGroup>
              <InputGroupInput
                placeholder="Masukkan lokasi"
                value={location}
                onChange={(e) =>
                  setLocation(
                    e.target.value
                  )
                }
              />

              <InputGroupAddon>
                <MapPin />
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>

        {/* Upload Gambar */}
        <div className="space-y-2">
          <label className="block text-sm font-medium mb-2">
            Upload Gambar Event
          </label>

          <ImageUpload
            value={imageUrl}
            onChange={(url) =>
              setImageUrl(url)
            }
            onRemove={() =>
              setImageUrl("")
            }
          />
        </div>

        {/* URL Gambar */}
        <div className="space-y-2">
          <Label>URL Gambar</Label>

          <InputGroup>
            <InputGroupInput
              placeholder="https://..."
              value={imageUrl}
              onChange={(e) =>
                setImageUrl(
                  e.target.value
                )
              }
              disabled
            />

            <InputGroupAddon>
              <ImageIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>

        {/* Published */}
        <div className="flex items-center gap-3 rounded-2xl border p-4">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) =>
              setIsPublished(
                e.target.checked
              )
            }
            className="h-4 w-4"
          />

          <Label className="cursor-pointer">
            Tampilkan di Landing Page
          </Label>
        </div>

        {/* Preview */}
        <div className="rounded-2xl bg-secondary/10 p-5">
          <h3 className="text-lg font-semibold text-primary">
            Preview Event
          </h3>

          <div className="mt-4 space-y-2">
            <p>
              <span className="font-medium">
                Judul:
              </span>{" "}
              {title || "-"}
            </p>

            <p>
              <span className="font-medium">
                Tanggal:
              </span>{" "}
              {eventDate || "-"}
            </p>

            <p>
              <span className="font-medium">
                Lokasi:
              </span>{" "}
              {location || "-"}
            </p>

            <p>
              <span className="font-medium">
                Status:
              </span>{" "}
              {isPublished
                ? "Dipublikasikan"
                : "Draft"}
            </p>
          </div>
        </div>

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-primary hover:bg-secondary"
        >
          {loading
            ? "Menyimpan..."
            : isEdit
            ? "Update Event"
            : "Simpan Event"}
        </Button>
      </CardContent>
    </Card>
  )
}