"use client";

//needs auth added, sign in and sign out features
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
//import { Spinner } from "@/components/spinner";
import Link from "next/link";
import { useAuth } from "@/components/providers/auth-provider";
import { redirect } from "next/navigation";

export const Navbar = () => {
  const { isAuthenticated } = useAuth();

  const scrolled = useScrollTop();
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <div onClick={() => redirect("/")}>
        <Logo />
      </div>
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {/** add spinner */}

        {!isAuthenticated && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => redirect("/auth/login")}
            >
              Log in
            </Button>

            <Button size="sm" onClick={() => redirect("/auth/signup")}>
              Get Botion free
            </Button>
          </>
        )}
        {isAuthenticated && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">Enter Botion</Link>
            </Button>
            <Button size="sm">
              <Link href="/api/auth/logout">Sign out</Link>
            </Button>
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};
