import { FC, ReactNode, useEffect, useReducer } from 'react'
import { EntriesContext, entriesReducer } from './'
import { Entry } from '../../interfaces';
import  { entriesApi } from '@/apis';

export interface EntriesState {
  entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState  = {
  entries: [ ],
}

export const EntriesProvider: FC<{ children: ReactNode }> = ({ children }) => {

  const [state, dispatch] = useReducer( entriesReducer, Entries_INITIAL_STATE)

  const addNewEntry = async ( description: string ) => {
    const { data } = await entriesApi.post<Entry>('/entries', { description })
    
    dispatch({
      type: '[Entry] Add-Entry',
      payload: data
    })
  }

  const updateEntry = async( EntryNewStatus: Entry, showSnackbar = false ) => {
    const { _id, status, description } = EntryNewStatus
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { status, description })

      dispatch({
        type: '[Entry] Entry-Updated',
        payload: data
      })
      if( showSnackbar ) {
        enqueueSnackbar('Updated Entry',{
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }
        })
      }
      
    } catch (error) {
      console.log(`%c debug variable error ===>`, 'background:black;color:red', error)
    }    
  }

    } catch (error) {
      console.log(`%c debug variable error ===>`, 'background:black;color:red', error)
    }    
  }

  const refreshEntries = async() => {
    const { data } = await entriesApi.get<Entry[]>('/entries')
    dispatch({
      type: '[Entry] Refresh-Data',
      payload: data,
    })
  }

  useEffect(() => {
    refreshEntries()
  }, [])

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