import {
  OrganizationSwitcher,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";

export function Header() {
  return (
    <div className="border-b bg-gray-50 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div>Filesxk</div>
        <div className="flex gap-2">
          <SignedIn>
            <div className="flex items-center gap-2">
              <OrganizationSwitcher />

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
