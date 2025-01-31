'use client';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { create } from '@/app/actions';
import { useAuth } from '@/components/providers/auth-provider';

export default function DocumentsPage() {
  const router = useRouter();
  const { user, AccessToken, setUserId } = useAuth();

  const onCreate = () => {
    const promise = create({ title: 'Untitled', AccessToken }).then(
      (document) => {
        const documentId = document?.doc.documentId as string;
        const iD = document?.doc.userId as string;
        setUserId(iD);
        router.push(`/documents/${documentId}`);
      }
    );

    toast.promise(promise, {
      loading: 'Creating a new note...',
      success: 'New note created!',
      error: 'Failed to create a new note.',
    });
  };

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
        Welcome to {user?.username}&apos;s Botion
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2 " />
        Create a note
      </Button>
    </div>
  );
}