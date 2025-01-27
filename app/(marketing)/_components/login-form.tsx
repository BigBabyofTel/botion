'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Logo } from './logo';
import { useAuth } from '@/components/providers/auth-provider';
import { LoginFormSchema } from '@/app/api/db/schema';
import { FormState } from '@/lib/types';
import { setUpSession } from '@/app/actions';

// Define the schema for login validation

export function LoginForm() {
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();
  const { setIsAuthenticated, setAccessToken, setRefreshToken } = useAuth();

  async function handleForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formState: FormState = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    };

    try {
      // Validate the form data against the schema
      LoginFormSchema.parse(formState);
      setErrors([]);

      // Send login request to the API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      // Check if the response is successful
      if (response.ok) {
        const headers = response.headers;
        const token = headers.get('authorization') as string;
        const reftoken = headers.get('refresher') as string;
        await setUpSession(token, reftoken).then((success) => {
          if (success) {
            setIsAuthenticated(true);
            setAccessToken(token);
            setRefreshToken(reftoken);
          }
        });
        router.push('/');
      } else {
        setErrors(['Failed to log in. Please check your credentials.']);
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