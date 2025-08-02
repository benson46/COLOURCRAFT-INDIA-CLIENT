"use client"

import LoadingSpinner from "./LoadingSpinner"

const LoadingButton = ({
  children,
  loading = false,
  loadingText = "Loading...",
  className = "",
  disabled = false,
  type = "button",
  onClick,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`
        inline-flex items-center justify-center
        transition-all duration-200
        disabled:opacity-60 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {loading && <LoadingSpinner size="sm" className="mr-2" />}
      {loading ? loadingText : children}
    </button>
  )
}

export default LoadingButton
