import React from 'react'

function ModalLayout({ children, handleOpenModal }) {
    return (
        <div className='fixed h-screen w-screen'>
            <div onClick={handleOpenModal} className='fixed  h-screen w-screen flex items-center justify-center bg-black bg-opacity-45'>
            </div>
            <div className='bg-slate-200 font-serif p-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 md:w-7/12 lg:w-5/12'>
                {children}
            </div>
        </div>
    )
}

export default ModalLayout