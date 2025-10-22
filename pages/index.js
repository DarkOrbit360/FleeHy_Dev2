import { useState, useEffect } from "react";
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
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center text-center text-white py-24 px-6 md:py-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 100, 110, 0.55), rgba(0, 100, 110, 0.55)), url('/beach-bg.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay Text */}
        <div className="animate-fadeInUp max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            Trips Made Easier Than Ever Before
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-10">
            Discover unique travel experiences hosted by locals around the world.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={search}
            className="flex flex-col md:flex-row items-center gap-4 bg-white/20 backdrop-blur-md shadow-lg p-4 md:p-6 rounded-full max-w-4xl mx-auto border border-white/30"
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Destination"
              className="flex-1 px-4 py-3 rounded-full bg-white/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00c4b4]"
            />
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="px-4 py-3 rounded-full bg-white/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00c4b4]"
            />
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="px-4 py-3 rounded-full bg-white/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00c4b4]"
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

      {/* Trending Trips */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
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
