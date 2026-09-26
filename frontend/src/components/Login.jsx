import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const navigate = useNavigate()
    
    const handleLogin = async (e) => {
  e.preventDefault()

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/auth/login",
      {
        email: email,
        password: password,
      }
    )

    if (response.data.access_token) {
  localStorage.setItem("access_token", response.data.access_token)
  console.log("Login successful")
  navigate("/dashboard")
} else {
  alert(response.data.message || "Invalid email or password")
}
  } catch (error) {
    console.error("Login failed:", error)
  }
}

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          AI Document Summarizer
        </h1>

        <p className="text-gray-500 text-center mt-2 mb-8">
          Login to continue
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account? Sign up
        </p>
      </div>
    </div>
  )
}

export default Login