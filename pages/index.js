import { useState, useEffect } from "react";
import TripCard from "../components/TripCard";
import Footer from "../components/Footer";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Load trending trips on first render
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

  // Handle search
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
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* ===== HERO SECTION ===== */}
      <section
        className="relative w-full h-[100vh] bg-cover bg-center flex flex-col items-center justify-center text-center text-white overflow-hidden"
        style={{ backgroundImage: "url('/beach-bg.jpeg')" }}
      >
        {/* Soft gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#007a8d]/60 to-[#005f6b]/70"></div>

        <div className="relative z-10 px-4 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            Trips Made Easier Than Ever Before
          </h1>
          <p className="text-lg md:text-xl mb-10 drop-shadow-md">
            Discover unique travel experiences hosted by locals around the world.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={search}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 bg-white/95 backdrop-blur-md shadow-lg p-4 rounded-full max-w-4xl mx-auto"
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Destination"
              className="flex-1 px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00b3ad] text-gray-700"
            />
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00b3ad] text-gray-700"
            />
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00b3ad] text-gray-700"
            />
            <button
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-[#00b3ad] to-[#007a8d] text-white font-semibold rounded-full shadow hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>
        </div>
      </section>

      {/* ===== TRENDING TRIPS ===== */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-8">
          Trending Trips
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.length > 0 ? (
            results.map((t) => <TripCard key={t.id} trip={t} />)
          ) : (
            <div className="col-span-full text-gray-500">
              {loading ? "Loading..." : "No trips yet. Try searching a destination."}
            </div>
          )}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gradient-to-r from-[#007a8d] to-[#006874] text-white text-center py-6 mt-auto">
        <div className="flex flex-wrap justify-center gap-6 text-sm mb-3">
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookie Policy</a>
          <a href="#">About Us</a>
          <a href="#">Help</a>
        </div>
        <p className="text-xs text-white/80">
          © FleeHy Ltd 2025 – 2026
        </p>
      </footer>
    </div>
  );
}
