"use client";
import { api } from "@/convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";

import Image from "next/image";
import { FileIcon, Loader2, StarIcon } from "lucide-react";

import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FileCard } from "@/app/dashboard/_components/file-card";
import UploadButton from "@/app/dashboard/_components/upload-button";
import { SearchBar } from "@/app/dashboard/_components/search-bar";

function Placeholder() {
  return (
    <div className="mt-24 flex flex-col items-center gap-4">
      <Image
        alt="an image of a picture for adding files"
        width={300}
        height={300}
        src="/no files.svg"
      />
      <div className="text-2xl">You have no files, add one now!</div>
      <UploadButton />
    </div>
  );
}

export default function FileBrowser({
  title,
  favoritesOnly,
}: {
  title: string;
  favoritesOnly?: boolean;
}) {
  const organization = useOrganization();
  const user = useUser();
  const [query, setQuery] = useState("");

  let orgId: string | undefined = undefined;

  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const getAllFavorites = useQuery(
    api.file.getAllFavorites,
    orgId ? { orgId } : "skip",
  );

  const files = useQuery(
    api.file.getFiles,
    orgId ? { orgId, query, favorites: favoritesOnly } : "skip",
  );

  const isLoading = files === undefined;

  return (
    <div>
      {isLoading && (
        <div className="mt-24 flex flex-col items-center gap-4">
          <Loader2 className="size-32 animate-spin text-primary" />
          <div className="text-2xl text-muted-foreground">
            Loading your images...
          </div>
        </div>
      )}

      {!isLoading && (
        <>
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-4xl font-bold"> {title}</h1>

            <SearchBar setQuery={setQuery} query={query} />
            <UploadButton />
          </div>

          {files?.length === 0 && <Placeholder />}

          <div className="grid grid-cols-3 gap-4">
            {files?.map((file) => {
              return (
                <FileCard
                  key={file._id}
                  file={file}
                  favorites={getAllFavorites ?? []}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
