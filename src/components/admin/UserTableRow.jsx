"use client"

import { useState } from "react"
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline"

const UserTableRow = ({ user, onToggleStatus }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleStatus = async () => {
    setIsLoading(true)
    try {
      await onToggleStatus(user)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    if (status === "Active") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></span>
          Active
        </span>
      )
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-1.5"></span>
          Blocked
        </span>
      )
    }
  }

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
        <div className="flex items-center min-w-0">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="ml-4 min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">{user.name}</div>
          </div>
        </div>
      </td>

      <td className="px-4 sm:px-6 py-4">
        <div className="flex items-center text-sm text-gray-900 min-w-0">
          <EnvelopeIcon className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
          <span className="truncate">{user.email}</span>
        </div>
      </td>

      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
        <div className="flex items-center text-sm text-gray-900">
          <PhoneIcon className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
          <span>{user.phone}</span>
        </div>
      </td>

      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">{getStatusBadge(user.status)}</td>

      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end">
          <button
            onClick={handleToggleStatus}
            disabled={isLoading}
            className={`
              inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg
              transition-all duration-200 ease-in-out
              ${
                user.status === "Active"
                  ? "text-red-700 bg-red-100 hover:bg-red-200 focus:ring-red-500"
                  : "text-green-700 bg-green-100 hover:bg-green-200 focus:ring-green-500"
              }
              ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:shadow-sm"}
              focus:outline-none focus:ring-2 focus:ring-offset-2
            `}
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-2 h-3 w-3" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : null}
            <span className="hidden sm:inline">
              {user.status === "Active" ? "Block" : "Unblock"}
            </span>
            <span className="sm:hidden">{user.status === "Active" ? "Block" : "Unblock"}</span>
          </button>
        </div>
      </td>
    </tr>
  )
}

export default UserTableRow
