// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [user, setUser]   = useState(null)

  // On mount: rehydrate from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser  = localStorage.getItem('user')
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // login() sends creds, stores token+user, updates state
  const login = async (email, password) => {
    const res = await fetch('https://ambulance-tracker-7e8t.onrender.com/auth/login', {  // Use the full URL here
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.message || 'Login failed')
    }

    const { token: newToken, user: newUser } = await res.json()

    // Persist
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(newUser))

    // Update state
    setToken(newToken)
    setUser(newUser)
  }

  // logout() clears everything
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
