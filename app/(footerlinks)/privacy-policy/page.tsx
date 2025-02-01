import type { Metadata } from "next";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for our file upload service - how we collect, use, and protect your data",
  openGraph: {
    title: "Privacy Policy",
    description:
      "Privacy policy for our file upload service - how we collect, use, and protect your data",
  },
};

export default function PrivacyPolicy() {
  return (
    // Component content remains the same
    <main className="container mx-auto px-4 py-12">
      <Card>
        <CardContent className="prose max-w-none pt-6">
          <h1 className="mb-6 text-2xl font-bold">Privacy Policy</h1>

          <h2 className="mb-4 mt-8 text-xl font-semibold">
            1. Information Collection
          </h2>
          <p>We collect:</p>
          <ul className="mb-4 list-disc pl-6">
            <li>File metadata (name, size, type)</li>
            <li>Upload timestamp</li>
            <li>IP address</li>
            <li>Basic usage analytics</li>
          </ul>

          <h2 className="mb-4 mt-8 text-xl font-semibold">2. Data Usage</h2>
          <p>Collected information is used to:</p>
          <ul className="mb-4 list-disc pl-6">
            <li>Provide and maintain the service</li>
            <li>Improve user experience</li>
            <li>Detect and prevent abuse</li>
          </ul>

          <h2 className="mb-4 mt-8 text-xl font-semibold">3. Data Storage</h2>
          <p>
            Files and associated data are stored securely. We implement
            appropriate measures to protect against unauthorized access.
          </p>

          <h2 className="mb-4 mt-8 text-xl font-semibold">4. Data Sharing</h2>
          <p>
            We do not sell or share personal information with third parties
            except:
          </p>
          <ul className="mb-4 list-disc pl-6">
            <li>When required by law</li>
            <li>To protect our rights or property</li>
            <li>With service providers under confidentiality agreements</li>
          </ul>

          <h2 className="mb-4 mt-8 text-xl font-semibold">5. User Rights</h2>
          <p>Users have the right to:</p>
          <ul className="mb-4 list-disc pl-6">
            <li>Access their personal data</li>
            <li>Request data deletion</li>
            <li>Opt out of non-essential data collection</li>
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
