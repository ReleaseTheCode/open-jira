import { ChangeEvent, useState, useContext } from 'react';
import { Box, Button, TextField } from '@mui/material';

import SaveIcon from '@mui/icons-material/Save';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';


export const NewEntry = () => {

  const { addNewEntry } = useContext( EntriesContext)
  const { isAddingEntry, setIsAddingEntry } = useContext( UIContext)

  const [inputValue, setInputValue] = useState('')

  const [touched, setTouched] = useState(false)

  const onSave = () => {
    if( inputValue.length === 0 ) return

    addNewEntry(inputValue)
    setIsAddingEntry(false)
    setTouched(false)
    setInputValue('')
  }

  const onTextFieldChanged = (event:ChangeEvent< HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAddingEntry ? (
      <>
        <TextField
          fullWidth
          sx={{ marginTop: 2, marginBottom: 1 }}
          placeholder='Nueva Entrada'
          autoFocus
          multiline
          label='Nueva Entrada'
          helperText={ inputValue.length <= 0 && touched && 'Ingrese un task' }
          error={ inputValue.length <= 0 && touched }
          value={inputValue}
          onChange={onTextFieldChanged}
          onBlur={ () => setTouched(true) }
        />
        <Box display='flex' justifyContent='space-between'>
          <Button
            variant='text'
            onClick={ () => setIsAddingEntry(false) }
            >
            Cancelar
          </Button>

          <Button
            variant='outlined'
            color='secondary'
            endIcon={<SaveIcon/>}
            onClick={onSave}
          >
            Save
          </Button>
        </Box>
      </>
      )
      : (
        <Button
          startIcon={<AddCircleOutlineOutlinedIcon />}
          fullWidth
          variant='outlined'
          onClick={ () => setIsAddingEntry(true) }
        >
          Add Task
        </Button>
      )
      }
    </Box>
  )
}
