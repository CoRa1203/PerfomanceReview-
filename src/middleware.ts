// src/middleware.ts
import { auth } from "@/config/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Список маршрутов, доступных без авторизации
const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/auth/reset-password",
  // "/about",
  // "/contact",
  // "/api/webhook", // пример публичного API
  "/api/*",
  "/auth/callback", // важно для OAuth
];

// Проверка, является ли маршрут публичным
function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some((route) =>
    route.endsWith("*")
      ? pathname.startsWith(route.slice(0, -1))
      : pathname === route
  );
}

export default auth(async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth?.user;

  // Пропускаем публичные маршруты без проверки авторизации
  if (isPublicRoute(nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Если пользователь не авторизован — редирект на /login
  if (!isLoggedIn) {
    const url = new URL("/login", nextUrl.origin);
    url.searchParams.set("callbackUrl", nextUrl.href);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

// Применяем middleware ко всем маршрутам (кроме статики и API, если не нужно)
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};