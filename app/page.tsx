"use client";
import { api } from "@/convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import UploadButton from "./upload-button";
import { FileCard } from "./file-card";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function Home() {
  const organization = useOrganization();
  const user = useUser();

  let orgId: string | undefined = undefined;

  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(api.file.getFiles, orgId ? { orgId } : "skip");

  const isLoading = files === undefined;

  return (
    <main className="container mx-auto pt-12">
      {isLoading && (
        <div className="mt-24 flex flex-col items-center gap-4">
          <Loader2 className="size-32 animate-spin text-primary" />
          <div className="text-2xl text-muted-foreground">
            Loading your images...
          </div>
        </div>
      )}

      {!isLoading && files?.length === 0 && (
        <div className="mt-24 flex flex-col items-center gap-4">
          <Image
            alt="an image of a picture for adding files"
            width={300}
            height={300}
            src="/no files.svg"
          />
          <div>You have no files, add one now!</div>
          <UploadButton />
        </div>
      )}
      {!isLoading && files.length > 0 && (
        <>
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-4xl font-bold"> Your Files</h1>
            <UploadButton />
          </div>
        </>
      )}
      <div className="grid grid-cols-4 gap-4">
        {files?.map((file) => {
          return <FileCard key={file._id} file={file} />;
        })}
      </div>
    </main>
  );
}
