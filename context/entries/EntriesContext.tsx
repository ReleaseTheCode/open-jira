import { Entry } from '@/interfaces';
import { createContext } from 'react';


interface ContextProps {
  entries: Entry[]
  addNewEntry: (description: string) => void
  updateEntry: (EntryNewStatus: Entry, showSnackbar?: boolean) => void
  deleteEntry: (deletedEntry: Entry) => void
}


export const EntriesContext = createContext({} as ContextProps)