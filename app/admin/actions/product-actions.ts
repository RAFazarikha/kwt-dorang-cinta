"use server"

import { revalidatePath } from "next/cache"

import { createClient } from "@/lib/supabase/server"

export async function deleteProduct(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/admin")
}

export async function createProduct(data: {
  name: string
  price: number
  stock: number
  image_url: string
}) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("products")
    .insert(data)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/admin")
}

export async function updateProduct(
  id: string,
  data: {
    name: string
    price: number
    stock: number
    image_url: string
  }
) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("products")
    .update(data)
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/admin")
}