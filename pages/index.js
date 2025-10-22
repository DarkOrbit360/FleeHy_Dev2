import Link from "next/link";
import { useEffect, useState } from "react";
import TripCard from "../components/TripCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load trending trips (latest) on first render
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/trips"); // no query => latest
        const json = await res.json();
        setResults(json || []);
      } catch (e) {
        console.error("Failed to load trending trips", e);
      }
    })();
  }, []);

  async function search(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/trips?destination=${encodeURIComponent(query)}`);
      const json = await res.json();
      setResults(json || []);
    } catch (e) {
      console.error("Search failed", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero + Search */}
      <section className="w-full">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Where do you want to go?
          </h1>
          <p className="mt-3 text-gray-600">
            TRIPS MADE EASY THAN EVER BEFORE......
          </p>

          <form onSubmit={search} className="mt-8 mx-auto flex gap-2 max-w-2xl">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Destination"
              className="flex-1 p-3 border rounded-md shadow-sm bg-white"
              aria-label="Search destination"
            />
            <button
              disabled={loading}
              className="px-5 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>
        </div>
      </section>

      {/* Trending Trips */}
      <section className="w-full">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl font-semibold mb-4">Trending Trips (Recommendations)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results && results.length > 0 ? (
              results.map((t) => <TripCard key={t.id} trip={t} />)
            ) : (
              <div className="col-span-full text-gray-500 text-center">
                {loading ? "Loading trips..." : "No trips yet. Try a different destination."}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
