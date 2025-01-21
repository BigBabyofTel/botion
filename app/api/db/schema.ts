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

//sign up and log in schema
export const SignupFormSchema = z
  .object({
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
  username: text().notNull().unique(),
  password: text().notNull(),
  createdOn: timestamp('created_on').defaultNow(),
});

export const insertUserSchema = createInsertSchema(usersTable, {
  username: () => userSchema.shape.username,
  password: () => userSchema.shape.password,
});

// document related
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

export const documentSchema = z.object({
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
  id: () => documentSchema.shape.id,
  title: () => documentSchema.shape.title,
  userId: () => documentSchema.shape.userId,
  isArchived: () => documentSchema.shape.isArchived,
  isPublished: () => documentSchema.shape.isPublished,
  content: () => documentSchema.shape.content,
  icon: () => documentSchema.shape.icon,
  coverImage: () => documentSchema.shape.coverImage,
  parentDocument: () => documentSchema.shape.parentDocument,
  createdOn: () => documentSchema.shape.createdOn,
});