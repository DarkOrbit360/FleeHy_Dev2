import Link from 'next/link'

export default function TripCard({ trip }){
  return (
    <div className="border rounded p-4 shadow-sm">
      <h3 className="font-semibold text-lg">{trip.title}</h3>
      <p className="text-sm text-gray-600">{trip.destination} • {trip.duration} days • ${trip.price}</p>
      <p className="mt-2 text-gray-700">{trip.description?.slice(0,120)}...</p>
      <div className="mt-4">
        <Link href={`/trips/${trip.id}`}><a className="text-blue-600">View trip</a></Link>
      </div>
    </div>
  )
}
