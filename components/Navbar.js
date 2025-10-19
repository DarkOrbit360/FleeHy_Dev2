import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
      <Link href="/">
        <a className="text-2xl font-bold text-gray-800">Fleehy</a>
      </Link>
      <div className="flex gap-6 text-gray-700">
        <Link href="/signup">
          <a className="hover:text-blue-600">Join Fleehy</a>
        </Link>
        <Link href="/login">
          <a className="hover:text-blue-600">Login</a>
        </Link>
        <Link href="/host-verification">
          <a className="hover:text-blue-600">Become a Host</a>
        </Link>
        <Link href="/dashboard">
          <a className="hover:text-blue-600">Dashboard</a>
        </Link>
      </div>
    </nav>
  );
}
