"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"

// Import komponen Field sesuai contoh Anda
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"

// Import komponen InputGroup
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const supabase = createClient()

  const handleLogin = async () => {
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    router.push("/admin")
  }

  return (
    <div className="flex flex-col gap-9 min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md rounded-2xl border-border shadow-lg">
        <CardContent className="space-y-6 p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary">
              Selamat datang kembali!
            </h1>

            <p className="mt-2 text-muted-foreground">
              Login untuk anggota resmi KWT Dorang Cinta.
            </p>
          </div>

          {/* Penggunaan FieldSet dan FieldGroup di sini */}
          <FieldSet className="w-full">
            <FieldGroup>

              {/* Field Email */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="contoh@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>

              {/* Field Password */}
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <InputGroup className="px-1">
                  <InputGroupInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputGroupAddon align="inline-end">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-muted-foreground hover:text-foreground focus:outline-none flex items-center justify-center"
                      aria-label={showPassword ? "Sembunyikan password" : "Lihat password"}
                    >
                      {showPassword ? (
                        <Eye className="h-5 w-5" />
                      ) : (
                        <EyeOff className="h-5 w-5" />
                      )}
                    </button>
                  </InputGroupAddon>
                </InputGroup>
              </Field>

            </FieldGroup>
          </FieldSet>

          <Button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-primary hover:bg-secondary"
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </CardContent>
      </Card>

      <Link
        href="/"
        className={buttonVariants({ variant: "ghost", size: "lg" })}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to home
      </Link>
    </div>
  )
}