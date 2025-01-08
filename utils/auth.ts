import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function hashCheck(password: string, storedPW: string) {
  return bcrypt.compare(password, storedPW);
}

export async function createSession(accessToken: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: 'accessToken',
    value: accessToken,
    httpOnly: true,
    path: '/',
    maxAge: 3600,
  });
}