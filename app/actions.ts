'use server';

import { db } from '@/app/api/db/db';
import { documentTable } from '@/app/api/db/schema';
import { verifyToken } from '@/utils/jwt';
import { user } from '@/services/user.service';

export interface CreateTypes {
  title: string;
  AccessToken: string | null;
}

//redo this create fn
export async function create({ title = 'Untitled', AccessToken }: CreateTypes) {
  if (AccessToken === null) {
    throw new Error('Token is not valid');
  } else {
    await db.insert(documentTable).values({
      title: title,
      isPublished: false,
      isArchived: false,
    });
  }
}

export async function getDocumentsUserId(access_token: string | null) {
  if (access_token === null) {
    throw new Error('Token is not valid');
  } else {
    const documentId = await db.selectDistinct().from(documentTable);
    return documentId[0].userId;
  }
}

export async function setUpSession(token: string, refToken: string) {
  const accessToken = await verifyToken(token);
  if (accessToken !== null) {
    return { success: true, token, refToken };
  } else {
    throw new Error('Token is not verified');
  }
}