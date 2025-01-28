import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get('refreshToken');

  if (!refreshToken) {
    const url = req.nextUrl.clone();
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/documents'],
};