import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-gray-600 flex flex-wrap gap-4 justify-center">
        <Link href="/terms" className="hover:text-[#00a2b8]">Terms & Conditions</Link>
        <Link href="/privacy" className="hover:text-[#00a2b8]">Privacy Policy</Link>
        <Link href="/cookies" className="hover:text-[#00a2b8]">Cookie Policy</Link>
        <Link href="/about" className="hover:text-[#00a2b8]">About Us</Link>
        <Link href="/help" className="hover:text-[#00a2b8]">Help</Link>
      </div>
      <div className="text-center text-gray-500 text-xs pb-4">
        © Fleehy Ltd 2025 – 2026
      </div>
    </footer>
  );
}
