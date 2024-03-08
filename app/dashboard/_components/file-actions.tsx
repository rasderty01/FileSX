"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DownloadIcon,
  MoreVertical,
  StarIcon,
  Trash,
  Undo2Icon,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import { Doc, Id } from "@/convex/_generated/dataModel";

import { Protect } from "@clerk/nextjs";

export function getFileUrl(fileId: Id<"_storage">) {
  return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileId}`;
}

export function FileCardActions({
  file,
  isFavorited,
}: {
  file: Doc<"files">;
  isFavorited: boolean;
}) {
  const deleteFile = useMutation(api.file.deleteFile);
  const restoreFile = useMutation(api.file.restoreFile);
  const favorite = useMutation(api.file.toggleFavorite);
  const me = useQuery(api.users.getMe);

  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will send the file to Trash for our deletion process.
              Files are deleted periodically.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteFile({ fileId: file._id });
                toast({
                  title: "Sent to Trash",
                  description: "Your file has been moved to the trash",
                  variant: "default",
                });
                setOpen(false);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical className="size-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center gap-1 text-primary"
            onClick={() => window.open(getFileUrl(file.fileId), "_blank")}
          >
            <DownloadIcon className="size-4" />
            Download
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-1 text-primary"
            onClick={() => favorite({ fileId: file._id })}
          >
            {isFavorited ? (
              <div className="flex items-center gap-1">
                <StarIcon className="size-4" fill="yellow" /> Unfavorite
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <StarIcon className="size-4" /> Favorite{" "}
              </div>
            )}
          </DropdownMenuItem>

          <Protect
            condition={(check) => {
              return check({ role: "org:admin" }) || file.userId === me?._id;
            }}
            fallback={<></>}
          >
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center gap-1 "
              onClick={() => {
                if (file.shouldDelete) {
                  restoreFile({ fileId: file._id });
                } else {
                  setOpen(true);
                }
              }}
            >
              {file.shouldDelete ? (
                <div className="flex items-center gap-1 text-green-500">
                  <Undo2Icon className="size-4" /> Restore
                </div>
              ) : (
                <div className="flex items-center gap-1 text-destructive">
                  <Trash className="size-4" /> Delete
                </div>
              )}
            </DropdownMenuItem>
          </Protect>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
