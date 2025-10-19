import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
      <Link href="/" className="text-2xl font-bold text-gray-800">
        Fleehy
      </Link>
      <div className="flex gap-6 text-gray-700">
        <Link href="/signup" className="hover:text-blue-600">Join Fleehy</Link>
        <Link href="/login" className="hover:text-blue-600">Login</Link>
        <Link href="/host-verification" className="hover:text-blue-600">Become a Host</Link>
        <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
      </div>
    </nav>
  );
}
