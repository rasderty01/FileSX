"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "convex/react";
import { formatRelative } from "date-fns";
import { FileCardActions } from "../file-actions";

function UserCell({ userId }: { userId: Id<"users"> }) {
  const userProfile = useQuery(api.users.getUserProfile, {
    userId: userId,
  });

  return (
    <div className="flex w-44 items-center gap-2 text-xs">
      <Avatar className="size-8">
        <AvatarImage src={userProfile?.image} />
        <AvatarFallback>
          {userProfile?.name?.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {userProfile?.name}
    </div>
  );
}

export const columns: ColumnDef<
  Doc<"files"> & {
    isFavorited: boolean;
  }
>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    header: "User",
    cell: ({ row }) => {
      return <UserCell userId={row.original.userId} />;
    },
  },
  {
    header: "Uploaded On",
    cell: ({ row }) => {
      return (
        <div className="">
          {formatRelative(new Date(row.original._creationTime), new Date())}
        </div>
      );
    },
  },

  {
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="">
          <FileCardActions
            file={row.original}
            isFavorited={row.original.isFavorited}
          />
        </div>
      );
    },
  },
];
