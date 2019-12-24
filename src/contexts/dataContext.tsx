import React, { Reducer, useEffect } from 'react'
import { Weight } from '../types'
import { getWeights } from '../Api'
import { useSnackbar } from 'notistack'

interface State {
  data: Weight[]
  loading: boolean
  error: boolean
  year: number
}

type Action =
  | { type: 'SET_DATA'; data: Weight[] }
  | { type: 'ADD_DATA'; data: Weight }
  | { type: 'SET_YEAR'; year: number }
  | { type: 'DATA_FETCH_ERROR' }

const initialState: State = {
  data: [],
  loading: true,
  error: false,
  year: new Date().getFullYear(),
}

const dataReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        data: action.data,
        loading: false,
        error: false,
      }
    case 'ADD_DATA':
      return {
        ...state,
        data: [action.data, ...state.data],
        loading: false,
      }
    case 'SET_YEAR':
      return {
        ...state,
        loading: true,
        year: action.year,
      }
    case 'DATA_FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: true,
      }
  }
}

const DataStateContext = React.createContext<State | undefined>(undefined)
const DataDispatchContext = React.createContext<
  React.Dispatch<Action> | undefined
>(undefined)

export const DataContextProvider: React.FC = props => {
  const [dataState, setDataState] = React.useReducer(dataReducer, initialState)
  const { year } = dataState
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    let ignore = false
    const getData = async () => {
      try {
        const weights = await getWeights(year)
        if (ignore) return
        setDataState({ type: 'SET_DATA', data: weights })
      } catch (e) {
        if (ignore) return
        setDataState({ type: 'DATA_FETCH_ERROR' })
      }
    }
    getData()
    return () => {
      ignore = true
    }
  }, [enqueueSnackbar, year])

  useEffect(() => {
    if (dataState.error === true) {
      enqueueSnackbar('Failed to get weights.', { variant: 'error' })
    }
  }, [dataState, enqueueSnackbar])

  return (
    <DataStateContext.Provider value={dataState}>
      <DataDispatchContext.Provider value={setDataState}>
        {props.children}
      </DataDispatchContext.Provider>
    </DataStateContext.Provider>
  )
}

export const useDataState = () => {
  const context = React.useContext(DataStateContext)
  if (context === undefined) {
    throw new Error()
  }
  return context
}

export const useDataDispatch = () => {
  const context = React.useContext(DataDispatchContext)
  if (context === undefined) {
    throw new Error()
  }
  return context
}
