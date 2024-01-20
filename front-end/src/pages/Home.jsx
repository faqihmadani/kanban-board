import React, { useContext } from 'react'
import { FaPlusCircle } from "react-icons/fa";
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'

function Home() {

    const { currentUser, logout } = useContext(AuthContext)
    const [cookies, setCookie, removeCookie] = useCookies(['access_token'])

    const navigate = useNavigate()

    const handleLogout = () => {
        logout(cookies.access_token)
        console.log(cookies.get('access_token'));
        navigate('/login')
    }

    return (
        <div className='font-serif bg-gradient-to-br from-pink-600 to-amber-500 h-full min-h-screen'>
            <nav className='bg-purple-950 shadow-lg py-5 text-slate-50'>
                <div className='flex container mx-auto items-center justify-between'>
                    <h1 className='text-xl font-bold'>Kanban Board</h1>
                    <div className='flex items-center gap-5'>
                        <h1>Hello, <span className='font-semibold'>{currentUser?.name}</span></h1>
                        <button onClick={handleLogout} className='px-3 py-1 hover:bg-purple-900'>Log Out</button>
                    </div>
                </div>
            </nav>


            <div className='mt-10 container mx-auto grid grid-cols-1 md:grid-cols-4 gap-5'>
                <div className='bg-slate-50 w-full min-h-[450px] p-5 shadow-lg'>
                    <h1 className='text-xl font-semibold'>To Do</h1>
                    <button className='w-full py-3 text-slate-50 flex items-center justify-center mt-5 bg-purple-700 hover:bg-purple-800 gap-2'>
                        <div className='text-xl'>
                            <FaPlusCircle />
                        </div>
                        <h1 className='font-semibold'>Add Task</h1>
                    </button>
                </div>
                <div className='bg-slate-50 w-full min-h-[450px] p-5 shadow-lg'>
                    <h1 className='text-xl font-semibold'>In Progress</h1>
                    <button className='w-full py-3 text-slate-50 flex items-center justify-center mt-5 bg-purple-700 hover:bg-purple-800 gap-2'>
                        <div className='text-xl'>
                            <FaPlusCircle />
                        </div>
                        <h1 className='font-semibold'>Add Task</h1>
                    </button>
                </div>
                <div className='bg-slate-50 w-full min-h-[450px] p-5 shadow-lg'>
                    <h1 className='text-xl font-semibold'>Testing</h1>
                    <button className='w-full py-3 text-slate-50 flex items-center justify-center mt-5 bg-purple-700 hover:bg-purple-800 gap-2'>
                        <div className='text-xl'>
                            <FaPlusCircle />
                        </div>
                        <h1 className='font-semibold'>Add Task</h1>
                    </button>
                </div>
                <div className='bg-slate-50 w-full min-h-[450px] p-5 shadow-lg'>
                    <h1 className='text-xl font-semibold'>Done</h1>
                    <button className='w-full py-3 text-slate-50 flex items-center justify-center mt-5 bg-purple-700 hover:bg-purple-800 gap-2'>
                        <div className='text-xl'>
                            <FaPlusCircle />
                        </div>
                        <h1 className='font-semibold'>Add Task</h1>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Home