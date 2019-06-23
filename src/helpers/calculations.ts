import { Period, Weight } from '../types'
import moment from 'moment'

const averageOfArray = (arr: number[]) =>
  arr.reduce((acc, current) => acc + current, 0) / arr.length

export const normalizeWeights = (weights: Weight[], time: Period) => {
  const weightsByPeriod = weights
    .reduce<{ date: string; weights: number[] }[]>((acc, current) => {
      const newDate = moment(current.date)

      let calculated = ''
      if (time === 'daily') {
        calculated = newDate.format('MMMM Do')
      } else if (time === 'weekly') {
        calculated = newDate.isoWeek().toString()
      } else if (time === 'monthly') {
        calculated = newDate.format('MMMM')
      }

      const index = acc.findIndex(e => e.date === calculated)
      if (index !== -1) {
        acc[index].weights.push(current.weight)
      } else {
        acc.push({ date: calculated, weights: [current.weight] })
      }
      return acc
    }, [])
    .map(entry => ({
      date: entry.date,
      weight: averageOfArray(entry.weights),
    }))
  return weightsByPeriod
}
