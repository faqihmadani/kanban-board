import React, { useContext, useEffect, useState } from 'react'
import { FaPlusCircle } from "react-icons/fa";
import { AuthContext } from '../context/AuthContext.jsx';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { Cookies } from 'js-cookie'

function Home() {
    const [tasks, setTasks] = useState([])

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
        console.log(res.data.tasks);
        setTasks(res.data.tasks)
    }

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <>
            {token ? <div className='font-serif bg-gradient-to-br from-pink-600 to-amber-500 h-full min-h-screen'>
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
                    <div className='bg-slate-50 w-full min-h-[450px] p-5 shadow-lg'>
                        <h1 className='text-xl font-semibold'>To Do</h1>
                        <button className='w-full py-3 text-slate-50 flex items-center justify-center mt-5 bg-purple-700 hover:bg-purple-800 gap-2'>
                            <div className='text-xl'>
                                <FaPlusCircle />
                            </div>
                            <h1 className='font-semibold'>Add Task</h1>
                        </button>

                        <div className='mt-5 flex flex-col gap-2'>
                            {tasks.map((task) => {
                                if (task.category === 'todo') {
                                    return <h1 className='p-3 font-medium capitalize w-full bg-purple-950 text-slate-50'>{task.title}</h1>
                                }
                            })}
                        </div>
                    </div>

                    <div className='bg-slate-50 w-full min-h-[450px] p-5 shadow-lg'>
                        <h1 className='text-xl font-semibold'>In Progress</h1>
                        <button className='w-full py-3 text-slate-50 flex items-center justify-center mt-5 bg-purple-700 hover:bg-purple-800 gap-2'>
                            <div className='text-xl'>
                                <FaPlusCircle />
                            </div>
                            <h1 className='font-semibold'>Add Task</h1>
                        </button>
                        <div className='mt-5 flex flex-col gap-2'>
                            {tasks.map((task) => {
                                if (task.category === 'progress') {
                                    return <h1 className='p-3 font-medium capitalize w-full bg-purple-950 text-slate-50'>{task.title}</h1>
                                }
                            })}
                        </div>
                    </div>

                    <div className='bg-slate-50 w-full min-h-[450px] p-5 shadow-lg'>
                        <h1 className='text-xl font-semibold'>Testing</h1>
                        <button className='w-full py-3 text-slate-50 flex items-center justify-center mt-5 bg-purple-700 hover:bg-purple-800 gap-2'>
                            <div className='text-xl'>
                                <FaPlusCircle />
                            </div>
                            <h1 className='font-semibold'>Add Task</h1>
                        </button>
                        <div className='mt-5 flex flex-col gap-2'>
                            {tasks.map((task) => {
                                if (task.category === 'testing') {
                                    return <h1 className='p-3 font-medium capitalize w-full bg-purple-950 text-slate-50'>{task.title}</h1>
                                }
                            })}
                        </div>
                    </div>

                    <div className='bg-slate-50 w-full min-h-[450px] p-5 shadow-lg'>
                        <h1 className='text-xl font-semibold'>Done</h1>
                        <button className='w-full py-3 text-slate-50 flex items-center justify-center mt-5 bg-purple-700 hover:bg-purple-800 gap-2'>
                            <div className='text-xl'>
                                <FaPlusCircle />
                            </div>
                            <h1 className='font-semibold'>Add Task</h1>
                        </button>
                        <div className='mt-5 flex flex-col gap-2'>
                            {tasks.map((task) => {
                                if (task.category === 'done') {
                                    return <h1 className='p-3 font-medium capitalize w-full bg-purple-950 text-slate-50'>{task.title}</h1>
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div> : <Navigate to={'/login'} />}
        </>
    )
}

export default Home