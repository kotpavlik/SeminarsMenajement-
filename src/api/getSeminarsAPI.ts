import { SeminarType } from '../state/useSeminars';
import { instance } from './api';



export const SeminarsAPI = {
    async getSeminar(): Promise<SeminarType[]> {
        const response = await instance.get<SeminarType[]>('seminars')
        return response.data
    },
    async removeSeminar(id: number): Promise<SeminarType> {
        const response = await instance.delete<SeminarType>(`seminars/${id}`)
        return response.data
    },
    async updateSeminar(updateData: SeminarType): Promise<SeminarType> {
        const response = await instance.put<SeminarType>(`seminars/${updateData.id}`, updateData)
        return response.data
    },

}