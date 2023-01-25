import { FC, ReactNode, useReducer } from 'react'
import { EntriesContext, entriesReducer } from './'
import { Entry } from '../../interfaces';
import { v4 as uuidv4 } from 'uuid';

export interface EntriesState {
  entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState  = {
  entries: [
    {
      _id: uuidv4(), // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      description: 'Pending Lorem ipsum,  sit amet consectetur adipisicing elit.',
      createdAt: 1,
      status: 'pending'
    },
    {
      _id: uuidv4(), // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      description: 'WIP Lorem ipsum, dolor sit amet consectetur  elit.',
      createdAt: 2,
      status: 'in-progress'
    },
    {
      _id: uuidv4(), // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      description: 'DONE Lorem ipsum, dolor sit  consectetur adipisicing elit.',
      createdAt: 3,
      status: 'finished'
    },
  ]
}

export const EntriesProvider: FC<{ children: ReactNode }> = ({ children }) => {

  const [state, dispatch] = useReducer( entriesReducer, Entries_INITIAL_STATE)

  const addNewEntry = ( description: string ) => {
    const newEntry:Entry = {
      _id: uuidv4(),
      description,
      status: 'pending',
      createdAt: 1
    }
    
    dispatch({
      type: '[Entry] Add-Entry',
      payload: newEntry
    })
  }

  const updateEntry = ( EntryNewStatus: Entry ) => {
    dispatch({
      type: '[Entry] Entry-Updated',
      payload: EntryNewStatus
    })
  }

  return (
    <EntriesContext.Provider 
      value={{
        ...state,
        addNewEntry,
        updateEntry,
      }}
    > 
      { children }
    </EntriesContext.Provider>
  )
}