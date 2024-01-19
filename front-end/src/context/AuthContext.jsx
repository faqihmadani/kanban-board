import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

function AuthContextProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    )

    const login = async (data) => {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, data, {
            withCredentials: true,
        })
        console.log(res.data.user);

        setCurrentUser(res.data.user)
    }

    const logout = async (token) => {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/logout`, null, {
            withCredentials: true,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            }
        })

        setCurrentUser(null)
    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>{children}</AuthContext.Provider>
    )
}

export default AuthContextProvider