//routes  for login and register

import { User } from '@/lib/types';
import { ZodError } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { createUserData } from '@/lib/auth';

export async function GET() {
  return new Response('Hello, this is a get request!');
}

export async function POST(req: NextRequest) {
  try {
    const body: User = await req.json();
    const { username, password, email } = body;
    //add parsing to verify data
    await createUserData({ username, password, email });
    return new NextResponse(
      JSON.stringify({ message: 'User registered successfully' }),
      { status: 201 }
    );
  } catch (e) {
    if (e instanceof ZodError) {
      return new NextResponse(
        JSON.stringify({
          message: 'Validation failed',
          errors: e.errors,
        }),
        { status: 400 }
      );
    }
    if (e instanceof ZodError && e.message === 'User already exists') {
      return new NextResponse(
        JSON.stringify({
          message: 'User already exists',
        }),
        { status: 409 }
      );
    }
    console.error('Signup error:', e);
    return new NextResponse(
      JSON.stringify({
        message: 'Internal server error',
      }),
      { status: 500 }
    );
  }
}