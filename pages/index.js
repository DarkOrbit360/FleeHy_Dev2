import { useState, useEffect } from "react";
import Link from "next/link";
import TripCard from "../components/TripCard";
import Footer from "../components/Footer";

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
      const res = await fetch(`/api/trips?destination=${encodeURIComponent(query)}`);
      const json = await res.json();
      setResults(json || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-4 py-20 md:py-32 bg-cover bg-center bg-no-repeat w-full animate-fade-in-up"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,105,115,0.45), rgba(0,105,115,0.45)), url('/beach-bg.jpeg')",
        }}
      >
        <div className="text-white drop-shadow-md">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Trips Made Easier Than Ever Before
          </h1>
          <p className="text-lg text-gray-100 mb-10">
            Discover unique travel experiences hosted by locals around the world.
          </p>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={search}
          className="flex flex-col sm:flex-row items-center gap-3 bg-white bg-opacity-95 shadow-xl p-4 rounded-full max-w-4xl w-[90%] sm:w-auto"
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Destination"
            className="flex-1 px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <button
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-[#00b3ad] to-[#007a8d] text-white font-semibold rounded-full shadow hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </section>

      {/* Trending Trips */}
      <section className="max-w-6xl mx-auto px-4 pb-20 mt-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Trending Trips
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.length > 0 ? (
            results.map((t) => <TripCard key={t.id} trip={t} />)
          ) : (
            <div className="col-span-full text-gray-500 text-center">
              {loading ? "Loading..." : "No trips yet. Try searching a destination."}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
