"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FileIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SideNav() {
  const path = usePathname();

  return (
    <div className="w-40 gap-4">
      <Link
        href={"/dashboard/files"}
        className={cn(buttonVariants({ variant: "link" }), "flex gap-2", {
          "bg-muted": path.includes("/dashboard/files"),
        })}
      >
        <FileIcon className="size-4" /> All Files
      </Link>

      <Link
        href={"/dashboard/favorites"}
        className={cn(buttonVariants({ variant: "link" }), "flex gap-2", {
          "bg-muted": path.includes("/dashboard/favorites"),
        })}
      >
        <StarIcon className="size-4" /> Favorites
      </Link>
    </div>
  );
}
