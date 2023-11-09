import { getToken } from "next-auth/jwt";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process?.env?.NEXT_PUBLIC_NEXTAUTH_SECRET,
    raw: true,
  });
  if (!token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }
}
export const config = {
  matcher: ['/', '/test'],
};

