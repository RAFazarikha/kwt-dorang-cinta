import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // Ambil role dari user metadata
  const role = user?.user_metadata?.role

  // 1. Proteksi akses /admin
  if (pathname.startsWith("/admin")) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
    if (role !== "admin") {
      if (role === "member") {
        return NextResponse.redirect(new URL("/user", request.url))
      }
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  // 2. Proteksi akses /user
  if (pathname.startsWith("/user")) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
    if (role !== "member") {
      if (role === "admin") {
        return NextResponse.redirect(new URL("/admin", request.url))
      }
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  // 3. Redirect otomatis jika mengakses /login TAPI sudah dalam keadaan login
  if (pathname.startsWith("/login") && user) {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url))
    }
    if (role === "member") {
      return NextResponse.redirect(new URL("/user", request.url))
    }
    return NextResponse.redirect(new URL("/", request.url))
  }

  return response
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}