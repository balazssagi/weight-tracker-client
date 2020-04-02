import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { makeStyles, Paper, Box } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import React from 'react'
import { Period, Weight } from '../types'
import { AreaChart, Area, XAxis, ResponsiveContainer, YAxis } from 'recharts'

interface Props {
  data: Weight[]
  period: Period
}

const dict: Record<Period, string> = {
  daily: 'Day',
  moving: 'Period',
  weekly: 'Week',
  monthly: 'Month',
}

const WeightsTable: React.FC<Props> = props => {
  const { data, period } = props
  const classes = useStyles()
  const theme = useTheme()

  console.log(data)

  return (
    <>
      <Box mb={2}>
        <Paper>
          <ResponsiveContainer width="100%" aspect={2}>
            <AreaChart
              data={[...data]
                .map(data => ({ ...data, weight: data.weight.toFixed(2) }))
                .reverse()}
              margin={{ top: 5, bottom: 5 }}
            >
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tick={{ fill: theme.palette.primary.dark }}
              />
              <YAxis
                domain={[60, 'dataMax']}
                mirror
                tickLine={false}
                axisLine={false}
                tick={{ fill: theme.palette.primary.dark }}
              />
              <Area
                dot={false}
                isAnimationActive={false}
                dataKey="weight"
                stroke={theme.palette.primary.main}
                fill={theme.palette.primary.light}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Paper>
      </Box>
      <Paper>
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
      </Paper>
    </>
  )
}

class CustomizedAxisTick extends React.Component<any> {
  render() {
    const { x, y, stroke, payload } = this.props

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
        >
          {payload.value}
        </text>
      </g>
    )
  }
}

const memoed = React.memo(WeightsTable)

export { memoed as WeightsTable }

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
