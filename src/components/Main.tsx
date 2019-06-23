import Box from '@material-ui/core/Box'
import LinearProgress from '@material-ui/core/LinearProgress'
import Paper from '@material-ui/core/Paper'
import React from 'react'
import { useDataState } from '../contexts/dataContext'
import { useUiState } from '../contexts/uiContext'
import { normalizeWeights } from '../helpers/calculations'
import { WeightsTable } from './WeightsTable'
import { makeStyles } from '@material-ui/core'

export const Main = () => {
  const { selectedTab } = useUiState()
  const { loading, error, data } = useDataState()
  const classes = useStyles()

  if (loading) {
    return <LinearProgress />
  }

  if (error) {
    return null
  }

  const normalizedData = normalizeWeights(data, selectedTab)

  return (
    <main>
      <Box p={2} maxWidth={800} marginLeft="auto" marginRight="auto">
        <Paper className={classes.paper}>
          <WeightsTable data={normalizedData} period={selectedTab} />
        </Paper>
      </Box>
    </main>
  )
}

const useStyles = makeStyles({
  paper: {
    overflowX: 'auto',
  },
})
