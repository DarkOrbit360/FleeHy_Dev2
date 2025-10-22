import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/">
          <a className="text-2xl font-extrabold tracking-tight">Fleehy</a>
        </Link>

        <div className="flex items-center gap-6">
          {/* For now both point to login. Host carries a redirect param we'll use later */}
          <Link href="/login?next=/host-verification&source=host">
            <a className="hover:text-blue-600">Host</a>
          </Link>
          <Link href="/login?next=/">
            <a className="hover:text-blue-600">Login</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
