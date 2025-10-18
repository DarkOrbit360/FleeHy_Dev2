import prisma from '../../../lib/prisma'

export default async function handler(req, res){
  const { id } = req.query
  if(req.method === 'GET'){
    const trip = await prisma.trip.findUnique({ where: { id: Number(id) } })
    return res.json(trip)
  }

  if(req.method === 'DELETE'){
    const trip = await prisma.trip.delete({ where: { id: Number(id) } })
    return res.json({ success: true })
  }

  res.status(405).end()
}
