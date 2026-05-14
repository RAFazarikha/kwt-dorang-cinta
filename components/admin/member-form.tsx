"use client"

import { useState } from "react"

import { useRouter } from "next/navigation"

import { toast } from "sonner"

import {
  createMember,
  updateMember,
} from "@/app/admin/actions/member-actions"

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

import {
  User,
  Phone,
  Shield,
  Users,
  Mail,
  KeyRound,
} from "lucide-react"

interface MemberFormProps {
  initialData?: {
    id: string
    full_name: string
    email: string
    password: string
    phone_number: string | null
    role: string | null
  }
}

export default function MemberForm({
  initialData,
}: MemberFormProps) {

  const router = useRouter()

  // =========================
  // STATE
  // =========================

  const [fullName, setFullName] =
    useState(
      initialData?.full_name || ""
    )

  const [email, setEmail] =
    useState(
      initialData?.email || ""
    )

  const [password, setPassword] =
  useState(
    initialData?.password || ""
  )

  const [phoneNumber, setPhoneNumber] =
    useState(
      initialData?.phone_number || ""
    )

  const [role, setRole] =
    useState(
      initialData?.role || "member"
    )

  const [loading, setLoading] =
    useState(false)

  const isEdit = !!initialData

  // =========================
  // HANDLE SUBMIT
  // =========================

  const handleSubmit = async () => {

    try {
      setLoading(true)

      const payload = {
        full_name: fullName,
        email: email,
        password: password,
        phone_number: phoneNumber,
        role,
      }

      if (isEdit) {

        await updateMember(
          initialData.id,
          payload
        )

        toast.success(
          "Member berhasil diperbarui"
        )

        router.push("/admin/member")

      } else {

        await createMember(payload)

        toast.success(
          "Member berhasil ditambahkan"
        )

        // RESET FORM
        setFullName("")
        setPhoneNumber("")
        setEmail("")
        setPassword("")
        setRole("member")
      }

      router.refresh()

    } catch (error: unknown) {

      console.error(error)

      const message =
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan"

      toast.error(message)

    } finally {

      setLoading(false)
    }
  }

  return (
    <Card className="rounded-2xl border-border shadow-sm">
      <CardContent className="space-y-8 p-6">

        {/* HEADER */}
        <div>
          <h2 className="text-2xl font-bold text-primary">
            {isEdit
              ? "Edit Member"
              : "Tambah Member"}
          </h2>

          <p className="mt-2 text-muted-foreground">
            {isEdit
              ? "Perbarui data member."
              : "Input data member baru."}
          </p>
        </div>

        {/* FULL NAME */}
        <div className="space-y-2">
          <Label>Nama Lengkap</Label>

          <InputGroup>
            <InputGroupInput
              placeholder="Masukkan nama lengkap"
              value={fullName}
              onChange={(e) =>
                setFullName(
                  e.target.value
                )
              }
            />

            <InputGroupAddon>
              <User />
            </InputGroupAddon>
          </InputGroup>
        </div>

        {/* PHONE NUMBER */}
        <div className="space-y-2">
          <Label>No. Telepon</Label>

          <InputGroup>
            <InputGroupInput
              placeholder="Masukkan nomor telepon"
              value={phoneNumber}
              type="number"
              onChange={(e) =>
                setPhoneNumber(
                  e.target.value
                )
              }
            />

            <InputGroupAddon>
              <Phone />
            </InputGroupAddon>
          </InputGroup>
        </div>

        {/* EMAIL */}
        <div className="space-y-2">
          <Label>Email</Label>

          <InputGroup>
            <InputGroupInput
              placeholder="Masukkan email"
              value={email}
              type="email"
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />

            <InputGroupAddon>
              <Mail />
            </InputGroupAddon>
          </InputGroup>
        </div>

        {/* PASSWORD */}
        <div className="space-y-2">
          <Label>Password</Label>

          <InputGroup>
            <InputGroupInput
              placeholder="Masukkan password"
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />

            <InputGroupAddon>
              <KeyRound />
            </InputGroupAddon>
          </InputGroup>
        </div>

        {/* PREVIEW */}
        <div className="rounded-2xl bg-secondary/10 p-5">

          <div className="flex items-center gap-3">

            <Users className="h-5 w-5 text-primary" />

            <h3 className="text-lg font-semibold text-primary">
              Preview Member
            </h3>
          </div>

          <div className="mt-4 space-y-2">

            <p>
              <span className="font-medium">
                Nama:
              </span>{" "}
              {fullName || "-"}
            </p>

            <p>
              <span className="font-medium">
                Telepon:
              </span>{" "}
              {phoneNumber || "-"}
            </p>

            <p>
              <span className="font-medium">
                Email:
              </span>{" "}
              {email || "-"}
            </p>

            <p>
              <span className="font-medium">
                Password:
              </span>{" "}
              {password || "-"}
            </p>

            <p>
              <span className="font-medium">
                Role:
              </span>{" "}
              {role}
            </p>

            <div className="pt-3 flex items-center gap-2">

              <Shield className="h-5 w-5 text-primary" />

              <h4 className="text-xl font-bold text-primary capitalize">
                {role}
              </h4>
            </div>
          </div>
        </div>

        {/* SUBMIT */}
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-primary hover:bg-secondary"
        >
          {loading
            ? "Menyimpan..."
            : isEdit
            ? "Update Member"
            : "Simpan Member"}
        </Button>
      </CardContent>
    </Card>
  )
}