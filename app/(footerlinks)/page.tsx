import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import { Share2, FolderKanban, Shield, Zap } from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="relative space-y-20">
      {/* Gradient Background */}
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

      {/* Hero Section */}
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
              href="#features"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to manage your files
          </h2>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {[
              {
                name: "Smart Sharing",
                description:
                  "Share files securely with customizable access controls and expiring links.",
                icon: Share2,
              },
              {
                name: "Advanced Organization",
                description:
                  "Keep your files organized with folders, tags, and smart filters.",
                icon: FolderKanban,
              },
              {
                name: "Built with Security",
                description:
                  "Powered by Clerk authentication and real-time Convex database.",
                icon: Shield,
              },
            ].map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon
                    className="h-5 w-5 flex-none text-blue-600"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple Pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Get started for free today. No credit card required.
          </p>
        </div>
        <div className="mx-auto mb-10 mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              Free Plan
            </h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Perfect for personal use and small teams
            </p>
            <div className="mt-8 flex items-center gap-x-4">
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
              {[
                "Unlimited file storage",
                "Secure file sharing",
                "Real-time collaboration",
                "Advanced organization tools",
              ].map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <Zap
                    className="h-6 w-5 flex-none text-blue-600"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">
                  Get started today
                </p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    $0
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                    /month
                  </span>
                </p>
                <SignUpButton>
                  <Button
                    variant={"default"}
                    className="mt-10 w-full bg-blue-600"
                  >
                    Get started
                  </Button>
                </SignUpButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
