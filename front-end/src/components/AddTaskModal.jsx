import React, { useContext, useState } from 'react'
import ModalLayout from './ModalLayout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { AuthContext } from '../context/AuthContext'

function AddTaskModal({ handleOpenModal, category, getTasks }) {
    const [data, setData] = useState({
        title: "",
        description: "",
        category: category,
    })

    const { token } = useContext(AuthContext)

    const handleChange = (e) => {
        setData((prev) => { return { ...prev, [e.target.name]: e.target.value } })
    }

    const handleAddTask = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/create`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })

            // console.log(res);

            if (res.status === 201) {
                toast.success("New task has been added")
                handleOpenModal()
                getTasks()
            }
        } catch (error) {
            if (error.response.data.errors?.title) {
                toast.error(error.response.data.errors.title[0])
            }
            if (error.response.data.errors?.description) {
                toast.error(error.response.data.errors.description[0])
            }
        }
    }

    return (
        <>
            <ModalLayout handleOpenModal={handleOpenModal}>
                <div className='flex flex-col gap-3'>
                    <input onChange={handleChange} name='title' className='p-2' placeholder='Title' type="text" />
                    <textarea onChange={handleChange} className='p-2' placeholder='Description' name="description" id="desc" cols="30" rows="10"></textarea>
                    <div className='flex items-center justify-between'>
                        <button onClick={handleOpenModal} className='px-4 py-2 border-[2px] border-purple-950'>Cancel</button>
                        <button onClick={handleAddTask} className='px-4 py-2 bg-purple-950 border-[2px] border-purple-950 text-slate-50'>Add Task</button>
                    </div>
                </div>
            </ModalLayout>
        </>
    )
}

export default AddTaskModal