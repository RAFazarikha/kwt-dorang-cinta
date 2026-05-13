"use server"

import { revalidatePath } from "next/cache"
import { v2 as cloudinary } from 'cloudinary';
import { createClient } from "@/lib/supabase/server"

interface EventPayload {
  name: string
  price: number
  stock: number
  image_url: string
}

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

function getPublicIdFromUrl(url: string) {
  const parts = url.split('/');
  const uploadIndex = parts.indexOf('upload');
  // Ambil path setelah "upload/v..."
  const publicIdWithExtension = parts.slice(uploadIndex + 2).join('/');
  // Hilangkan ekstensi (.jpg, .png)
  return publicIdWithExtension.split('.')[0];
}

export async function deleteEvent(id: string, imageUrl: string) {
  const supabase = await createClient()

  try {
    // 1. Hapus gambar dari Cloudinary (jika ada gambarnya)
    if (imageUrl && imageUrl.includes('cloudinary.com')) {
      const publicId = getPublicIdFromUrl(imageUrl);
      await cloudinary.uploader.destroy(publicId);
      console.log("Gambar dihapus dari Cloudinary:", publicId);
    }

    // 2. Hapus data dari database Supabase
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) throw error;

    revalidatePath("/admin")
    return { success: true };
  } catch (error) {
    console.error("Gagal menghapus event:", error);
    throw new Error("Gagal menghapus event");
  }

}

export async function createEvent(data: EventPayload) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("events")
    .insert(data)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/admin")
}

export async function updateEvent(id: string, data: EventPayload) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("events")
    .update(data)
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/admin")
}
