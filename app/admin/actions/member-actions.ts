"use server"

import { revalidatePath } from "next/cache"
import { createClient as createAdminClient } from "@supabase/supabase-js"

type MemberPayload = {
  full_name: string
  email: string
  password?: string
  phone_number?: string
  role?: string
}

const supabaseAdmin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)

export async function createMember(payload: MemberPayload) {
  // =========================
  // CREATE AUTH USER
  // =========================

  const {
    data: authData,
    error: authError,
  } = await supabaseAdmin.auth.admin.createUser({
    email: payload.email,
    password: payload.password || "member123",
    email_confirm: true,
    user_metadata: {                     // <-- TAMBAHAN
      role: payload.role || "member",    // <-- TAMBAHAN: Menyimpan role ke metadata
    },                                   // <-- TAMBAHAN
  })

  if (authError) {
    console.error("CREATE AUTH USER ERROR:", authError.message)

    return {
      success: false,
      message: authError.message,
    }
  }

  // =========================
  // INSERT MEMBER
  // =========================

  const { data, error } = await supabaseAdmin
    .from("members")
    .insert([
      {
        id: authData.user.id,
        full_name: payload.full_name,
        phone_number: payload.phone_number || null,
        role: payload.role || "member",
      },
    ])
    .select()
    .single()

  if (error) {
    console.error("CREATE MEMBER ERROR:", error.message)

    // rollback auth user jika gagal insert ke database
    await supabaseAdmin.auth.admin.deleteUser(authData.user.id)

    return {
      success: false,
      message: error.message,
    }
  }

  revalidatePath("/admin/member")

  return {
    success: true,
    message: "Member berhasil ditambahkan",
    data,
  }
}

export async function updateMember(id: string, payload: MemberPayload) {
  // =========================
  // UPDATE AUTH USER
  // =========================

  const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(
    id,
    {
      email: payload.email,
      ...(payload.password
        ? {
            password: payload.password,
          }
        : {}),
      user_metadata: {                     // <-- TAMBAHAN
        role: payload.role || "member",    // <-- TAMBAHAN: Update role di metadata
      },                                   // <-- TAMBAHAN
    }
  )

  if (authError) {
    console.error("UPDATE AUTH USER ERROR:", authError.message)

    return {
      success: false,
      message: authError.message,
    }
  }

  // =========================
  // UPDATE MEMBER
  // =========================

  const { data, error } = await supabaseAdmin
    .from("members")
    .update({
      full_name: payload.full_name,
      phone_number: payload.phone_number || null,
      role: payload.role || "member",
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("UPDATE MEMBER ERROR:", error.message)

    return {
      success: false,
      message: error.message,
    }
  }

  revalidatePath("/admin/member")

  return {
    success: true,
    message: "Member berhasil diperbarui",
    data,
  }
}

export async function deleteMember(id: string) {
  // =========================
  // DELETE RELATIONS
  // =========================

  await supabaseAdmin.from("event_attendances").delete().eq("member_id", id)
  await supabaseAdmin.from("routine_attendances").delete().eq("member_id", id)
  await supabaseAdmin.from("duty_schedules").delete().eq("member_id", id)

  // =========================
  // DELETE MEMBER
  // =========================

  const { error } = await supabaseAdmin.from("members").delete().eq("id", id)

  if (error) {
    console.error("DELETE MEMBER ERROR:", error.message)

    return {
      success: false,
      message: error.message,
    }
  }

  // =========================
  // DELETE AUTH USER
  // =========================

  const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id)

  if (authError) {
    console.error("DELETE AUTH USER ERROR:", authError.message)

    return {
      success: false,
      message: authError.message,
    }
  }

  revalidatePath("/admin/member")

  return {
    success: true,
    message: "Member berhasil dihapus",
  }
}