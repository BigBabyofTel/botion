import {
  pgTable,
  serial,
  timestamp,
  text,
  boolean,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';

import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

//sign up and log in schema
export const SignupFormSchema = z
  .object({
    email: z.string().email().trim(),
    username: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters long.' })
      .max(255)
      .trim(),
    password: z
      .string()
      .min(8, { message: 'Be at least 8 characters long' })
      .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Contain at least one special character.',
      })
      .trim(),
    confirmPassword: z
      .string()
      .min(8, { message: 'Be at least 8 characters long' })
      .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Contain at least one special character.',
      })
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // Specify the path of the error
  });

export const userSchema = z.object({
  email: z.string().email().trim().optional(),
  username: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long.' })
    .max(255)
    .trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .max(255)
    .trim(),
});

export const LoginFormSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

// user related
export const usersTable = pgTable('users', {
  id: serial().primaryKey(),
  email: text().notNull().unique(),
  username: text().notNull().unique(),
  password: text().notNull(),
  createdOn: timestamp('created_on').defaultNow(),
});

export const insertUserSchema = createInsertSchema(usersTable, {
  email: () => userSchema.shape.email,
  username: () => userSchema.shape.username,
  password: () => userSchema.shape.password,
});

// document related
export const documentTable = pgTable(
  'documents',
  {
    id: serial().primaryKey(),
    title: text(),
    userId: uuid(),
    documentId: uuid().defaultRandom(),
    isArchived: boolean().default(false),
    isPublished: boolean().default(false),
    content: text(),
    icon: text(),
    coverImage: text(),
    parentDocument: uuid(),
    createdOn: timestamp('created_on').defaultNow(),
  },
  (table) => [
    uniqueIndex('userId_idx').on(table.userId),
    uniqueIndex('parentDoc_idx').on(table.parentDocument),
    uniqueIndex('docId_idx').on(table.documentId),
  ]
);

export const documentSchema = z.object({
  title: z.string(),
  userId: z.string().uuid(),
  documentId: z.string().uuid(),
  isArchived: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  content: z.string().optional(),
  icon: z.string().optional(),
  coverImage: z.string().optional(),
  parentDocument: z.string().uuid().optional(),
});

export const insertDocumentSchema = createInsertSchema(documentTable, {
  title: () => documentSchema.shape.title,
  userId: () => documentSchema.shape.userId.optional(),
  isArchived: () => documentSchema.shape.isArchived.optional(),
  isPublished: () => documentSchema.shape.isPublished.optional(),
  content: () => documentSchema.shape.content.optional(),
  icon: () => documentSchema.shape.icon.optional(),
  coverImage: () => documentSchema.shape.coverImage.optional(),
  parentDocument: () => documentSchema.shape.parentDocument.optional(),
});

export const selectDocumentSchema = createSelectSchema(documentTable, {
  title: () => documentSchema.shape.title,
  userId: () => documentSchema.shape.userId.uuid().optional(),
  documentId: () => documentSchema.shape.documentId.optional(),
  isArchived: () => documentSchema.shape.isArchived.optional(),
  isPublished: () => documentSchema.shape.isPublished.optional(),
  content: () => documentSchema.shape.content.optional(),
  icon: () => documentSchema.shape.icon.optional(),
  coverImage: () => documentSchema.shape.coverImage.optional(),
  parentDocument: () => documentSchema.shape.parentDocument.optional(),
  createdOn: () => z.date().optional(),
  id: () => z.number().optional(),
});