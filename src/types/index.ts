export interface Weight {
  date: string
  weight: number
  deviation?: number
}

export type Period = 'daily' | 'weekly' | 'monthly' | 'moving'
