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
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] flex flex-col items-center justify-center text-center text-white overflow-hidden">
        
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center brightness-90"
          style={{
            backgroundImage: "url('/beach-bg.jpeg')", // using your image
          }}
        ></div>

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#007a8d]/40 via-[#006874]/30 to-[#004d58]/60"></div>

        {/* Hero Content */}
        <div className="relative z-10 px-4 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            Trips Made Easier Than Ever Before
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100">
            Discover unique travel experiences hosted by locals around the world.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={search}
            className="flex flex-col sm:flex-row items-center gap-3 bg-white/90 shadow-xl p-4 rounded-full max-w-4xl mx-auto backdrop-blur-md border border-gray-200/30"
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Destination"
              className="flex-1 px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00b3ad]"
            />
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00b3ad]"
            />
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00b3ad]"
            />
            <button
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-[#00b3ad] to-[#006874] text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform disabled:opacity-50"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>
        </div>
      </section>

      {/* Trending Trips Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
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

      {/* Footer with Gradient */}
      <footer className="bg-gradient-to-r from-[#006874] via-[#007a8d] to-[#008b9a] text-white py-6 mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
