import { ActionType } from "../App"





type deleteModalType = {
    onClose: React.Dispatch<React.SetStateAction<boolean>>
    removeId: number | undefined
    delete_data: (id: number) => void
    setAction: React.Dispatch<React.SetStateAction<ActionType>>

}



export const DeleteModal = ({ onClose, removeId, delete_data, setAction }: deleteModalType) => {


    const removeSeminar = () => {
        console.log(removeId)
        if (removeId) {
            delete_data(removeId)
            setAction(null)
            onClose(false)
        }
    }

    return (
        <div className="m-4 mt-25 flex flex-col  items-center text-zinc-500 text-[20px] font-bold">
            <div>Вы уверены что хотите удалить семинар? </div>
            <div className="flex justify-around w-[200px] mt-10">
                <div onClick={() => removeSeminar()} className="inline-flex justify-center hover:bg-red-700 hover:text-white p-2 rounded-[10px] cursor-pointer transition-all delay-100">удалить </div>
                <div onClick={() => onClose(false)} className=" inline-flex justify-center hover:bg-green-700 hover:text-white p-2 rounded-[10px] cursor-pointer transition-all delay-100">нет</div>
            </div>
        </div>
    )
}