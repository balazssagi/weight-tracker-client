import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { makeStyles } from '@material-ui/core'
import React from 'react'
import { Period, Weight } from '../types'

interface Props {
  data: Weight[]
  period: Period
}

const dict: Record<Period, string> = {
  daily: 'Day',
  weekly: 'Week',
  monthly: 'Month',
}

export const WeightsTable: React.FC<Props> = props => {
  const { data, period } = props
  const classes = useStyles()

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>{dict[period]}</TableCell>
          <TableCell align="right">Weight&nbsp;(kg)</TableCell>
          <TableCell align="right">Delta&nbsp;(kg)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((entry, i) => {
          const diff = data[i + 1] ? entry.weight - data[i + 1].weight : 0

          return (
            <TableRow
              key={i}
              className={i % 2 === 0 ? classes.zebraRow : undefined}
            >
              <TableCell component="th" scope="row">
                {entry.date}
              </TableCell>
              <TableCell align="right">
                <strong>{entry.weight.toFixed(2)}</strong>
              </TableCell>
              <TableCell align="right">
                {diff > 0 && <span className={classes.positive}>▲ </span>}
                {diff < 0 && <span className={classes.negative}>▼ </span>}
                {Math.abs(diff).toFixed(2)}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

const useStyles = makeStyles(theme => ({
  positive: {
    color: theme.successColor.main,
  },
  negative: {
    color: theme.palette.error.main,
  },
  zebraRow: {
    backgroundColor: theme.palette.divider,
  },
}))
