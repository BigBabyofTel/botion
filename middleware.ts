import { NextResponse } from 'next/server';

export async function middleware() {
  // Allow access to /documents route - client will handle auth with better-auth
  // Better-auth stores session in memory/cookies that the client can check
  return NextResponse.next();
}

export const config = {
  matcher: ['/documents/:path*'],
};
