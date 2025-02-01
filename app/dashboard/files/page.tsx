import { useConvexAuth } from "convex/react";
import FileBrowser from "../_components/file-browser";

export default function FilePages() {
  return (
    <div>
      <FileBrowser title="Your Files" />
    </div>
  );
}
