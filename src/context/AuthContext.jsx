import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  // On mount: rehydrate from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    if (storedToken && storedUser) {
      console.log("🔍 Found token in localStorage:", storedToken)
      console.log("🔍 Found user in localStorage:", storedUser)
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // login() sends creds, stores token+user, updates state
  const login = async (email, password) => {
    console.log("🔍 Attempting to login with email:", email)

    const res = await fetch('https://ambulance-tracker-7e8t.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    console.log("🔍 Response status:", res.status)

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      console.error("❌ Login failed:", err.message || 'Unknown error')
      throw new Error(err.message || 'Login failed')
    }

    const { token: newToken, user: newUser } = await res.json()

    console.log("✅ Login successful. Received token:", newToken)
    console.log("✅ User data:", newUser)

    // Persist token and user to localStorage
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(newUser))

    // Update state with new token and user
    setToken(newToken)
    setUser(newUser)
  }

  // logout() clears everything
  const logout = () => {
    console.log("🔐 Logging out...")
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
