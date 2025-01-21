import { NextRequest, NextResponse } from 'next/server';
import { UserObject } from '@/lib/types';

const ERROR_MESSAGES = {
  missingToken: 'Missing token in request',
  fetchError: 'Failed to fetch user data',
  internalError: 'Internal Server Error',
};

export async function GET(req: NextRequest) {
  const auth = req.headers.get('Authorization') as string;

  if (!auth) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.missingToken },
      { status: 400 }
    );
  }

  if (!auth.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.missingToken },
      { status: 400 }
    );
  }

  try {
    const response = await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        Authorization: auth as string,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Error fetching user data: ${errorData.error}`);
      return NextResponse.json({
        error: errorData.error || ERROR_MESSAGES.fetchError,
      });
    }
    const data: UserObject = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(ERROR_MESSAGES.internalError, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.internalError },
      { status: 500 }
    );
  }
}