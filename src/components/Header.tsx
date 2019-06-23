import { makeStyles } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import React, { useEffect, useState } from 'react'
import { useUiDispatch, useUiState } from '../contexts/uiContext'

export const Header = () => {
  const [titleClickCount, setTitleClickCount] = useState(0)
  const { selectedTab: selectedTabIndex } = useUiState()
  const uiDispatch = useUiDispatch()
  const classes = useStyles()

  useEffect(() => {
    if (titleClickCount === 7) {
      uiDispatch({ type: 'SET_ACTIVE_DIALOG', dialog: 'secret' })
      setTitleClickCount(0)
    }
  }, [titleClickCount, uiDispatch])

  return (
    <AppBar className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          color="inherit"
          onClick={() => setTitleClickCount(count => count + 1)}
        >
          Weight Tracker
        </Typography>
      </Toolbar>
      <Tabs
        className={classes.tabs}
        indicatorColor="primary"
        value={selectedTabIndex}
        onChange={(_, value) => {
          uiDispatch({ type: 'SET_SELECTED_TAB', tab: value })
        }}
      >
        <Tab color="#00ff00" label="Weekly" value="weekly" />
        <Tab label="Monthly" value="monthly" />
        <Tab label="Daily" value="daily" />
      </Tabs>
    </AppBar>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    position: 'sticky',
    boxShadow: 'none',
  },
  toolbar: {
    boxShadow: theme.shadows[2],
  },
  tabs: {
    background: theme.palette.primary.dark,
  },
}))
