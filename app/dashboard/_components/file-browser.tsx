"use client";
import { api } from "@/convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";

import Image from "next/image";
import { Grid2X2, Loader2, Table2 } from "lucide-react";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { FileCard } from "@/app/dashboard/_components/file-card";
import UploadButton from "@/app/dashboard/_components/upload-button";
import { SearchBar } from "@/app/dashboard/_components/search-bar";
import { usePathname } from "next/navigation";
import { DataTable } from "./(file-table)/file-table";
import { columns } from "./(file-table)/columns";

function Placeholder() {
  const pathName = usePathname();

  if (pathName === "/dashboard/favorites") {
    return (
      <div className="mt-24 flex flex-col items-center gap-4">
        <Image
          alt="an image of a picture for adding files"
          width={300}
          height={300}
          src="/favorite.svg"
        />
        <div className="text-2xl">You have no favorites, add one now!</div>
        <UploadButton />
      </div>
    );
  }

  if (pathName === "/dashboard/trash") {
    return (
      <div className="mt-24 flex flex-col items-center gap-4">
        <Image
          alt="an image of a picture for adding files"
          width={300}
          height={300}
          src="/Trash.svg"
        />
        <div className="text-2xl">
          You have no deleted files for{" "}
          <span className="text-destructive">permanent deletion!</span>
        </div>
      </div>
    );
  }

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
  deletedOnly,
}: {
  title: string;
  favoritesOnly?: boolean;
  deletedOnly?: boolean;
}) {
  const organization = useOrganization();
  const user = useUser();
  const [query, setQuery] = useState("");
  const pathName = usePathname();

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
    orgId ? { orgId, query, favorites: favoritesOnly, deletedOnly } : "skip",
  );

  const isLoading = files === undefined;

  const modifiedFiles =
    files?.map((file) => ({
      ...file,
      isFavorited: (getAllFavorites ?? []).some(
        (favorite) => favorite.fileId === file._id,
      ),
    })) ?? [];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold"> {title}</h1>

        <SearchBar setQuery={setQuery} query={query} />
        <UploadButton />
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="grid" className="flex gap-1">
            <Grid2X2 className="size-5" />
            Grid
          </TabsTrigger>
          <TabsTrigger value="table" className="flex gap-1">
            <Table2 className="size-5" /> Table
          </TabsTrigger>
        </TabsList>

        {isLoading && (
          <div className="mt-24 flex flex-col items-center gap-4">
            <Loader2 className="size-32 animate-spin text-primary" />
            <div className="text-2xl text-muted-foreground">
              Loading your files...
            </div>
          </div>
        )}

        <TabsContent value="grid">
          <div className="grid grid-cols-3 gap-4">
            {modifiedFiles?.map((file) => {
              return <FileCard key={file._id} file={file} />;
            })}
          </div>
        </TabsContent>
        <TabsContent value="table">
          <DataTable columns={columns} data={modifiedFiles} />
        </TabsContent>
      </Tabs>

      {files?.length === 0 && <Placeholder />}
    </div>
  );
}
