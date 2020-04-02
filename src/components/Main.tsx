import Box from '@material-ui/core/Box'
import LinearProgress from '@material-ui/core/LinearProgress'
import Paper from '@material-ui/core/Paper'
import React, { useMemo } from 'react'
import { useDataState } from '../contexts/dataContext'
import { useUiState, useUiDispatch } from '../contexts/uiContext'
import { normalizeWeights, averageOfArray } from '../helpers/calculations'
import { WeightsTable } from './WeightsTable'
import { makeStyles } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'
import { Period } from '../types'
import moment from 'moment'

export const Main = () => {
  const { selectedTab } = useUiState()
  const uiDispatch = useUiDispatch()
  const { loading, error, data } = useDataState()

  const normalizedData1 = useMemo(() => normalizeWeights(data, 'weekly'), [
    data,
  ])
  const normalizedData2 = useMemo(() => normalizeWeights(data, 'monthly'), [
    data,
  ])
  const normalizedData3 = useMemo(() => normalizeWeights(data, 'daily'), [data])

  const movingAverage = useMemo(() => {
    const result = []
    if (data.length === 0) {
      return []
    }
    const DAYS = 7
    let i = 0
    while (true) {
      if (i > data.length - 1) {
        break
      }
      const firstDate = moment(data[i].date)
      const lastDate = moment(data[i].date).subtract(DAYS, 'days')
      const we = data.filter(d => moment(d.date).isBetween(lastDate, firstDate))
      const average = averageOfArray(we.map(w => w.weight))
      result.push({
        date: `${firstDate.format('MM. DD.')} – ${lastDate.format('MM. DD.')}`,
        weight: average,
      })
      i = i + DAYS + 1
    }
    return result
  }, [data])

  if (loading) {
    return <LinearProgress />
  }

  if (error) {
    return null
  }

  const dict: Record<Period, number> = {
    weekly: 0,
    moving: 1,
    monthly: 2,
    daily: 3,
  }

  const dict2: Record<number, Period> = {
    0: 'weekly',
    1: 'moving',
    2: 'monthly',
    3: 'daily',
  }

  return (
    <main>
      <SwipeableViews
        containerStyle={{ height: 'calc(100vh - 104px)' }}
        index={dict[selectedTab]}
        onChangeIndex={index => {
          uiDispatch({ type: 'SET_SELECTED_TAB', tab: dict2[index] })
        }}
      >
        <Box p={2} maxWidth={800} marginLeft="auto" marginRight="auto">
          <WeightsTable data={normalizedData1} period={'weekly'} />
        </Box>
        <Box p={2} maxWidth={800} marginLeft="auto" marginRight="auto">
          <WeightsTable data={movingAverage} period={'weekly'} />
        </Box>
        <Box p={2} maxWidth={800} marginLeft="auto" marginRight="auto">
          <WeightsTable data={normalizedData2} period={'monthly'} />
        </Box>
        <Box p={2} maxWidth={800} marginLeft="auto" marginRight="auto">
          <WeightsTable data={normalizedData3} period={'daily'} />
        </Box>
      </SwipeableViews>
    </main>
  )
}
