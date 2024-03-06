"use client";
import {
  ClerkLoading,
  OrganizationSwitcher,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

export function Header() {
  const user = useUser();
  const path = usePathname();
  const router = useRouter();

  const landingPage = "/";

  return (
    <div className="bg-primary-freground border-b py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href={landingPage} className="text-3xl font-medium tracking-wide">
          Filesxk
        </Link>
        <div className="flex gap-2">
          <ClerkLoading>
            <div className="flex h-12 items-center gap-4">
              {landingPage === path && <Skeleton className="h-10 w-28 " />}
              <Skeleton className="h-10 w-48 " />
              <Skeleton className="size-9 rounded-full" />
            </div>
          </ClerkLoading>
          <SignedIn>
            <div className="flex items-center gap-4">
              {landingPage === path && (
                <Button
                  variant={"default"}
                  size={"sm"}
                  onClick={() => router.push("/dashboard/files")}
                >
                  Dashboard
                </Button>
              )}
              <div className="flex items-center pt-2">
                <OrganizationSwitcher />
              </div>

              <UserButton />
            </div>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
