import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
    return (
        <div className='h-screen font-serif w-screen flex items-center justify-end bg-gradient-to-br from-purple-950 to-pink-600'>
            <div className='bg-slate-50 h-full px-32 flex items-center justify-center'>
                <div className='md:w-3/4flex items-center justify-center flex-col'>
                    <h1 className='text-2xl font-bold text-slate-900 text-center'>Login to your account</h1>
                    <form className='mt-7 w-full gap-y-3 flex flex-col relative'>
                        <input type="email" placeholder='Email' className='p-2 border-[2px] border-purple-800' />
                        <input type="password" placeholder='Password' className='p-2 border-[2px] border-purple-800' />

                        <p className='text-red-600 text-sm absolute bottom-32'>Error message</p>

                        <button type='submit' className='bg-purple-950 text-slate-50 font-semibold p-3 mt-10'>Login</button>
                        <p className='text-center mt-5'>Don't have an account?
                            <Link to={'/register'} className='ml-1 hover:underline text-purple-950'>
                                Register
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login