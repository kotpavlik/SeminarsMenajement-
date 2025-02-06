import { AxiosError } from 'axios'
import { create } from 'zustand'
import { HandleError } from '../utils/ErrorHandler'
import { StatusEnum, useAppState } from './useAppState'
import { SeminarsAPI } from '../api/getSeminarsAPI'



export interface SeminarsType {
  seminars: Array<SeminarType>
  get_data: () => void
  update_data: (update_data: SeminarType) => void
  delete_data: (id: number) => void

}
export interface SeminarType {
  id: number
  title: string
  description: string
  date: string
  time: string
  photo: string
}

export const useSeminars = create<SeminarsType>((set, get) => ({
  seminars: [],
  get_data: async () => {
    const setStatus = useAppState.getState()
    try {
      setStatus.setStatus(StatusEnum.LOADING)
      const seminars_data = await SeminarsAPI.getSeminar()
      set({ seminars: seminars_data })
      setStatus.setStatus(StatusEnum.SUCCEEDED)
    } catch (error) {
      const err = error as Error | AxiosError
      HandleError(err)
      setStatus.setStatus(StatusEnum.FAILED)
    }
  },

  update_data: async (up_data: SeminarType) => {
    const setStatus = useAppState.getState()
    try {
      if (up_data.id) {
        setStatus.setStatus(StatusEnum.LOADING)
        const updateSeminarData = await SeminarsAPI.updateSeminar(up_data)
        const newSeminars = get().seminars.map((s) => s.id === updateSeminarData.id ? { ...updateSeminarData } : s)
        set({ seminars: newSeminars })
        setStatus.setStatus(StatusEnum.SUCCEEDED)
      }
    } catch (error) {
      const err = error as Error | AxiosError
      HandleError(err)
      setStatus.setStatus(StatusEnum.FAILED)
    }



  },
  delete_data: async (id: number) => {
    const error = useAppState.getState()
    const setStatus = useAppState.getState()

    try {
      if (id) {
        setStatus.setStatus(StatusEnum.LOADING)
        const removeSeminar = await SeminarsAPI.removeSeminar(id)
        set((state) => ({
          seminars: state.seminars.filter((s) => s.id !== removeSeminar.id)
        }))
        setStatus.setStatus(StatusEnum.SUCCEEDED)
      } else {
        error.setError('this seminar not found')
      }
    } catch (error) {
      const err = error as Error | AxiosError
      HandleError(err)
      setStatus.setStatus(StatusEnum.FAILED)
    }

  }
}))

