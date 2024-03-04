"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";

import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useOrganization,
  useUser,
} from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { fi } from "date-fns/locale";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Loader2, RefreshCw, RotateCw } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, "Required").max(200),
  file: z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .refine((files) => files?.length > 0, "Required"),
});

export default function Home() {
  const organization = useOrganization();
  const user = useUser();
  const generateUploadUrl = useMutation(api.file.generateUploadUrl);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      file: undefined,
    },
  });

  const fileRef = form.register("file");

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    if (!orgId) return;
    const postUrl = await generateUploadUrl();
    const res = await fetch(postUrl, {
      method: "Post",
      headers: {
        "Content-Type": data.file[0].type,
      },
      body: data.file[0],
    });
    const { storageId } = await res.json();

    try {
      await createFile({
        name: data.title,
        fileId: storageId,
        orgId,
      });

      toast({
        title: "File uploaded",
        description: "Now everyone can view your file",
        variant: "success",
      });

      form.reset();
      setIsFileDialogOpen(false);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your file could not be uploaded, try again later",
        variant: "destructive",
      });
    }
  }

  let orgId: string | undefined = undefined;

  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);

  const files = useQuery(api.file.getFiles, orgId ? { orgId } : "skip");
  const createFile = useMutation(api.file.createFile);
  return (
    <main className="container mx-auto pt-12">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold"> Your Files</h1>
        <Dialog
          open={isFileDialogOpen}
          onOpenChange={(isOpen) => {
            setIsFileDialogOpen(isOpen);
            form.reset();
          }}
        >
          <DialogTrigger asChild>
            <Button>Upload File</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-8">Upload your File Here</DialogTitle>
              <DialogDescription>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter title" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="file"
                      render={() => (
                        <FormItem>
                          <FormLabel>File</FormLabel>
                          <FormControl>
                            <Input type="file" {...fileRef} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="size-4 animate-spin" /> Submitting{" "}
                        </div>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </form>
                </Form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      {files?.map((file) => {
        return <div key={file._id}>{file.name}</div>;
      })}
    </main>
  );
}
