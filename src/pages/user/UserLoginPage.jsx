"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { dev_user_api } from "../../utils/axios"
import { useAuth } from "../../context/authContext"
import { toast } from "react-toastify"
import LoadingButton from "../../components/common/LoadingButton"

const UserLoginPage = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const { setUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage("")

    try {
      const response = await dev_user_api.post("/login", formData)
      setUser(response.data.user)
      toast.success("Login successful! Welcome back.")
      navigate("/")
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Something went wrong please try after some time"
      setErrorMessage(errorMsg)
      toast.error(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 right-20 w-24 h-24 bg-red-200 rounded-full opacity-30"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-red-100 rounded-full opacity-25"></div>
        <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-yellow-100 rounded-full opacity-20"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-block mb-8">
            <h1 className="text-4xl font-black text-gray-900">
              PRINTI<span className="text-red-500">FY</span>
            </h1>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Welcome Back!</h2>
          <p className="text-gray-600 text-lg">Sign in to continue your printing journey</p>
        </div>

        <p className="text-1xl font-bold text-center text-red-500 mb-3">{errorMessage ? errorMessage : " "}</p>

        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-lg pr-12 disabled:opacity-60 disabled:cursor-not-allowed"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-60"
                >
                  {showPassword ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <Link to="/forgot-password" className="text-sm text-red-500 hover:text-red-600 font-semibold">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <LoadingButton
              type="submit"
              loading={isLoading}
              loadingText="Signing In..."
              className="w-full bg-red-500 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none"
            >
              SIGN IN
            </LoadingButton>
          </form>

          {/* Divider */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
              </div>
            </div>
          </div>

          {/* Social Login */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button
              disabled={isLoading}
              className="w-full inline-flex justify-center items-center py-3 px-4 border-2 border-gray-200 rounded-xl shadow-sm bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>

            <button
              disabled={isLoading}
              className="w-full inline-flex justify-center items-center py-3 px-4 border-2 border-gray-200 rounded-xl shadow-sm bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>

          {/* Signup Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-red-500 hover:text-red-600 font-bold">
                Create Account
              </Link>
            </p>
          </div>
        </div>

        {/* Quick Features */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Why Choose Printify?</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center text-gray-600">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
              Premium Quality
            </div>
            <div className="flex items-center text-gray-600">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
              Fast Delivery
            </div>
            <div className="flex items-center text-gray-600">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
              Custom Designs
            </div>
            <div className="flex items-center text-gray-600">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
              24/7 Support
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLoginPage
