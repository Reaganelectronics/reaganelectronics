"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { authService, type AuthState } from "@/lib/auth"

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
  }) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  })

  // Load user from localStorage on mount
  useEffect(() => {
    const user = authService.getCurrentUser()
    if (user) {
      setAuthState({
        user,
        isAuthenticated: true,
      })
    }
  }, [])

  const login = async (email: string, password: string) => {
    const result = await authService.login(email, password)

    if (result.success && result.user) {
      authService.saveUser(result.user)
      setAuthState({
        user: result.user,
        isAuthenticated: true,
      })
      return { success: true }
    }

    return { success: false, error: result.error }
  }

  const register = async (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
  }) => {
    const result = await authService.register(userData)

    if (result.success && result.user) {
      authService.saveUser(result.user)
      setAuthState({
        user: result.user,
        isAuthenticated: true,
      })
      return { success: true }
    }

    return { success: false, error: result.error }
  }

  const logout = () => {
    authService.logout()
    setAuthState({
      user: null,
      isAuthenticated: false,
    })
  }

  return <AuthContext.Provider value={{ ...authState, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
