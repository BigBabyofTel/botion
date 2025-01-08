import { z, ZodObject, ZodString } from 'zod';

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

export const userSchema: ZodObject<{
  username: ZodString;
  password: ZodString;
}> = z.object({
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