import {
  pgTable,
  serial,
  timestamp,
  text,
  boolean,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { v4 as uuid } from 'uuid';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

//user schema
export const usersTable = pgTable('users', {
  id: serial().primaryKey(),
  username: text().notNull().unique(),
  password: text().notNull(),
  createdOn: timestamp('created_on').defaultNow(),
});
export const userSchema = z.object({
  username: z.string().min(1).max(255),
  password: z.string().min(5).max(255),
});

export const insertUserSchema = createInsertSchema(usersTable, {
  username: () => userSchema.shape.username,
  password: () => userSchema.shape.password,
});

//note schema
export const documentTable = pgTable(
  'documents',
  {
    id: serial().primaryKey(),
    title: text(),
    userId: text().default(uuid()),
    isArchived: boolean(),
    isPublished: boolean(),
    content: text(),
    icon: text(),
    coverImage: text(),
    parentDocument: text(),
    createdOn: timestamp('created_on').defaultNow(),
  },
  (table) => [
    uniqueIndex('userId_idx').on(table.userId),
    uniqueIndex('parentDoc_idx').on(table.parentDocument),
  ]
);

export const noteSchema = z.object({
  id: z.number(),
  title: z.string(),
  userId: z.string(),
  isArchived: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  content: z.string().optional(),
  icon: z.string().optional(),
  coverImage: z.string().optional(),
  parentDocument: z.string().optional().optional(),
  createdOn: z.string(),
});

export const insertDocumentSchema = createInsertSchema(documentTable, {
  id: () => noteSchema.shape.id,
  title: () => noteSchema.shape.title,
  userId: () => noteSchema.shape.userId,
  isArchived: () => noteSchema.shape.isArchived,
  isPublished: () => noteSchema.shape.isPublished,
  content: () => noteSchema.shape.content,
  icon: () => noteSchema.shape.icon,
  coverImage: () => noteSchema.shape.coverImage,
  parentDocument: () => noteSchema.shape.parentDocument,
  createdOn: () => noteSchema.shape.createdOn,
});