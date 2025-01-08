import { describe, it, expect, beforeAll } from 'bun:test';
import { getJWT, verifyToken, getRefJWT, getNewAccessToken } from '@/utils/jwt';

const mockUsername = 'testuser';
const mockAccessTokenSecret = 'mockAccessTokenSecret';
const mockRefreshTokenSecret = 'mockRefreshTokenSecret';

beforeAll(() => {
  process.env.ACCESS_TOKEN_SECRET = mockAccessTokenSecret;
  process.env.REFRESH_TOKEN_SECRET = mockRefreshTokenSecret;
});

describe('JWT Functions', () => {
  it('should generate a JWT', async () => {
    const token = await getJWT(mockUsername);
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });

  it('should verify a valid JWT', async () => {
    const token = await getJWT(mockUsername);
    const payload = await verifyToken(token);
    expect(payload).toBeDefined();
    expect(payload.username).toBe(mockUsername);
  });

  it('should throw an error for an invalid JWT', async () => {
    expect(verifyToken('invalidToken')).rejects.toThrow(
      'invalid JWT token: invalidToken'
    );
  });

  it('should generate a refresh JWT', async () => {
    const token = await getRefJWT(mockUsername);
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });

  it('should generate a new access token using a valid refresh token', async () => {
    const refreshToken = await getRefJWT(mockUsername);
    const newAccessToken = await getNewAccessToken(refreshToken);
    expect(newAccessToken).toBeDefined();
    expect(typeof newAccessToken).toBe('string');
  });

  it('should throw an error for an invalid refresh token', async () => {
    expect(getNewAccessToken('invalidToken')).rejects.toThrow(
      'invalid JWT token: invalidToken'
    );
  });
});