'use client';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { create } from '@/app/actions';
import { useSessionStore } from '@/lib/session-store';
import { useAuth } from '@/components/providers/auth-provider';

export default function DocumentsPage() {
  const router = useRouter();
  const { AccessToken } = useAuth();
  const { user } = useSessionStore();
  console.log(user);
  const onCreate = () => {
    const promise = create({ title: 'untitled', AccessToken }).then(
      (documentId) => router.push(`/documents/${documentId.documentId}`)
    );

    toast.promise(promise, {
      loading: 'Creating a new note...',
      success: 'New note created!',
      error: 'Failed to create a new note.',
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
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
        Welcome to {user?.username}&apos;s Botion
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2 " />
        Create a note
      </Button>
    </div>
  );
}