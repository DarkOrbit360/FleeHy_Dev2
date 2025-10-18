import { useState } from 'react'

export default function TripForm({ onDone }){
  const [title, setTitle] = useState('')
  const [destination, setDestination] = useState('')
  const [price, setPrice] = useState(0)
  const [duration, setDuration] = useState(1)
  const [description, setDescription] = useState('')

  async function submit(e){
    e.preventDefault()
    const body = { title, destination, price: Number(price), duration: Number(duration), description }
    await fetch('/api/trips', { method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify(body) })
    setTitle('')
    setDestination('')
    setPrice(0)
    setDuration(1)
    setDescription('')
    onDone && onDone()
  }

  return (
    <form onSubmit={submit} className="border p-4 rounded">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} className="p-2 border rounded" />
        <input placeholder="Destination" value={destination} onChange={e=>setDestination(e.target.value)} className="p-2 border rounded" />
        <input type="number" placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} className="p-2 border rounded" />
        <input type="number" placeholder="Duration (days)" value={duration} onChange={e=>setDuration(e.target.value)} className="p-2 border rounded" />
      </div>
      <textarea placeholder="Short description" value={description} onChange={e=>setDescription(e.target.value)} className="w-full p-2 border rounded mt-2" />
      <div className="mt-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Create Trip</button>
      </div>
    </form>
  )
}
