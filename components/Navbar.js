import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white bg-opacity-80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-3xl font-extrabold text-[#008b9a] tracking-tight">
          FLEEHY
        </Link>
        <div className="flex items-center gap-6 text-gray-700 font-medium">
          <Link href="/login?from=host" className="hover:text-[#00a2b8]">Host</Link>
          <Link href="/login" className="hover:text-[#00a2b8]">Login</Link>
        </div>
      </div>
    </nav>
  );
}
