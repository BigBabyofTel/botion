'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import { Logo } from './logo';
import { authClient } from '@/lib/auth-client';

interface FormState {
  email: string;
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
      email: formData.get('email') as string,
      username: formData.get('username') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirm-password') as string,
    };
    try {
      const { error } = await authClient.signUp.email({
        email: formState.email,
        password: formState.password,
        name: formState.username,
      });

      if (error) {
        setErrors([error.message || 'Failed to sign up.']);
        return;
      }

      setErrors([]);
      redirect('/auth/login');
    } catch (error) {
      setErrors(['An unexpected error occurred. Please try again.']);
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
            name="email"
            placeholder="Email"
            required
            className="border rounded-lg p-3"
          />
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
