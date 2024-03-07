import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertTriangle,
  DownloadIcon,
  FileTextIcon,
  GanttChartIcon,
  ImageIcon,
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReactNode, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import { Doc, Id } from "@/convex/_generated/dataModel";
import Image from "next/image";
import { Protect } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

function FileCardActions({
  file,
  isFavorited,
}: {
  file: Doc<"files">;
  isFavorited: boolean;
}) {
  const deleteFile = useMutation(api.file.deleteFile);
  const restoreFile = useMutation(api.file.restoreFile);
  const favorite = useMutation(api.file.toggleFavorite);

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

          <Protect role="org:admin" fallback={<></>}>
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

function getFileUrl(fileId: Id<"_storage">) {
  return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileId}`;
}

export function FileCard({
  file,
  favorites,
}: {
  file: Doc<"files">;
  favorites: Doc<"favorites">[];
}) {
  const userProfile = useQuery(api.users.getUserProfile, {
    userId: file.userId,
  });
  const typeIcons = {
    image: <ImageIcon />,
    pdf: <FileTextIcon />,
    csv: <GanttChartIcon />,
  } as Record<Doc<"files">["type"], ReactNode>;

  const isFavorited = favorites.some(
    (favorite) => favorite.fileId === file._id,
  );

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-2 truncate text-base font-normal">
          <div className="flex justify-center">{typeIcons[file.type]}</div>
          {file.name}
        </CardTitle>
        <div className="absolute right-5 top-5">
          <FileCardActions isFavorited={isFavorited} file={file} />
        </div>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent className="flex h-[200px] items-center justify-center">
        {file.type === "image" && (
          <Image
            alt={file.name}
            width={200}
            height={100}
            src={getFileUrl(file.fileId)}
            className="rounded"
          />
        )}
        {file.type === "csv" && (
          <Image alt="a csv file" width={200} height={200} src={`/csv.svg`} />
        )}
        {file.type === "pdf" && (
          <Image
            alt="a pdf file"
            width={200}
            height={200}
            src={`/pdf.svg`}
            className=""
          />
        )}
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        <div className="flex w-44 items-center gap-2 text-xs">
          <Avatar className="size-8">
            <AvatarImage src={userProfile?.image} />
            <AvatarFallback>
              {userProfile?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {userProfile?.name}
        </div>
        <div className="text-xs text-muted-foreground">
          Uploaded {formatRelative(new Date(file._creationTime), new Date())}
        </div>
      </CardFooter>
    </Card>
  );
}
