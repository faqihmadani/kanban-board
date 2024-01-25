import React, { useContext, useState } from 'react'
import ModalLayout from './ModalLayout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { AuthContext } from '../context/AuthContext'
import ConfirmDeleteModal from './ConfirmDeleteModal'
import { Bars } from 'react-loader-spinner'
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";


function ShowTaskModal({ handleOpenTaskModal, id, category, getTasks }) {
    const [editMode, setEditMode] = useState(false)
    const { token } = useContext(AuthContext)
    const [task, setTask] = useState({
        id: 0,
        title: "",
        description: "",
        category: "",
        index: 0,
    })
    const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false)

    const handleEdit = () => {
        setEditMode(!editMode)
    }

    const handleDeleteModal = () => {
        setIsOpenConfirmDelete(!isOpenConfirmDelete)
    }

    const handleChange = (e) => {
        setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })

            if (res.status === 200) {
                toast.success('Task has been deleted')
                // setEditMode(false)
                handleOpenTaskModal()
                handleDeleteModal()
                getTasks()
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchDataById = async (id) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            // const data = await res.data.data
            // console.log(res.data.data);

            setTask((prev) => {
                return { ...prev, ...res.data.data }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleSave = async () => {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/update/${id}`, task, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            if (res.status === 200) {
                toast.success('Task has been updated')
                handleOpenTaskModal()
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

    useState(() => {
        fetchDataById(id)
    }, [])

    return (
        <>
            {isOpenConfirmDelete && <ConfirmDeleteModal handleDeleteModal={handleDeleteModal}
                handleDelete={handleDelete} />}
            <ModalLayout handleOpenModal={handleOpenTaskModal}>
                <div className='flex flex-col gap-3'>
                    {editMode && <div className='flex flex-col gap-3'>
                        <input onChange={handleChange} value={task.title} name='title' className='p-2' placeholder='Title' type="text" />
                        <textarea onChange={handleChange} value={task.description} className='p-2' placeholder='Description' name="description" id="desc" cols="30" rows="10"></textarea>
                    </div>}
                    {!editMode && task.title && task.description && <div>
                        <h1 className='font-bold text-xl'>{task.title}</h1>
                        <h1 className='mt-2'>{task.description}</h1>
                    </div>
                    }
                    {!task.title && !task.description && <div className='flex justify-center'>
                        <Bars color='#301934' />
                    </div>}
                    {editMode ?
                        <div className='flex items-center justify-between mt-5'>
                            <button onClick={handleEdit} className='px-4 py-2 border-[2px] border-purple-950'>Cancel</button>
                            <button onClick={handleSave} className='px-4 py-2 flex items-center gap-2 bg-purple-950 border-[2px] border-purple-950 text-slate-50'>
                                <FaSave /> Save</button>
                        </div>
                        : <div className='flex items-center justify-between mt-5'>
                            <button onClick={handleEdit} className='px-4 py-2 flex items-center gap-2 bg-purple-950 border-[2px] border-purple-950 text-slate-50'>
                                <MdEdit /> Edit</button>
                            <button onClick={handleDeleteModal} className='px-4 py-2 flex items-center gap-2 bg-purple-950 border-[2px] border-purple-950 text-slate-50'>
                                <MdDeleteForever /> Delete</button>
                        </div>}

                    {!editMode && <button onClick={handleOpenTaskModal} className='px-4 py-2 border-[2px] border-purple-950'>Close</button>}
                </div>
            </ModalLayout>
        </>
    )
}

export default ShowTaskModal