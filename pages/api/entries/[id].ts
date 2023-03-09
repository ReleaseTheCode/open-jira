import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { db } from '@/database';
import { Entry, IEntry } from '@/models';

type Data = 
{ message: string }
| IEntry

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

  const { id } = req.query;

  if( !mongoose.isValidObjectId(id)) {
    return res.status(400).json({message: 'not valid id' + id})
  }

  switch (req.method) {
    case 'PUT':
      return updateEntry(req,res)
    case 'GET':
      return getEntry(req,res)
    case 'DELETE':
      return deleteEntry(req,res)
  
    default:
      return res.status(400).json({ message: 'unexpected method' })
  }
}

const updateEntry = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
  const { id } = req.query;
  await db.connect()

  const entryToUpdate = await Entry.findById( id );

  if( !entryToUpdate ){
    await db.disconnect()
    return res.status(400).json({message: 'Entry not found'})
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status
  } = req.body

  try {
    const updatedEntry = await Entry.findByIdAndUpdate( id, { description, status }, { runValidators: true, new: true })
    await db.disconnect()
    res.status(200).json( updatedEntry! )
  } catch (error: any ) {
    await db.disconnect()
    res.status(400).json({ message: error })
  }

  /*
  Another way to update low cost, but verbose and lose validators
  entryToUpdate.description = description
  entryToUpdate.status = status
  entryToUpdate.save()
  */
 
}

const deleteEntry = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
  const { id } = req.query;
  await db.connect()

  try {
    const deletedEntry = await Entry.findByIdAndDelete(id,  { runValidators: true, new: true })
    await db.disconnect()
    res.status(200).json( deletedEntry! )
  } catch (error: any ) {
    await db.disconnect()
    res.status(400).json({ message: error })
  }
}

const getEntry = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
  const { id } = req.query;
  await db.connect()
  const requestedEntry = await Entry.findById( id );
  await db.disconnect()

  if( !requestedEntry ){
    return res.status(400).json({message: 'Entry not found'})
  }

  res.status(200).json( requestedEntry )
}
