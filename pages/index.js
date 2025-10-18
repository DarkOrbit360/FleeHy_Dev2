import Link from 'next/link'
import { useState } from 'react'
import TripCard from '../components/TripCard'

export default function Home(){
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  async function search(e){
    e.preventDefault()
    const res = await fetch(`/api/trips?destination=${encodeURIComponent(query)}`)
    const json = await res.json()
    setResults(json)
  }

  return (
    <div>
      <header className="py-12 text-center">
        <h1 className="text-4xl font-bold">Find curated trips by local planners</h1>
        <p className="mt-2 text-gray-600">Search destinations and connect with trip planners</p>
      </header>

      <form onSubmit={search} className="flex gap-2 mb-6">
        <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search destination" className="flex-1 p-3 border rounded" />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Search</button>
      </form>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {results.length === 0 ? (
          <p className="text-gray-500">Search for a destination to see trips.</p>
        ) : (
          results.map(t => <TripCard key={t.id} trip={t} />)
        )}
      </section>

      <div className="mt-8">
        <Link href="/register"><a className="underline">Become a trip planner</a></Link>
      </div>
    </div>
  )
}
