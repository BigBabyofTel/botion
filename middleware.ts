import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken');
  //const refreshToken = req.cookies.get('refresh_token');

  if (!accessToken) {
    const url = req.nextUrl.clone();
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/documents'],
};