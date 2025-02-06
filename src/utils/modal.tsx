

type ModalType = {
    onClose: React.Dispatch<React.SetStateAction<boolean>>
    modal_name: string
    children: React.ReactNode;
}


export const Modal = ({ onClose, modal_name, children }: ModalType) => {


    return (
        <div className="fixed inset-0 bg-[#3c4a49]/50 bg-opacity-50 flex items-center justify-center ">
            <div className={`modal-content 
                    relative
                    h-[60%]
                    w-[50%]
                   bg-amber-50
                    border-t-[.5px] border-zinc-500 
                      `}>
                <div className='flex w-full flex-row justify-between '>
                    <h2 className="bg-[#3c4a49] cursor-default text-white text-xl h-[50px] p-2 rounded-br-[15px] ">
                        {modal_name}
                    </h2>

                </div>

                <div className='h-[100%]
                    w-[100%] overflow-y-scroll'>
                    {children}

                </div>

            </div>
        </div>
    );
};