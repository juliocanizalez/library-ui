import { Link } from "@heroui/link";

import { Navbar } from "@/components/common/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://github.com/juliocanizalez/library-ui/blob/master/README.md"
          title="Read the docs"
        >
          <span className="text-default-600">Read the docs</span>
        </Link>
      </footer>
    </div>
  );
}
