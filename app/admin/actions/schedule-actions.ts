"use server"

import { revalidatePath } from "next/cache"

import { createClient } from "@/lib/supabase/server"

type SchedulePayload = {
  member_id: string
  day_of_week: number
  shift_time?: string
}

export async function createSchedule(
  payload: SchedulePayload
) {

  const supabase =
    await createClient()

  const { data, error } =
    await supabase
      .from("duty_schedules")
      .insert([
        {
          member_id:
            payload.member_id,

          day_of_week:
            payload.day_of_week,

          shift_time:
            payload.shift_time || null,
        },
      ])
      .select()
      .single()

  if (error) {

    console.error(
      "CREATE SCHEDULE ERROR:",
      error.message
    )

    return {
      success: false,
      message: error.message,
    }
  }

  revalidatePath("/admin")

  return {
    success: true,
    message:
      "Jadwal berhasil ditambahkan",
    data,
  }
}

export async function updateSchedule(
  id: string,
  payload: SchedulePayload
) {

  const supabase =
    await createClient()

  const { data, error } =
    await supabase
      .from("duty_schedules")
      .update({
        member_id:
          payload.member_id,

        day_of_week:
          payload.day_of_week,

        shift_time:
          payload.shift_time || null,
      })
      .eq("id", id)
      .select()
      .single()

  if (error) {

    console.error(
      "UPDATE SCHEDULE ERROR:",
      error.message
    )

    return {
      success: false,
      message: error.message,
    }
  }

  revalidatePath("/admin")

  return {
    success: true,
    message:
      "Jadwal berhasil diperbarui",
    data,
  }
}

export async function deleteSchedule(
  id: string
) {

  const supabase =
    await createClient()

  const { error } =
    await supabase
      .from("duty_schedules")
      .delete()
      .eq("id", id)

  if (error) {

    console.error(
      "DELETE SCHEDULE ERROR:",
      error.message
    )

    return {
      success: false,
      message: error.message,
    }
  }

  revalidatePath("/admin")

  return {
    success: true,
    message:
      "Jadwal berhasil dihapus",
  }
}