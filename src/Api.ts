import Axios from 'axios'
import { Weight } from './types'

const axiosInstance = Axios.create({ baseURL: process.env.REACT_APP_API_URL })

export const getWeights = async () => {
  const res = await axiosInstance.get<Weight[]>('weights', {
    params: { secret: localStorage.getItem('secret') },
  })
  return res.data
}

export const addWeight = async (weight: number) => {
  const res = await axiosInstance.post<Weight[]>('weights', {
    weight,
    secret: localStorage.getItem('secret'),
  })
  return res.data
}
