import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get('refreshToken');

  // fix so that if no access token then re-direct to a screen to run refresh token function for new access token
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