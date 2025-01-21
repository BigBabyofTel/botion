import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/lib/types';
import { verifyUser } from '@/lib/auth';
import { ZodError } from 'zod';
import { userSchema } from '@/app/api/db/schema';
import { createSession } from '@/utils/auth';

export async function POST(req: NextRequest) {
  try {
    const body: User = await req.json();
    const { username, password } = userSchema.parse(body);

    const user = await verifyUser({ username, password });
    if (user === undefined) {
      return new NextResponse(JSON.stringify({ error: 'User not found' }), {
        status: 404,
      });
    }
    if (user) {
      await createSession(user.accessToken);
    }

    return new NextResponse(JSON.stringify({ message: 'login successful' }), {
      headers: {
        authorization: user.accessToken,
        Refresher: user.refreshToken,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse(
        JSON.stringify({
          error: 'Validation error',
          details: error.errors[0].message,
        }),
        { status: 400 }
      );
    }
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
}