import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { formatRelative } from "date-fns";
import { FileTextIcon, GanttChartIcon, ImageIcon } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";
import { FileCardActions } from "./file-actions";

export function FileCard({
  file,
}: {
  file: Doc<"files"> & {
    isFavorited: boolean;
  };
}) {
  const userProfile = useQuery(api.users.getUserProfile, {
    userId: file.userId,
  });
  const fileUrl = useQuery(api.file.getFileUrl, { fileId: file.fileId });

  const typeIcons = {
    image: <ImageIcon />,
    pdf: <FileTextIcon />,
    csv: <GanttChartIcon />,
  } as Record<Doc<"files">["type"], ReactNode>;

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-2 truncate text-base font-normal">
          <div className="flex justify-center">{typeIcons[file.type]}</div>
          {file.name}
        </CardTitle>
        <div className="absolute right-5 top-5">
          <FileCardActions isFavorited={file.isFavorited} file={file} />
        </div>
      </CardHeader>
      <CardContent className="flex h-[200px] items-center justify-center">
        {file.type === "image" && fileUrl && (
          <Image
            alt={file.name}
            width={200}
            height={100}
            src={fileUrl}
            className="rounded"
          />
        )}
        {file.type === "csv" && (
          <Image alt="a csv file" width={200} height={200} src="/csv.svg" />
        )}
        {file.type === "pdf" && (
          <Image
            alt="a pdf file"
            width={200}
            height={200}
            src="/pdf.svg"
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
