"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server" // Perhatikan import dari /server, bukan /client

export async function logoutAction() {
  // Inisialisasi dari utility server Anda
  const supabase = await createClient()

  // Jalankan fungsi signOut
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error("LOGOUT ERROR:", error.message)
    return { success: false, message: error.message }
  }

  revalidatePath("/", "layout")
  redirect("/login")
}