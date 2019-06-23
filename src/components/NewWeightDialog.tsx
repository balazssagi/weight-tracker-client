import React, { useState, FormEvent } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import moment from 'moment'
import { useDataDispatch } from '../contexts/dataContext'
import { useUiDispatch, useUiState } from '../contexts/uiContext'
import { addWeight } from '../Api'
import { useSnackbar } from 'notistack'

export const NewWeightDialog = () => {
  const dataDispatch = useDataDispatch()
  const uiState = useUiState()
  const uiDispatch = useUiDispatch()
  const [newWeight, setNewWeight] = useState('')
  const { enqueueSnackbar } = useSnackbar()

  const closeDialog = () => {
    uiDispatch({ type: 'SET_ACTIVE_DIALOG', dialog: null })
  }

  const handleSubmit = async (e: FormEvent) => {
    const weight = parseFloat(newWeight)
    e.preventDefault()

    closeDialog()

    try {
      await addWeight(weight)
      dataDispatch({
        type: 'ADD_DATA',
        data: {
          date: moment().toISOString(),
          weight,
        },
      })
    } catch (e) {
      enqueueSnackbar('Failed to save weight.', { variant: 'error' })
    }
  }

  return (
    <Dialog open={uiState.activeDialog === 'new-weight'} onClose={closeDialog}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add Weight</DialogTitle>
        <DialogContent>
          <TextField
            value={newWeight}
            label="Weight (kg)"
            type="number"
            name="weight"
            variant="outlined"
            autoFocus
            onChange={e => {
              setNewWeight(e.target.value)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button color="default" onClick={closeDialog}>
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
