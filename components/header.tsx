import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

export function Header() {
  return (
    <div className="border-b bg-gray-50 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div>Filesxk</div>
        <div className="flex gap-2">
          <OrganizationSwitcher />

          <UserButton />
        </div>
      </div>
    </div>
  );
}
