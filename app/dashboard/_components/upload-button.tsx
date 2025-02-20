"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";

import { useOrganization, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";

const formSchema = z.object({
  title: z.string().min(1, "Required").max(200),
  file: z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .refine((files) => files?.length > 0, "Required"),
});

export default function UploadButton() {
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
    if (!orgId) return;

    const types = {
      "image/png": "image",
      "application/pdf": "pdf",
      "text/csv": "csv",
    } as Record<string, Doc<"files">["type"]>;

    const postUrl = await generateUploadUrl();
    const fileType = data.file[0].type;
    //check for file type

    if (fileType in types === false) {
      toast({
        title: "Invalid file type",
        description: "Only png, pdf and csv files are allowed",
        variant: "destructive",
      });
      return;
    }

    const res = await fetch(postUrl, {
      method: "Post",
      headers: {
        "Content-Type": fileType,
      },
      body: data.file[0],
    });
    const { storageId } = await res.json();

    try {
      await createFile({
        name: data.title,
        fileId: storageId,
        orgId,
        type: types[fileType],
      });

      toast({
        title: "File uploaded",
        description: "Now everyone can view your file",
        variant: "success",
      });

      form.reset();
      setIsFileDialogOpen(false);
    } catch (error) {
      console.log(error);
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

  const createFile = useMutation(api.file.createFile);
  return (
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
                <Button type="submit" disabled={form.formState.isSubmitting}>
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
        <DialogFooter className="text-xs text-muted-foreground">
          {`Note: You can only upload ".png," ".pdf" and ".csv" file types!`}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
