'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Logo } from './logo';
import { LoginFormSchema } from '@/app/api/db/schema';
import { FormState } from '@/lib/types';
import { authClient } from '@/lib/auth-client';

// Define the schema for login validation

export function LoginForm() {
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  async function handleForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formState: FormState = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    };

    try {
      LoginFormSchema.parse(formState);
      setErrors([]);

      const { error } = await authClient.signIn.email({
        email: formState.username,
        password: formState.password,
      });

      if (error) {
        setErrors([error.message || 'Failed to log in.']);
      } else {
        router.push('/');
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.errors.map((error) => error.message));
      }
    }
  }

  return (
    <>
      <div className="h-[700px] p-2 w-full flex flex-col justify-evenly items-center">
        <Logo />
        <form
          onSubmit={handleForm}
          className="w-1/3 p-5 border flex flex-col space-y-5 justify-center items-center"
        >
          <Input
            type="text"
            name="username"
            placeholder="Username"
            required
            className="border rounded-lg p-3"
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="border rounded-lg p-3"
          />
          {errors.length > 0 && (
            <div className="text-red-500">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
          <Button type="submit">Log In</Button>
        </form>
      </div>
    </>
  );
}
