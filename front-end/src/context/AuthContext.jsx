import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export const AuthContext = createContext()

function AuthContextProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    )

    const [token, setToken] = useState(
        JSON.parse(localStorage.getItem("token")) || null
    )

    const login = async (data) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, data, {
                withCredentials: true,
            })

            setCurrentUser(res.data.user)
            setToken(res.data.token)

            if (res.status === 200) {
                toast.success("You have been logged in to your account")
            }
            return res.status
        } catch (error) {
            // console.log(error);
            const errors = error.response.data.errors
            const message = error.response.data.message

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

    const logout = async (token) => {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/logout`, null, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })

        setCurrentUser(null)
        setToken(null)
        toast.success("You have been logged out")
        return res
    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser))
        localStorage.setItem('token', JSON.stringify(token))
    }, [currentUser, token])

    return (
        <AuthContext.Provider value={{ currentUser, token, login, logout }}>{children}</AuthContext.Provider>
    )
}

export default AuthContextProvider