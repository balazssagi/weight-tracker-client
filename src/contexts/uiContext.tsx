import React, { Reducer } from 'react'

type Tab = 'weekly' | 'monthly' | 'daily'
type Dialog = 'new-weight' | 'secret' | null

interface State {
  selectedTab: Tab
  activeDialog: Dialog
}

type Action =
  | { type: 'SET_SELECTED_TAB'; tab: Tab }
  | { type: 'SET_ACTIVE_DIALOG'; dialog: Dialog }

const initialState: State = {
  selectedTab: 'weekly',
  activeDialog: null,
}

const uiReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'SET_SELECTED_TAB':
      return {
        ...state,
        selectedTab: action.tab,
      }
    case 'SET_ACTIVE_DIALOG':
      return {
        ...state,
        activeDialog: action.dialog,
      }
  }
}

const UiStateContext = React.createContext<State | undefined>(undefined)
const UiDispatchContext = React.createContext<
  React.Dispatch<Action> | undefined
>(undefined)

export const UiContextProvider: React.FC = props => {
  const [uiState, setUiState] = React.useReducer(uiReducer, initialState)

  return (
    <UiStateContext.Provider value={uiState}>
      <UiDispatchContext.Provider value={setUiState}>
        {props.children}
      </UiDispatchContext.Provider>
    </UiStateContext.Provider>
  )
}

export const useUiState = () => {
  const context = React.useContext(UiStateContext)
  if (context === undefined) {
    throw new Error()
  }
  return context
}

export const useUiDispatch = () => {
  const context = React.useContext(UiDispatchContext)
  if (context === undefined) {
    throw new Error()
  }
  return context
}
