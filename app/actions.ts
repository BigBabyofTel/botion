'use server';

import { db } from '@/app/api/db/db';
import { documentTable } from '@/app/api/db/schema';
import { verifyToken } from '@/utils/jwt';

export interface CreateTypes {
  title: string;
  AccessToken: string | null;
}

//redo this create fn
export async function create({ title, AccessToken }: CreateTypes) {
  if (AccessToken === null) {
    throw new Error('Token is not valid');
  } else {
    await db.insert(documentTable).values({
      title: title,
      isPublished: false,
      isArchived: false,
    });
  }
  const documentId = await db
    .select({ documentId: documentTable.userId })
    .from(documentTable);
  return { documentId };
}

export async function setUpSession(token: string, refToken: string) {
  const accessToken = await verifyToken(token);
  if (accessToken !== null) {
    return { success: true, token, refToken };
  } else {
    throw new Error('Token is not verified');
  }
}