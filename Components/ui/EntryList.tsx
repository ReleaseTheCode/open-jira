import { DragEvent, FC, useContext, useMemo } from 'react';
import { List, Paper } from '@mui/material'
import { EntryCard } from './EntryCard';
import { EntryStatus } from '../../interfaces';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '@/context/ui';

import style from './EntryList.module.css'

interface Props {
  status: EntryStatus
}

export const EntryList: FC<Props> = ( { status } ) => {

  const { entries, updateEntry } = useContext( EntriesContext )
  const { isDragging, endDragging } = useContext( UIContext )
  const entriesByStatus = useMemo(
    () => entries.filter( entry => entry.status === status )
  ,[entries])

  const allowDrop = (event:DragEvent<HTMLDivElement>) =>{
    event.preventDefault()

  }

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text')
    const updatedEntry = entries.find( entry => entry._id === id )!
    updateEntry({...updatedEntry, status})
    endDragging()
  }


  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop} 
      className={ isDragging ? style['dragging'] : '' }
    >
      <Paper
        sx={{
          height: 'calc(100vh - 190px)',
          overflow: 'hidden',
          backgroundColor: 'transparent',
          padding: 1
        }}
      >
        <List sx={{ opacity: isDragging ? .2: 1, transition: 'all .4s' }}>
          {
            entriesByStatus.map( eachEntry => <EntryCard key={ eachEntry._id } entry={ eachEntry } /> )
          }
        </List>
      </Paper>
    </div>
  )
}
