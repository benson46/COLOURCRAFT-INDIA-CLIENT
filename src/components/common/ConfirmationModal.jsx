"use client"

import LoadingButton from "./LoadingButton"

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "default",
  loading = false,
}) => {
  if (!isOpen) return null

  const getButtonStyles = () => {
    switch (type) {
      case "danger":
        return "bg-red-600 hover:bg-red-700 text-white"
      case "info":
        return "bg-blue-600 hover:bg-blue-700 text-white"
      default:
        return "bg-gray-600 hover:bg-gray-700 text-white"
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 backdrop-blur-sm bg-white/30" onClick={() => !loading && onClose()} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex space-x-3 justify-end">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>
          <LoadingButton
            onClick={onConfirm}
            loading={loading}
            loadingText="Processing..."
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${getButtonStyles()}`}
          >
            {confirmText}
          </LoadingButton>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
