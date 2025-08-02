"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { dev_user_api } from "../../utils/axios"
import OtpModal from "../../components/user/otp/OtpModal"
import { toast } from "react-toastify"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import LoadingButton from "../../components/common/LoadingButton"

const UserRegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    newsletter: true,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [errorMessage, setErrorMessage] = useState("")
  const [errorDetails, setErrorDetails] = useState("")
  const [otpModalOpen, setOtpModalOpen] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.password) newErrors.password = "Password is required"
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleOtpVerification = async (otp) => {
    try {
      const response = await dev_user_api.post("/verify-otp", {
        email: formData.email,
        otp,
      })

      if (response.data.success) {
        toast.success("Account created successfully! Please login.")
        navigate("/login")
      }
    } catch (error) {
      toast.error("Invalid or expired OTP")
      throw error
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    setErrorMessage("")
    setErrorDetails("")

    try {
      await dev_user_api.post("/initiate-register", formData)
      console.log("User registration attempt:", formData)
      setOtpModalOpen(true)
      toast.success("OTP sent to your email address")
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Something went wrong please try after some time"
      setErrors(errorMsg)
      setErrorMessage(errorMsg)
      setErrorDetails(err.response?.data.details)
      toast.error(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 bg-red-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-20 w-24 h-24 bg-red-200 rounded-full opacity-30"></div>
        <div className="absolute bottom-20 right-1/4 w-16 h-16 bg-red-100 rounded-full opacity-25"></div>
        <div className="absolute top-1/3 left-1/3 w-20 h-20 bg-yellow-100 rounded-full opacity-20"></div>
      </div>

      <div className="max-w-lg w-full space-y-8 relative z-10">
        <div className="text-center">
          <Link to="/" className="inline-block mb-8">
            <h1 className="text-4xl font-black text-gray-900">
              PRINTI<span className="text-red-500">FY</span>
            </h1>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Join Printify</h2>
          <p className="text-gray-600 text-lg">Create your account and start printing amazing designs</p>
        </div>

        <p className="text-1xl font-bold text-center text-red-500 mb-3">{errorMessage && errorMessage}</p>
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-lg disabled:opacity-60 disabled:cursor-not-allowed ${
                  errors.name ? "border-red-300 bg-red-50" : "border-gray-200"
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="mt-2 text-sm text-red-600 font-medium">{errors.name}</p>}
            </div>

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
                disabled={isLoading}
                className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-lg disabled:opacity-60 disabled:cursor-not-allowed ${
                  errors.email ? "border-red-300 bg-red-50" : "border-gray-200"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="mt-2 text-sm text-red-600 font-medium">{errors.email}</p>}
            </div>

            {/* Password */}
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
                  disabled={isLoading}
                  className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-lg pr-12 disabled:opacity-60 disabled:cursor-not-allowed ${
                    errors.password ? "border-red-300 bg-red-50" : "border-gray-200"
                  }`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-60"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-600 font-medium">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-lg pr-12 disabled:opacity-60 disabled:cursor-not-allowed ${
                    errors.confirmPassword ? "border-red-300 bg-red-50" : "border-gray-200"
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-60"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600 font-medium">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Newsletter */}
            {/* <div className="bg-red-50 rounded-xl p-4 border border-red-100">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-5 h-5 text-red-500 border-2 border-red-300 rounded mt-1 disabled:opacity-60"
                />
                <div className="ml-3">
                  <span className="text-sm font-semibold text-red-800">📧 Subscribe to our newsletter</span>
                  <p className="text-xs text-red-600 mt-1">
                    Get exclusive offers, design tips, and be the first to know about new products!
                  </p>
                </div>
              </label>
            </div> */}

            {/* Terms Agreement */}
            <div>
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-5 h-5 text-red-500 border-2 border-gray-300 rounded mt-1 disabled:opacity-60"
                />
                <span className="ml-3 text-sm text-gray-600">
                  I agree to the{" "}
                  <Link to="/terms" className="text-red-500 hover:text-red-600 font-semibold underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-red-500 hover:text-red-600 font-semibold underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.agreeToTerms && <p className="mt-2 text-sm text-red-600 font-medium">{errors.agreeToTerms}</p>}
            </div>

            {/* Submit */}
            <LoadingButton
              type="submit"
              loading={isLoading}
              loadingText="Creating Account..."
              className="w-full bg-red-500 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none"
            >
              CREATE ACCOUNT
            </LoadingButton>
            <p className="text-1xl font-bold text-center text-red-500 mb-3">
              {errorDetails && `Suggestion: ${errorDetails?.suggestion}`}
            </p>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-red-500 hover:text-red-600 font-bold">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      <OtpModal
        isOpen={otpModalOpen}
        onClose={() => setOtpModalOpen(false)}
        onVerify={handleOtpVerification}
        email={formData.email}
      />
    </div>
  )
}

export default UserRegisterPage
