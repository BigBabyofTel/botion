'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Item from './item';
import { cn } from '@/lib/utils';
import { FileIcon } from 'lucide-react';
import { useAuth } from '@/components/providers/auth-provider';
import { documentSchema } from '@/app/api/db/schema';
import { getSidebar, SidebarTypes } from '@/app/actions';
import { z } from 'zod';

interface DocumentListProps {
  level?: number;
  data?: (typeof documentSchema)[];
  parentDocument?: string | undefined;
}

export default function DocumentList({
  level = 0,
  parentDocument,
}: DocumentListProps) {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, userId } = useAuth();

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [docs, setDocs] = useState<z.infer<typeof documentSchema>[]>([]);

  useEffect(() => {
    async function fetchDocs() {
      const sidebarDocs = await getSidebar({ userId } as SidebarTypes);
      const formattedDocs = sidebarDocs.map((doc) => ({
        title: doc.title ?? '',
        userId: doc.userId ?? '',
        documentId: doc.documentId ?? '',
        isArchived: doc.isArchived ?? false,
        isPublished: doc.isPublished ?? false,
        content: doc.content ?? '',
        icon: doc.icon ?? '',
        coverImage: doc.coverImage ?? '',
        parentDocument: doc.parentDocument ?? '',
      }));
      setDocs(formattedDocs);
    }

    void fetchDocs();
  }, [userId]);

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <p
        style={{
          paddingLeft: level ? `${level * 12 + 25}px` : undefined,
        }}
        className={cn(
          'hidden text-sm font-medium text-muted-foreground/80',
          expanded && 'last:block',
          level === 0 && 'hidden'
        )}
      >
        No pages inside
      </p>
      {docs.map((document) => (
        <div key={document.documentId}>
          <Item
            id={document.documentId}
            onClick={() => onRedirect(document.documentId)}
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            active={params.documentId === document.documentId}
            level={level}
            onExpand={() => onExpand(document.documentId)}
            expanded={expanded[document.documentId]}
          />
          {expanded[document.documentId] && (
            <DocumentList
              parentDocument={document.parentDocument}
              level={level + 1}
            />
          )}
        </div>
      ))}
    </>
  );
}