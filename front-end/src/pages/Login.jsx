import axios from 'axios'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'

function Login() {
    const [data, setData] = useState({
        email: '',
        password: "",
    })

    const navigate = useNavigate()

    const { login } = useContext(AuthContext)

    const handleChange = (e) => {
        setData((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, data, {
            //     withCredentials: true,
            // })
            login(data)
            toast.success("You have been logged in to your account")
            // console.log(res.data);
            navigate("/")

        } catch (error) {
            const errors = error.response.data.errors
            const message = error.response.data.message

            console.log(message);

            if (errors) {
                if (errors.email) {
                    errors.email.forEach(e => {
                        toast.error(e, {
                            duration: 2500
                        })
                    });
                }

                if (errors.password) {
                    errors.password.forEach(e => {
                        toast.error(e, {
                            duration: 2500
                        })
                    });
                }
            } else {
                toast.error(message, {
                    duration: 2500
                })
            }

        }
    }


    return (
        <div className='h-screen font-serif w-screen flex items-center justify-end bg-gradient-to-br from-purple-950 to-pink-600'>
            <div className='bg-slate-50 h-full px-10 md:px-32 flex items-center justify-center'>
                <div className='flex items-center justify-center flex-col'>
                    <h1 className='text-2xl font-bold text-slate-900 text-center'>Login to your account</h1>
                    <form className='mt-7 w-full gap-y-3 flex flex-col relative'>
                        <input onChange={handleChange} name='email' type="email" placeholder='Email' className='p-2 border-[2px] border-purple-800' />
                        <input onChange={handleChange} name='password' type="password" placeholder='Password' className='p-2 border-[2px] border-purple-800' />


                        <button onClick={handleSubmit} type='submit' className='bg-purple-950 text-slate-50 font-semibold p-3 mt-7'>Login</button>
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