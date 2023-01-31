import { db } from '@/database'
import { Entry, IEntry } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = { message: string } | IEntry[]


export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getEntries( res )

    default:
      return res.status(400).json({ message: 'Invalid Request by method' })
  }
}

const getEntries = async( res: NextApiResponse<Data> ) => {
  await db.connect()

  const entries = await Entry.find().sort({ createdAt: 'asc' })

  await db.disconnect()
  res.status(200).json( entries )
}