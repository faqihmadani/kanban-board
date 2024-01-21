import React from 'react'

function ConfirmDeleteModal({ handleDeleteModal, handleDelete }) {

    const confirmDelete = () => {
        handleDelete()
    }

    return (
        <>
            <div className='fixed z-20 h-screen w-screen'>
                <div onClick={handleDeleteModal} className='fixed  h-screen w-screen flex items-center justify-center bg-black bg-opacity-45'>
                </div>
                <div className='bg-slate-200 font-serif p-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9/12 md:w-6/12 lg:w-4/12'>
                    <h1>Are you sure to delete this task?</h1>
                    <div className='flex items-center justify-between mt-5'>
                        <button onClick={handleDeleteModal} className='px-4 py-2 border-[2px] border-purple-950'>Cancel</button>
                        <button onClick={confirmDelete} className='px-4 py-2 bg-purple-950 border-[2px] border-purple-950 text-slate-50'>Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmDeleteModal