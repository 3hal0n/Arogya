import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply middleware to admin routes (excluding verify page)
  // if (pathname.startsWith('/admin') && pathname !== '/admin/verify') {
  //   // Check if user has admin access
  //   const accessKey = request.cookies.get('accessKey')?.value;
  //   
  //   if (!accessKey) {
  //     // Redirect to admin verification if no access key
  //     return NextResponse.redirect(new URL('/admin/verify', request.url));
  //   }
  //   // You can add additional validation here if needed
  //   // For now, we'll just check if the key exists
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 