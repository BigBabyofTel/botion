import { sign, verify } from 'hono/jwt';
import { JWTPayload } from 'hono/utils/jwt/types';

const get60MinutesFromNow = () => Math.floor(Date.now() / 1000) + 60 * 60;
const get2DaysFromNow = () => Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 2;

export async function getJWT(username: string): Promise<string> {
  const content: JWTPayload = {
    username: username,
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

export async function getNewAccessToken(token: string): Promise<string> {
  const verifiedToken = await verify(token, process.env.REFRESH_TOKEN_SECRET!);
  if (!verifiedToken) throw new Error('Invalid refresh token');
  return await getJWT(token).catch(() => {
    throw new Error('Failed to generate new access token');
  });
}