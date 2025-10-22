import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 w-full bg-white border-t">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-600">
        <div className="flex flex-wrap gap-4">
          <Link href="/terms"><a className="hover:text-blue-600">Terms &amp; Conditions</a></Link>
          <Link href="/privacy"><a className="hover:text-blue-600">Privacy Policy</a></Link>
          <Link href="/cookies"><a className="hover:text-blue-600">Cookie Policy</a></Link>
          <Link href="/about"><a className="hover:text-blue-600">About Us</a></Link>
          <Link href="/help"><a className="hover:text-blue-600">Help</a></Link>
        </div>
        <p className="mt-4 text-gray-500">© Fleehy Ltd 2025 – 2026</p>
      </div>
    </footer>
  );
}
