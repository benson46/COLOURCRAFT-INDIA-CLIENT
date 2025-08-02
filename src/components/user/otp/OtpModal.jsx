"use client"

import { useState, useEffect } from "react"
import { dev_user_api } from "../../../utils/axios"
import LoadingButton from "../../common/LoadingButton"

const OtpModal = ({ isOpen, onClose, onVerify, email }) => {
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [verifying, setVerifying] = useState(false)
  const [resending, setResending] = useState(false)
  const [countdown, setCountdown] = useState(300) // 5 minutes
  const [resendAttempts, setResendAttempts] = useState(0)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    if (isOpen && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [isOpen, countdown])

  const handleOtpChange = (e) => {
    setOtp(e.target.value)
    setError("")
  }

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("OTP must be 6 digits")
      return
    }

    try {
      setVerifying(true)
      await onVerify(otp) // call parent function
      onClose() // close modal on success
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid or expired OTP")
    } finally {
      setVerifying(false)
    }
  }

  const handleResendOTP = async () => {
    if (resendAttempts >= 3) {
      setError("Maximum resend attempts reached")
      return
    }

    try {
      setResending(true)
      // Mock API call to resend OTP
      const response = await dev_user_api.post("/resend-otp", { email })
      if (response.data.success) {
        setResendAttempts((prev) => prev + 1)
        setCountdown(300)
        setCanResend(false)
        setError("")
        // toast.success("OTP resent successfully")
      }
    } catch (error) {
      setError("Failed to resend OTP")
    } finally {
      setResending(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg">
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Enter OTP</h2>
        <p className="text-gray-600 text-sm mb-6 text-center">
          We've sent a 6-digit code to <span className="font-semibold">{email}</span>
        </p>

        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={handleOtpChange}
          disabled={verifying}
          className="w-full text-center text-lg tracking-widest px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          placeholder="Enter OTP"
        />

        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="text-gray-500">
            {countdown > 0 ? (
              <span>
                Expires in {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, "0")}
              </span>
            ) : (
              <span className="text-red-500">OTP expired</span>
            )}
          </div>
          {canResend && resendAttempts < 3 && (
            <LoadingButton
              onClick={handleResendOTP}
              loading={resending}
              loadingText="Resending..."
              className="text-red-500 hover:text-red-600 font-medium text-sm"
            >
              Resend OTP ({3 - resendAttempts} left)
            </LoadingButton>
          )}
        </div>

        {error && <p className="text-sm text-red-600 mt-3 text-center">{error}</p>}

        <LoadingButton
          onClick={handleVerify}
          loading={verifying}
          loadingText="Verifying..."
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-all duration-300"
        >
          Verify OTP
        </LoadingButton>
      </div>
    </div>
  )
}

export default OtpModal
