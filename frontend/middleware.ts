import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp?: number;
  iat?: number;
}

export function middleware(req: NextRequest) {
  // 1. Only run checks on /dashboard routes
  if (!req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.next();
  }

  // 2. Retrieve the JWT from the cookie
  const token = req.cookies.get('authtoken')?.value;
  if (!token) {
    // No token -> redirect to /login
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    // 3. Decode the JWT to get its payload
    const decoded = jwtDecode<JwtPayload>(token);
    // Example: check the expiration time
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      // Token expired
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // 4. Token is valid for now -> proceed
    return NextResponse.next();
  } catch (error) {
    // If decoding fails (malformed token, etc.)
    console.error('JWT decode error:', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// 5. Apply this middleware only to the /dashboard routes
export const config = {
  matcher: ['/dashboard/:path*'],
};
