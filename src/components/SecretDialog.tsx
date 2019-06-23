import React, { useState, FormEvent } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useUiDispatch, useUiState } from '../contexts/uiContext'

export const SecretDialog = () => {
  const uiState = useUiState()
  const uiDispatch = useUiDispatch()
  const [newSecret, setNewSecret] = useState('')

  const closeDialog = () => {
    uiDispatch({ type: 'SET_ACTIVE_DIALOG', dialog: null })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    localStorage.setItem('secret', newSecret)
    closeDialog()
  }

  return (
    <Dialog open={uiState.activeDialog === 'secret'} onClose={closeDialog}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Enter Secret</DialogTitle>
        <DialogContent>
          <TextField
            value={newSecret}
            label="Secret"
            type="text"
            name="secret"
            variant="outlined"
            autoFocus
            onChange={e => {
              setNewSecret(e.target.value)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button color="default" onClick={closeDialog}>
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
