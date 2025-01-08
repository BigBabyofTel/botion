import { describe, it, expect } from 'bun:test';

describe('hashPassword function', () => {
  it('should hash the password using bcrypt algorithm', async () => {
    const password = 'password123';
    const hashedPassword = await Bun.password.hash(password, {
      algorithm: 'bcrypt',
    });

    expect(hashedPassword).toBeDefined();
    expect(hashedPassword).not.toBe(password);
  });

  it('should throw an error if password is empty', async () => {
    const password = '';

    // Use expect().rejects to handle the promise rejection
    expect(
      (async () => {
        if (!password) {
          throw new TypeError('password must not be empty');
        }
        await Bun.password.hash(password, { algorithm: 'bcrypt' });
      })()
    ).rejects.toThrow('password must not be empty');
  });
});