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
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section
        className="relative w-full h-[80vh] bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center text-white"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 105, 115, 0.45), rgba(0, 105, 115, 0.45)), url('/beach-bg.jpeg')",
        }}
      >
        <div className="text-center px-6 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
            Trips Made Easier Than Ever Before
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-100 drop-shadow-sm">
            Discover unique travel experiences hosted by locals around the world.
          </p>
        </div>

        {/* SEARCH BAR */}
        <form
          onSubmit={search}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 bg-white/90 backdrop-blur-md p-4 rounded-full shadow-lg w-[90%] max-w-4xl"
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Destination"
            className="flex-1 px-4 py-3 rounded-full border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="px-4 py-3 rounded-full border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="px-4 py-3 rounded-full border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <button
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-[#00b3ad] to-[#008b9a] text-white font-semibold rounded-full shadow hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </section>

      {/* TRENDING TRIPS */}
      <section className="flex-1 bg-[#f8fafc] px-6 py-16">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Trending Trips
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {results.length > 0 ? (
            results.map((t) => <TripCard key={t.id} trip={t} />)
          ) : (
            <div className="col-span-full text-gray-500 text-center">
              {loading ? "Loading..." : "No trips yet. Try searching a destination."}
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
