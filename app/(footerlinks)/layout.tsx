export default function FooterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="container mx-auto min-h-screen pt-12">{children}</main>
  );
}
