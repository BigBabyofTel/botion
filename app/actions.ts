'use server';

import { db } from '@/app/api/db/db';
import {
  documentTable,
  insertDocumentSchema,
  selectDocumentSchema,
} from '@/app/api/db/schema';
import { verifyToken } from '@/utils/jwt';
import { v4 as uuid } from 'uuid';
import { eq } from 'drizzle-orm';

export interface CreateTypes {
  title: string;
  AccessToken: string | null;
  parentDocument?: string;
}

export interface SidebarTypes {
  userId: string;
  parentDocument?: string;
}

// function works
export async function create({
  title,
  parentDocument,
  AccessToken,
}: CreateTypes) {
  // change identify check with new kind of hashed ID
  if (AccessToken === null) {
    throw new Error('Token is not valid');
  }
  const newUserId = uuid();
  try {
    // needs user id to be added
    const newDoc = insertDocumentSchema.parse({
      title,
      parentDocument,
      userId: newUserId,
    });
    await db.insert(documentTable).values(newDoc);

    const document = await db
      .select()
      .from(documentTable)
      .where(eq(documentTable.userId, newUserId))
      .limit(1);
    const doc = selectDocumentSchema.parse(document[0]);
    if (doc.documentId !== null) {
      return { doc };
    }
  } catch (e) {
    console.error(e);
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

export async function getSidebar({ userId }: SidebarTypes) {
  return db
    .select()
    .from(documentTable)
    .where(eq(documentTable.userId, userId));
}