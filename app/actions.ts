'use server';

import { db } from '@/app/api/db/db';
import { documentTable } from '@/app/api/db/schema';
import { verifyToken } from '@/utils/jwt';
import { GithubAccessToken, UserObject } from '@/lib/types';

export interface CreateTypes {
  title: string;
  AccessToken: string | null;
}

//redo this create fn
export async function create({ title, AccessToken }: CreateTypes) {
  if (AccessToken === null) {
    throw new Error('Token is not valid');
  } else {
    db.insert(documentTable).values({
      title: title,
      isPublished: false,
      isArchived: true,
    });
  }
  const documentId = db
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

export async function getGithubAccessToken(
  code: string
): Promise<GithubAccessToken> {
  const url = new URL('https://github.com/login/oauth/access_token');
  url.searchParams.append(
    'client_id',
    process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID as string
  );
  url.searchParams.append(
    'client_secret',
    process.env.GITHUB_CLIENT_SECRET as string
  );
  url.searchParams.append('code', code);
  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  });
  if (!response.ok)
    throw new Error(`Error fetching access token: ${response.statusText}`);
  const data = await response.json();
  if (!data.access_token) throw new Error('Access token not found in response');
  return data;
}

export async function getGitHubUser(accessToken: string): Promise<UserObject> {
  const response = await fetch('https://api.github.com/user', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok)
    throw new Error(`Error fetching user data: ${response.statusText}`);
  return await response.json();
}