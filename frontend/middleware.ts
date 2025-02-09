import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp?: number;
  iat?: number;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('authtoken')?.value;

  // 1. If the user is trying to access the login page...
  if (pathname === '/login') {
    // ...and a token exists...
    if (token) {
      try {
        // ...decode it...
        const decoded = jwtDecode<JwtPayload>(token);
        // ...and if it's still valid, redirect to dashboard.
        if (decoded.exp && Date.now() < decoded.exp * 1000) {
          return NextResponse.redirect(new URL('/dashboard', req.url));
        }
      } catch (error) {
        console.error('JWT decode error:', error);
      }
    }
    // Otherwise, allow access to the login page.
    return NextResponse.next();
  }

  // 2. If the user is trying to access any dashboard route...
  if (pathname.startsWith('/dashboard')) {
    // ...but there's no token, redirect to login.
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      // ...if a token exists, decode it...
      const decoded = jwtDecode<JwtPayload>(token);
      // ...and if it’s expired, redirect to login.
      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    } catch (error) {
      console.error('JWT decode error:', error);
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // 3. For all other routes, proceed as normal.
  return NextResponse.next();
}

// Apply this middleware only to the /dashboard and /login routes.
export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
