"use client"

import { useEffect, useState } from "react"
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import FormInput from "../../components/admin/FormInput"
import { dev_admin_api } from "../../utils/axios"
import { useNavigate } from "react-router"
import { useAdminAuth } from "../../context/adminAuthContext"
import LoadingButton from "../../components/common/LoadingButton"

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState("")

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const { admin, setAdmin } = useAdminAuth()

  useEffect(() => {
    if (admin) {
      navigate("/admin/dashboard")
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage("")

    try {
      const response = await dev_admin_api.post("/login", formData)
      setAdmin(response.data.admin)
      navigate("/admin/dashboard")
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Something went wrong please try after some time")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Panel - Brand Section */}
      <div className="hidden md:flex md:w-1/2 relative bg-orange-500">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-20 z-0"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          {/* Logo */}
          <div className="mb-8">
            <img
              src="/Logo.jpg"
              alt="Colourcraft India Logo"
              className="w-32 h-32 rounded-full shadow-2xl border-4 border-white/20"
            />
          </div>

          {/* Welcome Text */}
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome back, Admin!</h1>
            <p className="text-xl text-orange-100 mb-6">Inspiring Creativity, Delivering Excellence</p>
            <p className="text-lg text-orange-200 max-w-md">
              Access your admin dashboard to manage operations, monitor performance, and drive business growth.
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-16 h-16 bg-white/10 rounded-full"></div>
          <div className="absolute top-1/2 left-10 w-12 h-12 bg-white/10 rounded-full"></div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="md:hidden text-center mb-8">
            <img
              src="/Logo.jpg"
              alt="Colourcraft India Logo"
              className="w-20 h-20 rounded-full mx-auto mb-4 shadow-lg"
            />
            <h2 className="text-2xl font-bold text-gray-900">Colourcraft India</h2>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h2>
              <p className="text-gray-600">Sign in to access your dashboard</p>
            </div>
            <p className="text-1xl font-bold text-center text-red-500 mb-3">{errorMessage ? errorMessage : " "}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <FormInput
                label="Email Address"
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                icon={EnvelopeIcon}
                disabled={isLoading}
                required
              />

              {/* Password Input */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    disabled={isLoading}
                    required
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center disabled:opacity-60"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded disabled:opacity-60"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
              </div>

              {/* Login Button */}
              <LoadingButton
                type="submit"
                loading={isLoading}
                loadingText="Signing in..."
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:transform-none disabled:hover:from-orange-500 disabled:hover:to-red-600"
              >
                Login
              </LoadingButton>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-xs text-gray-500">© 2024 Colourcraft India. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
