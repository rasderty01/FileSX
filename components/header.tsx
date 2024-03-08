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
import { FileBox } from "lucide-react";

export function Header() {
  const user = useUser();
  const path = usePathname();
  const router = useRouter();

  const showDashboardButton =
    path !== "/dashboard/files" &&
    path !== "/dashboard/favorites" &&
    path !== "/dashboard/trash";

  return (
    <div className="bg-primary-freground border-b py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          href={"/"}
          className="flex items-center gap-2 text-2xl font-medium tracking-tight"
        >
          <FileBox className="size-10" />
          Fi Lestorage
        </Link>
        <div className="flex gap-2">
          <ClerkLoading>
            <div className="flex h-12 items-center gap-4">
              {showDashboardButton && <Skeleton className="h-10 w-28 " />}
              <Skeleton className="h-10 w-48 " />
              <Skeleton className="size-9 rounded-full" />
            </div>
          </ClerkLoading>
          <SignedIn>
            <div className="flex items-center gap-4">
              {showDashboardButton && (
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

              <UserButton afterSignOutUrl="/" />
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
