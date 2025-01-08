'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import { Logo } from './logo';
import { SignupFormSchema } from '@/lib/schema';

interface FormState {
  username: string;
  password: string;
  confirmPassword: string;
}

export function SignupForm() {
  const [errors, setErrors] = useState<string[]>([]);

  async function handleForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formState: FormState = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirm-password') as string,
    };

    try {
      SignupFormSchema.parse(formState);
      setErrors([]);
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });
      if (response.ok) {
        console.log('Form submitted successfully');
      } else {
        setErrors(['Failed to submit form']);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.errors.map((error) => error.message));
      }
    }
    redirect('/auth/login');
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
          <Input
            type="password"
            name="confirm-password"
            placeholder="Confirm Password"
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
          <Button type="submit">Sign Up</Button>
        </form>
      </div>
    </>
  );
}