"use server"

import { createClient } from "@/lib/supabase/server" // Pastikan ini mengarah ke setup server Supabase Anda
import { revalidatePath } from "next/cache"

interface TransactionPayload {
  buyer_name: string
  product_id: string
  quantity: number
  unit_price: number
}

export async function createTransaction(payload: TransactionPayload) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("transactions")
    .insert(payload)

  if (error) {
    throw new Error(error.message)
  }

  // Refresh data di halaman admin setelah insert
  revalidatePath("/admin")
  return { success: true }
}

export async function updateTransaction(id: string, payload: TransactionPayload) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("transactions")
    .update(payload)
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/admin")
  return { success: true }
}