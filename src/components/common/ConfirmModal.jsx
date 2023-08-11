
import React from 'react'

export const ConfirmModal = ({modalData}) => {
  return (
    <div>
        <p>{modalData.text1}</p>
        <p>{modalData.text2}</p>
        <div className='flex gap-3'>
        <button onClick={modalData.handler1}>{modalData.btn1}</button>
        <button onClick={modalData.handler2}>{modalData.btn2}</button>
        </div>
    </div>
  )
}
