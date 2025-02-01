import type { Metadata } from "next";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using our file upload service",
  openGraph: {
    title: "Terms of Service",
    description: "Terms and conditions for using our file upload service",
  },
};

export default function TermsOfService() {
  return (
    // Component content remains the same
    <main className="container mx-auto px-4 py-12">
      <Card>
        <CardContent className="prose max-w-none pt-6">
          <h1 className="mb-6 text-2xl font-bold">Terms of Service</h1>

          <h2 className="mb-4 mt-8 text-xl font-semibold">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using this file upload service, you agree to be
            bound by these Terms of Service and all applicable laws and
            regulations.
          </p>

          <h2 className="mb-4 mt-8 text-xl font-semibold">
            2. File Upload Guidelines
          </h2>
          <p>Users may upload files subject to the following conditions:</p>
          <ul className="mb-4 list-disc pl-6">
            <li>Files must not contain malicious code, viruses, or malware</li>
            <li>Files must not infringe on intellectual property rights</li>
            <li>Files must comply with all applicable laws and regulations</li>
          </ul>

          <h2 className="mb-4 mt-8 text-xl font-semibold">3. Service Usage</h2>
          <p>We reserve the right to:</p>
          <ul className="mb-4 list-disc pl-6">
            <li>
              Modify or terminate the service for any reason without notice
            </li>
            <li>Remove content that violates these terms</li>
            <li>Restrict or terminate access to the service</li>
          </ul>

          <h2 className="mb-4 mt-8 text-xl font-semibold">4. Liability</h2>
          <p>
            {`The service is provided "as is" without warranties of any kind. We
            are not liable for any damages arising from service use or file
            loss.`}
          </p>

          <h2 className="mb-4 mt-8 text-xl font-semibold">
            5. Changes to Terms
          </h2>
          <p>
            We may modify these terms at any time. Continued use of the service
            constitutes acceptance of modified terms.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
