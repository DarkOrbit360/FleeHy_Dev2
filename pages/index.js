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
        className="relative h-[90vh] flex flex-col justify-center items-center text-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1950&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#008b9a]/90 via-[#007a8d]/80 to-[#006874]/85"></div>

        <div className="relative z-10 max-w-3xl px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 drop-shadow-lg">
            Trips Made Easier Than Ever Before
          </h1>
          <p className="text-lg text-teal-100 mb-10">
            Discover unique travel experiences hosted by locals around the world.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={search}
            className="bg-[#007a8d]/90 backdrop-blur-lg rounded-3xl p-5 shadow-xl flex flex-col md:flex-row gap-4 md:gap-2 items-center max-w-4xl mx-auto"
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Destination"
              className="flex-1 px-5 py-3 rounded-2xl bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#32d1c0]"
            />
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="px-5 py-3 rounded-2xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#32d1c0]"
            />
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="px-5 py-3 rounded-2xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#32d1c0]"
            />
            <button
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-[#00d0b5] to-[#00a4b5] text-white font-semibold rounded-2xl hover:opacity-90 shadow-md transition disabled:opacity-50"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>
        </div>
      </section>

      {/* Trending Trips */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Trending Trips</h3>
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
