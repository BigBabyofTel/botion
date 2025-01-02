"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DocumentsPage() {
  const router = useRouter();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "untitled" }).then((documentId) =>
      router.push(`/documents/${documentId}`)
    );

    toast.promise(promise, {
      loading: "Creatign a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
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
        Welcome to {}&apos;s Botion
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2 " />
        Create a note
      </Button>
    </div>
  );
}
