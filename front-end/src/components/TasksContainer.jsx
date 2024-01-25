import React, { useContext, useEffect } from 'react'
import TaskList from './TaskList'
import { FaPlusCircle } from "react-icons/fa";
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../pages/Home';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';

function TasksContainer({ tasks, category, status, handleOpenModal, handleOpenTaskModal, getTasks }) {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.TASK,
        drop: (item) => addItemToCategory(item),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }))

    const { token } = useContext(AuthContext)

    const addItemToCategory = async (item) => {
        try {
            if (item.category !== category) {
                const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/update/category/${item.id}`, { category: category }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                })

                getTasks()
                toast.success('Your task status has been updated')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div ref={drop} className={`w-full min-h-[450px] p-5 shadow-lg ${isOver ? 'bg-slate-200' : 'bg-slate-50'}`}>
            <h1 className='text-xl font-semibold'>{status}</h1>
            <button onClick={() => handleOpenModal(category)} className='w-full py-3 text-slate-50 flex items-center justify-center mt-5 bg-purple-700 hover:bg-purple-800 gap-2'>
                <div className='text-xl'>
                    <FaPlusCircle />
                </div>
                <h1 className='font-semibold'>Add Task</h1>
            </button>

            <div className='mt-5 flex flex-col-reverse gap-2'>
                {tasks.map((task) => {
                    if (task.category === category) {
                        return <div key={task.id}>
                            <TaskList category={task.category} index={task.index} description={task.description} id={task.id} title={task.title} handleOpenTaskModal={handleOpenTaskModal} />
                        </div>
                    }
                })}
            </div>
        </div>
    )
}

export default TasksContainer