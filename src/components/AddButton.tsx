import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import moment from 'moment'
import React from 'react'
import { useDataState } from '../contexts/dataContext'
import { useUiDispatch } from '../contexts/uiContext'
import { useScrollDirection } from '../hooks/useScrollDirection'
import { makeStyles, Theme } from '@material-ui/core'

export const AddButton = () => {
  const dataState = useDataState()
  const uiDispatch = useUiDispatch()
  const today = moment().dayOfYear()
  const scrollDirection = useScrollDirection()

  const isHidden =
    !!dataState.data.find(entry => {
      return moment(entry.date).dayOfYear() === today
    }) ||
    scrollDirection === 'down' ||
    dataState.loading ||
    dataState.error

  const classes = useStyles({ isHidden })

  return (
    <Fab
      className={classes.root}
      color="primary"
      aria-label="Add"
      onClick={() => {
        uiDispatch({ type: 'SET_ACTIVE_DIALOG', dialog: 'new-weight' })
      }}
    >
      <AddIcon />
    </Fab>
  )
}

const useStyles = makeStyles<Theme, { isHidden: boolean }>({
  root: {
    position: 'fixed',
    bottom: 15,
    right: 15,
    transform: props => (props.isHidden ? 'scale(0)' : 'scale(1)'),
    transition: props =>
      props.isHidden
        ? 'all 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045)'
        : 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
})
