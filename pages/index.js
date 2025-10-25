import { useState, useEffect } from "react";
import TripCard from "../components/TripCard";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/trips");
        if (!res.ok) {
          // Handles HTTP errors (404, 500, etc.)
          throw new Error(`Server error: ${res.status}`);
        }
        const json = await res.json();
        setResults(json || []);
      } catch (e) {
        console.error("Trending trips load error:", e);
      }
    })();
  }, []);

  async function search(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `/api/trips?destination=${encodeURIComponent(query)}`
      );
      if (!res.ok) {
        // Handles HTTP errors (404, 500, etc.)
        throw new Error(`Server error: ${res.status}`);
      }
      const json = await res.json();
      setResults(json || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center text-center text-white py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 106, 112, 0.35), rgba(0, 106, 112, 0.35)), url('/beach.avif')",
        }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 animate-fade-in-up">
          Trips Made Easier Than Ever Before
        </h1>
        <p className="text-gray-600 mb-8">
          Plan, host, and explore immersive travel experiences through Fleehy.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/signup"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Join Fleehy
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
          >
            Login
          </Link>
        </div>
      </section>

      <form onSubmit={search} className="flex gap-2 mt-12 w-full max-w-md">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search destination"
          className="flex-1 p-3 border rounded-md shadow-sm"
        />
        <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-blue-700">
          Search
        </button>
      </form>

      <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {results.length === 0 ? (
          <p className="text-gray-500 text-center col-span-3">
            Start your search to see available trips.
          </p>
        ) : (
          results.map((t) => <TripCard key={t.id} trip={t} />)
        )}
      </section>

      <footer className="mt-16 text-center">
        <Link
          href="/host-verification"
          className="underline text-blue-600 hover:text-blue-800"
        >
          Become a Host
        </Link>
      </footer>
    </div>
  );
}
