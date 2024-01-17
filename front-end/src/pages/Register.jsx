import React from 'react'
import { Link } from 'react-router-dom'

function Register() {
    return (
        <div className='h-screen font-serif w-screen flex items-center justify-end bg-gradient-to-br from-purple-950 to-pink-600'>
            <div className='bg-slate-50 h-full px-32 flex items-center justify-center'>
                <div className='md:w-3/4flex items-center justify-center flex-col'>
                    <h1 className='text-2xl font-bold text-slate-900 text-center'>Register new account</h1>
                    <form className='mt-7 w-full gap-y-3 flex flex-col relative'>
                        <input type="text" placeholder='Username' className='p-2 border-[2px] border-purple-800' />
                        <input type="email" placeholder='Email' className='p-2 border-[2px] border-purple-800' />
                        <input type="password" placeholder='Password' className='p-2 border-[2px] border-purple-800' />
                        <input type="password" placeholder='Confirm Password' className='p-2 border-[2px] border-purple-800' />

                        <p className='text-red-600 text-sm absolute bottom-32'>Error message</p>

                        <button type='submit' className='bg-purple-950 text-slate-50 font-semibold p-3 mt-10'>Register</button>
                        <p className='text-center mt-5'>Already have an account?
                            <Link to={'/login'} className='ml-1 hover:underline text-purple-950'>
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register