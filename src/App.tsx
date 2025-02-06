/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { StatusEnum, useAppState } from './state/useAppState';
import { useSeminars } from './state/useSeminars';
import seminar_logo from './assets/free-icon-machine-learning-3273713.png';
import seminars_header from './assets/seminars.png';
import delete_logo from './assets/free-icon-delete-479059.png';
import update_logo from './assets/free-icon-edit-tool-7487065.png';
import Facebook from './assets/socials_network/fb.svg?react';
import Inst from './assets/socials_network/inst.svg?react';
import YuoTube from './assets/socials_network/yt.svg?react';
import ReditLogo from './assets/socials_network/redit.svg?react';
import { Modal } from './utils/modal';
import { DeleteModal } from './components/deleteModal';
import { EditModal } from './components/editModal';

export type ActionType = 'edit' | 'delete' | null

export const App = () => {

  const { status, setInit } = useAppState(state => state)
  const { seminars, delete_data } = useSeminars(state => state)
  const [copied, setCopied] = useState<boolean>(false)
  const [choiseId, setChoiseId] = useState<number | undefined>(undefined)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [action, setAction] = useState<ActionType>(null)

  useEffect(() => { setInit() }, [])

  const removeSeminarHandle = (id: number) => {
    setChoiseId(id)
    setAction('delete')
    setIsModalOpen(true)
  }

  const editSeminarHandle = (id: number) => {
    setChoiseId(id)
    setAction('edit')
    setIsModalOpen(true)
  }

  const logotypeHendler = () => {
    alert('nihau Bro 🤟🏻')
  }

  const copyToClipboard = (data: string) => {
    navigator.clipboard.writeText(data).then(() => {
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 500)
    }).catch(err => {
      console.error('Ошибка при копировании текста: ', err);
    });
  };

  if (status === StatusEnum.LOADING) {
    return (
      <div>
        LOADING
      </div>
    )
  }


  if (status === StatusEnum.SUCCEEDED || status === StatusEnum.IDLE) {
    return (
      <div className='h-full min-h-screen w-screen flex flex-col justify-between  bg-amber-50'>
        <header className='w-screen h-[80px]'>
          <img src={seminars_header}
            alt="header logotype"
            width={100}
            className=' m-auto cursor-pointer'
            onClick={() => logotypeHendler()} />
        </header>
        <div className='relative flex flex-wrap justify-center  '>
          {seminars.map((s, key) => {
            return (
              <div key={s.id}
                className='border-[.5px] w-[30%] min-w-[300px] max-h-[200px] cursor-default  border-zinc-500 m-2 p-2 rounded-[8px] 
                hover:bg-amber-100 hover:drop-shadow-lg transition-all duration-200'>
                <div className='flex justify-between mb-2'>
                  <div className='uppercase font-bold text-zinc-500 flex '>
                    <div className=' min-w-[40px]'>
                      <img src={seminar_logo} width={40} alt="site with your pics is blicked 😢" />
                    </div>
                    <div className='mx-2'>{s.title}</div>
                  </div>
                  <div className='flex'>
                    <div className='cursor-pointer m-1 w-[20px]' onClick={() => editSeminarHandle(s.id)}>
                      <img src={update_logo} alt="for update seminars data" width={20} />
                    </div>
                    <div className='cursor-pointer m-1 w-[20px]' onClick={() => removeSeminarHandle(s.id)}>
                      <img src={delete_logo} alt="for remove seminar data" width={20} />
                    </div>
                  </div>

                </div>
                <div className='mx-12'>
                  <div onClick={() => copyToClipboard(s.date)}
                    className='text-[12px] font-bold text-zinc-500'>
                    DATE:  <span className='font-normal'>{s.date}</span>
                  </div>
                  <div className='text-[12px] font-bold text-zinc-500' onClick={() => copyToClipboard(s.time)}>
                    START AT:  <span className='font-normal'>{s.time}</span>
                  </div>
                  <div className='text-[12px] font-bold text-zinc-500'>
                    ABOUT SEMINAR:   <span className='font-normal'>{s.description}</span></div>
                </div>

              </div>
            )
          })}
        </div>
        <footer className='w-screen h-[80px] flex px-8 border-t-[.5px] border-zinc-500  rounded-[20px] justify-between items-center'>
          <div className='text-zinc-500 text-[12px] font-bold'>
            ADUCATION BUSINESS (c)
          </div>
          <div className='text-zinc-500 text-[12px]'>
            scinse 2025 jan
          </div>

          <div className='flex flex-row justify-around w-[20%]'>
            <div >
              <Facebook className='w-[40px] fill-slate-600 hover:fill-red-800 transition-colors duration-200' />
            </div>
            <div>
              <Inst className='w-[40px] fill-slate-600 hover:fill-red-800 transition-colors duration-200' />
            </div>
            <div>
              <YuoTube className='w-[40px] fill-slate-600 hover:fill-red-800 transition-colors duration-200' />
            </div>
            <div>
              <ReditLogo className='w-[40px] fill-slate-600 hover:fill-red-800 transition-colors duration-200' />
            </div>
          </div>
        </footer>
        {copied && <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-2 bg-cyan-100/50 text-center rounded-[8px] border-[.5px] border-zinc-500 text-zinc-800 '>copied!</div>}
        {isModalOpen && action === 'delete' &&
          <Modal
            children={<DeleteModal
              removeId={choiseId}
              delete_data={delete_data}
              onClose={setIsModalOpen}
              setAction={setAction} />}
            onClose={setIsModalOpen}
            modal_name='Удалить семинар?' />}
        {isModalOpen && action === 'edit' &&
          <Modal
            children={<EditModal
              editId={choiseId}
              onClose={setIsModalOpen}
            />}
            onClose={setIsModalOpen}
            modal_name='Редактирование Семинара' />}

      </div>
    )
  }


  if (status === StatusEnum.FAILED) {
    return (
      <div>
        FAILED
      </div>
    )
  }

}