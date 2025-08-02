"use client"

import { useEffect, useState } from "react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { Users, UserCheck, UserX, Search } from "lucide-react"
import UserTableRow from "../../components/admin/UserTableRow"
import { dev_admin_api } from "../../utils/axios"
import { toast } from "react-toastify"
import ConfirmationModal from "../../components/common/ConfirmationModal"

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showBlockModal, setShowBlockModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [togglingUserStatus, setTogglingUserStatus] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    fetchUsers()
  }, [currentPage, searchTerm, statusFilter])

  const fetchUsers = async () => {
    try {
      setLoading(true)

      const response = await dev_admin_api.get("/user-list")
      let filteredUsers = response.data.users

      if (searchTerm) {
        filteredUsers = filteredUsers.filter(
          (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phone.includes(searchTerm),
        )
      }

      if (statusFilter !== "All") {
        filteredUsers = filteredUsers.filter((user) => user.status === statusFilter)
      }

      const totalItems = filteredUsers.length
      const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage)
      const startIndex = (currentPage - 1) * itemsPerPage
      const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)

      setUsers(paginatedUsers)
      setTotalPages(calculatedTotalPages)
      setLoading(false)
    } catch (error) {
      toast.error("Failed to load users")
      setLoading(false)
    }
  }

  const handleToggleUserStatus = async (userEmail) => {
    try {
      setTogglingUserStatus(true)
      const response = await dev_admin_api.patch(`/user-toogle-status/${userEmail}`)
      if (response.data.success) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.email === userEmail
              ? {
                  ...user,
                  status: user.status === "Active" ? "Blocked" : "Active",
                }
              : user,
          ),
        )
        const user = users.find((u) => u.email === userEmail)
        const action = user.status === "Active" ? "blocked" : "unblocked"
        toast.success(`User ${action} successfully`)
      }
    } catch (error) {
      toast.error("Failed to update user status")
    } finally {
      setTogglingUserStatus(false)
    }
  }

  const filteredUsers = users
  const activeUsersCount = users.filter((user) => user.status === "Active").length
  const blockedUsersCount = users.filter((user) => user.status === "Blocked").length

  const openBlockModal = (user) => {
    setSelectedUser(user)
    setShowBlockModal(true)
  }

  const handleConfirmToggle = async () => {
    if (selectedUser) {
      await handleToggleUserStatus(selectedUser.email)
      setShowBlockModal(false)
      setSelectedUser(null)
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-600 truncate">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600 flex-shrink-0">
              <Users size={20} className="sm:w-6 sm:h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-600 truncate">Active Users</p>
              <p className="text-2xl font-bold text-green-600">{activeUsersCount}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 text-green-600 flex-shrink-0">
              <UserCheck size={20} className="sm:w-6 sm:h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-600 truncate">Blocked Users</p>
              <p className="text-2xl font-bold text-red-600">{blockedUsersCount}</p>
            </div>
            <div className="p-3 rounded-lg bg-red-50 text-red-600 flex-shrink-0">
              <UserX size={20} className="sm:w-6 sm:h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">User Management</h3>
              <p className="text-sm text-gray-600 mt-1">Manage user accounts and permissions</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="px-4 sm:px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search users by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            <div className="relative flex-shrink-0">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <UserTableRow key={user.email} user={user} onToggleStatus={() => openBlockModal(user)} />
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 sm:px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <Search className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-sm font-medium text-gray-900 mb-1">No users found</h3>
                      <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <p className="text-sm text-gray-700">
                Showing page <span className="font-medium">{currentPage}</span> of{" "}
                <span className="font-medium">{totalPages}</span>
              </p>
              <nav className="flex justify-center gap-3">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Prev
                </button>
                <span className="px-3 py-1 text-sm font-medium text-gray-900">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* Block/Unblock Confirmation Modal */}
      <ConfirmationModal
        isOpen={showBlockModal}
        onClose={() => !togglingUserStatus && setShowBlockModal(false)}
        onConfirm={handleConfirmToggle}
        title={selectedUser?.status === "Active" ? "Block User" : "Unblock User"}
        message={`Are you sure you want to ${selectedUser?.status === "Active" ? "block" : "unblock"} ${selectedUser?.name}? ${selectedUser?.status === "Active" ? "This will prevent them from accessing their account." : "This will restore their account access."}`}
        confirmText={selectedUser?.status === "Active" ? "Block User" : "Unblock User"}
        cancelText="Cancel"
        type={selectedUser?.status === "Active" ? "danger" : "default"}
        loading={togglingUserStatus}
      />
    </div>
  )
}

export default UserManagement
