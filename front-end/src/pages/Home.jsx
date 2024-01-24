import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext.jsx';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddTaskModal from '../components/AddTaskModal.jsx';
import ShowTaskModal from '../components/ShowTaskModal.jsx';
import TasksContainer from '../components/TasksContainer.jsx';

export const ItemTypes = {
    TASK: 'task'
}

function Home() {
    const [tasks, setTasks] = useState([])
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isOpenTaskModal, setIsOpenTaskModal] = useState(false)
    const [category, setCategory] = useState("")
    const [taskId, setTaskId] = useState(0)

    const { currentUser, token, logout } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleLogout = async () => {
        const res = await logout(token)
        if (res.status === 200) {
            navigate('/login')
        }
    }

    const getTasks = async () => {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        // console.log(res.data.tasks);
        setTasks(res.data.tasks)
    }

    const handleOpenModal = (category) => {
        setIsOpenModal(!isOpenModal)
        setCategory(category)
    }

    const handleOpenTaskModal = (category, id) => {
        // console.log(isOpenModal);
        setIsOpenTaskModal(!isOpenTaskModal)
        setCategory(category)
        setTaskId(id)
    }

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <>
            {/* Modal */}
            {isOpenModal && <AddTaskModal handleOpenModal={handleOpenModal} category={category} getTasks={getTasks} />}
            {isOpenTaskModal && <ShowTaskModal handleOpenTaskModal={handleOpenTaskModal} category={category} getTasks={getTasks} id={taskId} />}
            {token ? <div className='font-serif bg-gradient-to-br from-pink-600 to-amber-500 h-full min-h-screen pb-10'>
                <nav className='bg-purple-950 shadow-lg py-5 text-slate-50 px-2 md:px-0'>
                    <div className='flex container mx-auto items-center justify-between'>
                        <h1 className='text-xl font-bold'>Kanban Board</h1>
                        <div className='flex items-center gap-5'>
                            <h1>Hello, <span className='font-semibold'>{currentUser?.name}</span></h1>
                            <button onClick={handleLogout} className='px-3 py-1 hover:bg-purple-900'>Log Out</button>
                        </div>
                    </div>
                </nav>

                <div className='mt-10 container mx-auto grid grid-cols-1 md:grid-cols-4 gap-5 px-2 md:px-0'>
                    <TasksContainer getTasks={getTasks} tasks={tasks} status={'To Do'} category={'todo'} handleOpenModal={handleOpenModal} handleOpenTaskModal={handleOpenTaskModal} />
                    <TasksContainer getTasks={getTasks} tasks={tasks} status={'In Progress'} category={'progress'} handleOpenModal={handleOpenModal} handleOpenTaskModal={handleOpenTaskModal} />
                    <TasksContainer getTasks={getTasks} tasks={tasks} status={'Testing'} category={'testing'} handleOpenModal={handleOpenModal} handleOpenTaskModal={handleOpenTaskModal} />
                    <TasksContainer getTasks={getTasks} tasks={tasks} status={'Done'} category={'done'} handleOpenModal={handleOpenModal} handleOpenTaskModal={handleOpenTaskModal} />
                </div>
            </div> : <Navigate to={'/login'} />}
        </>
    )
}

export default Home