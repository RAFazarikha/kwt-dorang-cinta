"use client"

import { useState } from "react"

import { createClient } from "@/lib/supabase/client"

import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { Textarea } from "@/components/ui/textarea"

export function EventForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] =
    useState("")

  const [eventDate, setEventDate] =
    useState("")

  const [location, setLocation] =
    useState("")

  const [imageUrl, setImageUrl] =
    useState("")

  const [isPublished, setIsPublished] =
    useState(true)

  const [loading, setLoading] =
    useState(false)

  const supabase = createClient()

  const handleSubmit = async () => {
    try {
      setLoading(true)

      const { error } = await supabase
        .from("events")
        .insert({
          title,
          description,
          event_date: eventDate,
          location,
          image_url: imageUrl,
          is_published: isPublished,
        })

      if (error) {
        alert(error.message)
        return
      }

      alert("Event berhasil dibuat")

      // reset
      setTitle("")
      setDescription("")
      setEventDate("")
      setLocation("")
      setImageUrl("")
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="rounded-2xl border-border shadow-sm">
      <CardContent className="space-y-6 p-6">
        <div>
          <h2 className="text-2xl font-bold text-primary">
            Tambah Event
          </h2>

          <p className="mt-2 text-muted-foreground">
            Buat event yang akan tampil
            pada landing page.
          </p>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label>Judul Event</Label>

          <Input
            placeholder="Masukkan judul event"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label>Deskripsi</Label>

          <Textarea
            placeholder="Masukkan deskripsi event"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />
        </div>

        {/* Date */}
        <div className="space-y-2">
          <Label>Tanggal Event</Label>

          <Input
            type="date"
            value={eventDate}
            onChange={(e) =>
              setEventDate(e.target.value)
            }
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label>Lokasi</Label>

          <Input
            placeholder="Masukkan lokasi event"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
          />
        </div>

        {/* Image URL */}
        <div className="space-y-2">
          <Label>Image URL</Label>

          <Input
            placeholder="Masukkan URL gambar"
            value={imageUrl}
            onChange={(e) =>
              setImageUrl(e.target.value)
            }
          />
        </div>

        {/* Published */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) =>
              setIsPublished(
                e.target.checked
              )
            }
          />

          <Label>Tampilkan di Landing Page</Label>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-primary hover:bg-secondary"
        >
          {loading
            ? "Menyimpan..."
            : "Simpan Event"}
        </Button>
      </CardContent>
    </Card>
  )
}