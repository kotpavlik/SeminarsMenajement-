import axios, { AxiosError } from "axios";
import { useAppState } from "../state/useAppState";

//this handler helps update async errors 

export const HandleError = (err: Error | AxiosError) => {
    const { setError } = useAppState.getState()

    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
        setError(error)
    } else {
        setError(`Native error ${err.message}`)
    }
}