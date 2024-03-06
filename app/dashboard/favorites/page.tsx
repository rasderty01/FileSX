"use client";
import { useQuery } from "convex/react";
import FileBrowser from "../_components/file-browser";
import { api } from "@/convex/_generated/api";

export default function FavoritesPage() {
  return (
    <div>
      <FileBrowser title="Your Favorites" favorites={true} />
    </div>
  );
}
