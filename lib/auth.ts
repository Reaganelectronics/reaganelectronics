export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  createdAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

// Simulate user database (in real app, this would be a proper database)
const users: Array<User & { password: string }> = []

export const authService = {
  // Register new user
  register: async (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
  }): Promise<{ success: boolean; user?: User; error?: string }> => {
    // Check if user already exists
    const existingUser = users.find((u) => u.email.toLowerCase() === userData.email.toLowerCase())
    if (existingUser) {
      return { success: false, error: "User with this email already exists" }
    }

    // Create new user
    const newUser: User & { password: string } = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email.toLowerCase(),
      password: userData.password, // In real app, this would be hashed
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)

    // Return user without password
    const { password, ...userWithoutPassword } = newUser
    return { success: true, user: userWithoutPassword }
  },

  // Login user
  login: async (email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

    if (!user) {
      return { success: false, error: "Invalid email or password" }
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user
    return { success: true, user: userWithoutPassword }
  },

  // Get current user from localStorage
  getCurrentUser: (): User | null => {
    if (typeof window === "undefined") return null

    try {
      const userData = localStorage.getItem("currentUser")
      return userData ? JSON.parse(userData) : null
    } catch {
      return null
    }
  },

  // Save user to localStorage
  saveUser: (user: User): void => {
    if (typeof window === "undefined") return
    localStorage.setItem("currentUser", JSON.stringify(user))
  },

  // Remove user from localStorage
  logout: (): void => {
    if (typeof window === "undefined") return
    localStorage.removeItem("currentUser")
  },
}
