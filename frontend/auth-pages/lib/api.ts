// This file contains helper functions for API calls to your Django REST Framework backend

// Base URL for your Django REST Framework API
const API_BASE_URL = "http://localhost:8000/api"

// Helper function for making authenticated requests
export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token")

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Token ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  // Handle 401 Unauthorized responses
  if (response.status === 401) {
    // Clear token and redirect to login
    localStorage.removeItem("token")
    window.location.href = "/login"
    throw new Error("Session expired. Please login again.")
  }

  return response
}

// Authentication API functions
export const authApi = {
  // Login user
  login: async (credentials: { username: string; password: string }) => {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })

    return response
  },

  // Register user
  register: async (userData: { username: string; email: string; password: string }) => {
    const response = await fetch(`${API_BASE_URL}/auth/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    return response
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await fetchWithAuth("/auth/user/")

    if (!response.ok) {
      throw new Error("Failed to fetch user data")
    }

    return response.json()
  },

  // Logout user
  logout: async () => {
    const response = await fetchWithAuth("/auth/logout/", {
      method: "POST",
    })

    // Clear token regardless of response
    localStorage.removeItem("token")

    return response
  },
}

