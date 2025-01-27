import { NextRequest, NextResponse } from 'next/server';
import { GithubAccessToken } from '@/lib/types';

const ERROR_MESSAGES = {
  missingEnv: 'Missing environment variables: clientId or clientSecret',
  missingCode: 'Missing authorization code in request',
  fetchError: 'Failed to fetch access token',
  internalError: 'Internal Server Error',
  rateLimitExceeded: 'Rate limit exceeded. Please try again later.',
};

export async function GET(req: NextRequest) {
  const url = new URL('https://github.com/login/oauth/access_token');

  const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID as string;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET as string;

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.missingEnv },
      { status: 500 }
    );
  }

  const code = req.nextUrl.searchParams.get('code');

  if (!code) {
    console.warn(ERROR_MESSAGES.missingCode);
    return NextResponse.json(
      { error: ERROR_MESSAGES.missingCode },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }).toString(),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Error fetching access token: ${errorData.error}`);
      return NextResponse.json({
        error: errorData.error || ERROR_MESSAGES.fetchError,
      });
    }

    const data: GithubAccessToken = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Internal server error:', error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.internalError },
      { status: 500 }
    );
  }
}