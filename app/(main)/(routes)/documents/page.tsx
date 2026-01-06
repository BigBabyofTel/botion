'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { authClient } from '@/lib/auth-client';
import { Spinner } from '@/components/spinner';
import { BetterAuthUser } from '@/lib/types';

export default function DocumentsPage() {
  const router = useRouter();
  const [user, setUser] = useState<BetterAuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession();
        // Handle different possible session response structures
        const userData = session?.data?.user;

        if (!userData) {
          router.push('/auth/login');
          return;
        }

        setUser(userData);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/auth/login');
      } finally {
        setIsLoading(false);
      }
    };

    void checkAuth();
  }, [router]);

  const onCreate = () => {
    // const promise = creat({
    //   title: 'Untitled',
    //   AccessToken: accessToken,
    // }).then((document) => {
    //   const documentId = document?.doc.documentId as string;
    //   router.push(`/documents/${documentId}`);
    // });
    // toast.promise(promise, {
    //   loading: 'Creating a new note...',
    //   success: 'New note created!',
    //   error: 'Failed to create a new note.',
    // });
  };

  if (isLoading) {
    return (
      <div className="h-dvh flex items-center justify-center dark:bg-[#1f1f1f]">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="h-dvh flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.webp"
        height="300"
        width="300"
        alt="empty"
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.webp"
        height="300"
        width="300"
        alt="empty"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.name}&apos;s Botion
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2 " />
        Create a note
      </Button>
    </div>
  );
}
