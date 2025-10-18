import prisma from '../../../lib/prisma'

export default async function handler(req, res){
  if(req.method === 'GET'){
    const { destination } = req.query
    const where = destination ? { where: { destination: { contains: destination, mode: 'insensitive' } } } : {}
    const trips = await prisma.trip.findMany(where)
    return res.json(trips)
  }

  if(req.method === 'POST'){
    const { title, destination, price, duration, description } = req.body
    let planner = await prisma.user.findFirst({ where: { email: 'demo@fleehy.local' } })
    if(!planner){
      planner = await prisma.user.create({ data: { email: 'demo@fleehy.local', name: 'Demo Planner', role: 'PLANNER' } })
    }

    const trip = await prisma.trip.create({ data: {
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g,'-'),
      destination,
      price,
      duration,
      description,
      plannerId: planner.id
    }})

    return res.json(trip)
  }

  res.status(405).end()
}
