import { sign, verify, decode } from 'hono/jwt';
import { JWTPayload } from 'hono/utils/jwt/types';
import { DecodedToken } from '@/lib/types';

const get60MinutesFromNow = () => Math.floor(Date.now() / 1000) + 60 * 60;
const get2DaysFromNow = () => Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 2;

export async function getJWT(
  username: string,
  email?: string
): Promise<string> {
  const content: JWTPayload = {
    username: username,
    email: email,
    expireAt: get60MinutesFromNow(),
  };
  return await sign(content, process.env.ACCESS_TOKEN_SECRET!, 'HS256');
}

export async function verifyToken(token: string): Promise<JWTPayload> {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) throw new Error('ACCESS_TOKEN_SECRET is not defined');
  const result = await verify(token, secret);
  if (!result) throw new Error('Invalid token');
  return result;
}

export async function decodeAccessToken(token: string): Promise<DecodedToken> {
  if (token) {
    const { payload } = decode(token) as unknown as DecodedToken;
    return { payload };
  }
}

export async function verifyRefreshToken(
  refreshToken: string
): Promise<JWTPayload> {
  const secret = process.env.REFRESH_TOKEN_SECRET;
  if (!secret) throw new Error('REFRESH_TOKEN_SECRET is not defined');
  const result = await verify(refreshToken, secret);
  if (!result) throw new Error('Invalid token');
  return result;
}

export async function getRefJWT(username: string): Promise<string> {
  const payload: JWTPayload = {
    username: username,
    exp: get2DaysFromNow(),
  };
  return await sign(payload, process.env.REFRESH_TOKEN_SECRET!, 'HS256').catch(
    () => {
      throw new Error('Failed to generate refresh token');
    }
  );
}