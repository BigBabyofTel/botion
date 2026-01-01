'use client';

import dynamic from 'next/dynamic';
import { useMemo, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Toolbar from '@/components/toolbar';
import { Cover } from '@/components/cover';
import { Skeleton } from '@/components/ui/skeleton';
import { authClient } from '@/lib/auth-client';
import { Spinner } from '@/components/spinner';

interface documentIdPageProps {
  params: {
    documentId: string;
  };
}

const DocumentIdPage = ({ params: _params }: documentIdPageProps) => {
  const router = useRouter();
  const [user, setUser] = useState<Record<string, unknown> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [document, setDocument] = useState<Record<string, unknown> | undefined>(
    undefined
  );

  const Editor = useMemo(
    () => dynamic(() => import('@/components/editor'), { ssr: false }),
    []
  );

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession();
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

    checkAuth();
  }, [router]);

  // ...existing code...
  if (isLoading) {
    return (
      <div className="h-dvh flex items-center justify-center dark:bg-[#1f1f1f]">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (document === undefined) {
    return (
      <div>
        <Cover.skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-1/2" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-2/5" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>Not Found</div>;
  }

  return (
    <div className="pb-40">
      {/* set cover image from db */}
      <Cover url={undefined} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
        {/*
        add the document content and change function
        */}
        <Editor onChange={() => {}} initialContent={''} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
