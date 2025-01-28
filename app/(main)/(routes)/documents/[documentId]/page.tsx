'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import Toolbar from '@/components/toolbar';
import { Cover } from '@/components/cover';
import { Skeleton } from '@/components/ui/skeleton';

interface documentIdPageProps {
  params: {
    documentId: string;
  };
}

const DocumentIdPage = ({ params }: documentIdPageProps) => {
  const Editor = useMemo(
    () => dynamic(() => import('@/components/editor'), { ssr: false }),
    []
  );

  //func to get document id

  /*
    const onChange = (content: string) => {
      update({ id: params.documentId, content });
    };
  */
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