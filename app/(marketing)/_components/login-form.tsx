'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Logo } from './logo';
import { useAuth } from '@/components/providers/auth-provider';
import { LoginFormSchema } from '@/lib/schema';
import { FormState } from '@/lib/types';
import { setUpSession } from '@/app/actions';

// Define the schema for login validation

export function LoginForm() {
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();
  const { setIsAuthenticated, setAccessToken, setRefreshToken, setIsLoading } =
    useAuth();

  const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID as string;
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI as string;

  function googleLogin() {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
      redirect_uri: redirectUri,
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      access_type: 'offline',
      response_type: 'code',
      flowName: 'GeneralOAuthFlow',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
    };

    const qs = new URLSearchParams(options);

    return `${rootUrl}?${qs.toString()}`;
  }

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
            setIsLoading(false);
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

  function handleGHLogin() {
    return router.push(
      `https://github.com/login/oauth/authorize?client_id=${clientId}`
    );
  }

  function handleDiscordLogin() {
    return router.push(process.env.NEXT_PUBLIC_DISCORD_GEN_URL as string);
  }

  function handleGoogleLogin() {
    const url = googleLogin() as string;
    return router.push(url);
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
          <Button onClick={handleGHLogin}>Log With Github</Button>
          <Button onClick={handleDiscordLogin}>Log in with Discord</Button>
          <Button onClick={handleGoogleLogin}>Log in with Google</Button>
        </form>
      </div>
    </>
  );
}