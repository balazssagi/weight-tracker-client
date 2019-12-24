import { makeStyles, Button, Menu, MenuItem } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import React, { useEffect, useState } from 'react'
import { useUiDispatch, useUiState } from '../contexts/uiContext'
import { useDataDispatch, useDataState } from '../contexts/dataContext'
import { ArrowDropDown } from '@material-ui/icons'

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
        <YearSelect />
      </Toolbar>
      <Tabs
        className={classes.tabs}
        TabIndicatorProps={{ className: classes.tabIndicator }}
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

const YearSelect = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const dataDispatch = useDataDispatch()
  const dataState = useDataState()
  const styles = useStyles()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const setYear = (year: number) => {
    setAnchorEl(null)
    if (dataState.year !== year) {
      dataDispatch({ type: 'SET_YEAR', year })
    }
  }

  return (
    <div>
      <Button
        className={styles.yearButton}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {dataState.year} <ArrowDropDown></ArrowDropDown>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            setYear(2019)
          }}
        >
          2019
        </MenuItem>
        <MenuItem
          onClick={() => {
            setYear(2020)
          }}
        >
          2020
        </MenuItem>
      </Menu>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    position: 'sticky',
    boxShadow: 'none',
  },
  toolbar: {
    boxShadow: theme.shadows[2],
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabs: {
    background: theme.palette.primary.dark,
  },
  tabIndicator: {
    background: theme.palette.primary.contrastText,
    height: 3,
    borderRadius: '5px 5px 0px 0px',
  },
  yearButton: {
    color: theme.palette.primary.contrastText,
  },
}))
