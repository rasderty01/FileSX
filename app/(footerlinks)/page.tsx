import { Button } from "@/components/ui/button";
import { FileBox } from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="relative space-y-5">
      <div
        className="absolute -top-36 -z-20 transform-gpu overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-red-400 to-blue-600 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-center gap-10">
          <div className="flex flex-col space-y-4 text-blue-600">
            <h1 className="flex items-center gap-2 text-5xl font-bold tracking-tighter">
              Fi
            </h1>
            <h1 className="flex items-center gap-2 text-5xl font-bold tracking-tighter">
              Les
            </h1>
            <h1 className="flex items-center gap-2 text-5xl font-bold tracking-tighter">
              Tor
            </h1>
            <h1 className="flex items-center gap-2 text-5xl font-bold tracking-tighter">
              Age
            </h1>
          </div>
          <div className="flex items-center justify-center py-10">
            <Image alt="" src="/storage.svg" width={300} height={300} />
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Secure your files in every step of the way
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Fi Lestorage is a secure cloud storage service that allows you to
            securely store, access your files and invite members.
          </p>
          <div className="my-10 flex items-center justify-center gap-x-6">
            <SignUpButton>
              <Button variant={"default"} className="bg-blue-600">
                Get started
              </Button>
            </SignUpButton>

            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
