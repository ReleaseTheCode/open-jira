import { FC, ReactNode, useReducer } from 'react'
import { EntriesContext, entriesReducer } from './'
import { Entry } from '../../interfaces';
import { v4 as uuidv4 } from 'uuid';

export interface EntriesState {
  entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState  = {
  entries: [ ],
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