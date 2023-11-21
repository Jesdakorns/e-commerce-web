import { getToken } from "next-auth/jwt";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process?.env?.NEXT_PUBLIC_NEXTAUTH_SECRET,
    raw: true,
    cookieName: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token'
  });
  console.log(`🚀 ~ file: middleware.ts ~ line 13 ~ middleware ~ token`, token)
  if (req.nextUrl.pathname.startsWith("/signin") && token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!token && !req.nextUrl.pathname.startsWith("/signin")) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }
}
export const config = {
  matcher: ['/', '/test', '/signin'],
};

