import { AxiosError } from 'axios'
import { create } from 'zustand'
import { HandleError } from '../utils/ErrorHandler'
import { useSeminars } from './useSeminars'

export enum StatusEnum {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed'
}
export interface AppType {
  status: StatusEnum
  error: string | null
  initialize: boolean
  setStatus: (loading: StatusEnum) => void
  setError: (error: string) => void
  setInit: () => void
}


export const useAppState = create<AppType>((set, get) => ({
  status: StatusEnum.IDLE,
  error: null,
  initialize: false,
  setStatus: (status: StatusEnum) => {
    if (status) {
      set({ status })
    }

  },
  setError: (error: string) => {
    if (error) {
      set({ error })
    }
  },
  setInit: async () => {

    const getSeminars = useSeminars.getState();

    try {
      // if we have a lot of data for initializing. For example: user,seminars,subscribers, and we will need await for this all data 
      await Promise.all([getSeminars.get_data()])
      set({ status: StatusEnum.SUCCEEDED })
      set({ initialize: true })
    } catch (error) {
      const err = error as Error | AxiosError
      HandleError(err)
      set({ status: StatusEnum.FAILED })
    }
  }
}))

