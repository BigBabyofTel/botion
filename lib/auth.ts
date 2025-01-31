import { Tokens, User } from '@/lib/types';
import { insertUserSchema, usersTable } from '@/app/api/db/schema';
import { db } from '@/app/api/db/db';
import { eq } from 'drizzle-orm';
import { hashCheck, hashPassword } from '@/utils/auth';
import { getJWT, getRefJWT } from '@/utils/jwt';

export async function createUserData({ username, password, email }: User) {
  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, username))
    .execute();
  if (existingUser.length > 0) {
    throw new Error('User already exists');
  }
  const validData = insertUserSchema.parse({ username, password, email });
  const hashedPassword = await hashPassword(validData.password);

  const storedData = {
    email: validData.email as string,
    username: validData.username,
    password: hashedPassword,
  };

  await db.insert(usersTable).values(storedData);
}

export async function verifyUser({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<Tokens | undefined> {
  const results = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, username))
    .limit(1);

  const userName = results[0].username as string;
  const isMatch = await hashCheck(password, results[0].password);
  const email = results[0].email as string;
  if (userName !== username && !isMatch) throw new Error('There is no match');

  if (userName === username && isMatch) {
    const accessToken = await getJWT(username, email);
    const refreshToken = await getRefJWT(username);

    return { accessToken, refreshToken };
  }
}