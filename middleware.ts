import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware"

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process?.env?.NEXT_PUBLIC_NEXTAUTH_SECRET,
    raw: true,
  });
  const { pathname } = req.nextUrl
  // if (!token && pathname !== '/signin') {
  //   return NextResponse.redirect(new URL('/signin', req.url));
  // }
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/test'],
};

