export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="container mx-auto flex min-h-screen items-center justify-center pt-12">
      <div className="w-full">{children}</div>
    </main>
  );
}
