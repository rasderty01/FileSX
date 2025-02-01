import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about our file upload service and mission",
};

export default function About() {
  return (
    <main className="container mx-auto px-4 py-12">
      <Card>
        <CardContent className="prose max-w-none pt-6">
          <h1 className="mb-6 text-2xl font-bold">About Us</h1>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold">Our Mission</h2>
            <p>
              We provide a secure and efficient file upload service that helps
              users share and manage their files with confidence.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold">What We Offer</h2>
            <ul className="list-disc pl-6">
              <li>Secure file storage with advanced encryption</li>
              <li>Easy-to-use upload interface</li>
              <li>Reliable file management system</li>
              <li>24/7 file availability</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">Security First</h2>
            <p>
              Your security is our priority. We employ industry-standard
              security measures to protect your files and data.
            </p>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
