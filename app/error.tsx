"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const Error = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/error.webp"
        alt="Error"
        width={300}
        height={300}
        priority
        className="dark:hidden"
      />
      <Image
        src="/error-dark.webp"
        alt="Error"
        width={300}
        height={300}
        priority
        className="dark:block hidden"
      />
      <h2 className="text-xl font-medium">Something went wrong!</h2>
      <Button onClick={() => redirect("/")}>Go back</Button>
    </div>
  );
};

export default Error;
