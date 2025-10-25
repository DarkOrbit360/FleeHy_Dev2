import Link from 'next/link';
import { useState } from 'react';
import TripCard from '../components/TripCard';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  async function search(e) {
    e.preventDefault();
    const res = await fetch(`/api/trips?destination=${encodeURIComponent(query)}`);
    const json = await res.json();
    setResults(json);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
      <header className="text-center max-w-2xl">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          Discover Curated Trips by Local Hosts
        </h1>
        <p className="text-gray-600 mb-8">
          Plan, host, and explore immersive travel experiences through Fleehy.
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/signup" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
           
              Join Fleehy
          
          </Link>
          <Link href="/login" className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
           
              Login
            
          </Link>
        </div>
      </header>

      <form
        onSubmit={search}
        className="flex gap-2 mt-12 w-full max-w-md"
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search destination"
          className="flex-1 p-3 border rounded-md shadow-sm"
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
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
        <Link href="/host-verification" className="underline text-blue-600 hover:text-blue-800">
          
            Become a Host
         
        </Link>
      </footer>
    </div>
  );
}
