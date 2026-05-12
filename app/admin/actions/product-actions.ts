"use server"

import { revalidatePath } from "next/cache"
import { v2 as cloudinary } from 'cloudinary';
import { createClient } from "@/lib/supabase/server"

interface ProductPayload {
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

export async function deleteProduct(id: string, imageUrl: string) {
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
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;

    revalidatePath("/admin")
    return { success: true };
  } catch (error) {
    console.error("Gagal menghapus produk:", error);
    throw new Error("Gagal menghapus produk");
  }

}

export async function createProduct(data: ProductPayload) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("products")
    .insert(data)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/admin")
}

export async function updateProduct(id: string, data: ProductPayload) {
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

interface UpdateStokPayload {
  stock: number
}

export async function updateStokProduct(
  productId: string,
  payload: UpdateStokPayload
) {

  const supabase =
    await createClient()

  // =========================
  // VALIDASI
  // =========================

  if (!productId) {
    throw new Error(
      "ID produk tidak ditemukan"
    )
  }

  if (payload.stock < 0) {
    throw new Error(
      "Stok tidak valid"
    )
  }

  // =========================
  // UPDATE STOCK
  // =========================

  const {
    error,
  } = await supabase
    .from("products")
    .update({
      stock: payload.stock,
    })
    .eq("id", productId)

  if (error) {
    throw new Error(
      error.message
    )
  }

  // =========================
  // REVALIDATE
  // =========================

  revalidatePath("/admin")

  revalidatePath("/admin/product")

  return {
    success: true,
    message:
      "Stok berhasil diperbarui",
  }
}