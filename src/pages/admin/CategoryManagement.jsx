"use client"

import { useState, useEffect } from "react"
import { PlusIcon, PencilIcon, LockClosedIcon, LockOpenIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { toast } from "react-toastify"
import { format } from "date-fns"
import ConfirmationModal from "../../components/common/ConfirmationModal"
import { dev_admin_api } from "../../utils/axios"
import LoadingButton from "../../components/common/LoadingButton"

const CategoryManagement = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showEditConfirmModal, setShowEditConfirmModal] = useState(false)
  const [showBlockModal, setShowBlockModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    status: "Active",
  })

  // Loading states for different actions
  const [addingCategory, setAddingCategory] = useState(false)
  const [updatingCategory, setUpdatingCategory] = useState(false)
  const [togglingStatus, setTogglingStatus] = useState(false)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const response = await dev_admin_api.get(
          `/category?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}`,
        )
        setCategories(response.data.categories)
        setTotalPages(response.data.totalPages)
      } catch (error) {
        console.error("Error fetching categories:", error)
        toast.error("Failed to load categories")
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [currentPage, searchTerm])

  const handleAddCategory = async () => {
    try {
      setAddingCategory(true)
      const response = await dev_admin_api.post("/category", formData)
      setCategories((prev) => [response.data, ...prev])
      setShowAddModal(false)
      setFormData({ title: "", status: "Active" })
      toast.success("Category added successfully")
    } catch (error) {
      toast.error("Failed to add category")
    } finally {
      setAddingCategory(false)
    }
  }

  const handleEditCategory = async () => {
    try {
      setUpdatingCategory(true)
      await dev_admin_api.patch(`/category/${selectedCategory._id}`, {
        title: formData.title,
      })
      setCategories((prev) =>
        prev.map((cat) =>
          cat._id === selectedCategory._id
            ? {
                ...cat,
                title: formData.title,
              }
            : cat,
        ),
      )
      setShowEditModal(false)
      setShowEditConfirmModal(false)
      setSelectedCategory(null)
      setFormData({ title: "", status: "Active" })
      toast.success("Category updated successfully")
    } catch (error) {
      toast.error("Failed to update category")
    } finally {
      setUpdatingCategory(false)
    }
  }

  const handleToggleBlock = async () => {
    if (!selectedCategory) return

    try {
      setTogglingStatus(true)
      const newStatus = selectedCategory.status === "Active" ? "Inactive" : "Active"
      await dev_admin_api.patch(`/category-tootgle-status/${selectedCategory._id}`, {
        status: newStatus,
      })
      setCategories((prev) =>
        prev.map((cat) => (cat._id === selectedCategory._id ? { ...cat, status: newStatus } : cat)),
      )
      setShowBlockModal(false)
      setSelectedCategory(null)
      toast.success(`Category ${newStatus === "Active" ? "unblocked" : "blocked"} successfully`)
    } catch (error) {
      toast.error(`Failed to ${selectedCategory.status === "Active" ? "block" : "unblock"} category`)
    } finally {
      setTogglingStatus(false)
    }
  }

  const openEditModal = (category) => {
    setSelectedCategory(category)
    setFormData({
      title: category.title,
      status: "Active",
    })
    setShowEditModal(true)
  }

  const openBlockModal = (category) => {
    setSelectedCategory(category)
    setShowBlockModal(true)
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

  const getStatusBadge = (status) => {
    return status === "Active" ? (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Active</span>
    ) : (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Inactive</span>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Categories</p>
              <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Categories</p>
              <p className="text-2xl font-bold text-green-600">
                {categories.filter((cat) => cat.status === "Active").length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-purple-600">
                {categories.reduce((sum, cat) => sum + cat.productCount, 0)}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Category Management</h3>
            <p className="text-sm text-gray-600">Manage product categories and their details</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Category
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-sm text-gray-500">
                    <div className="flex flex-col items-center">
                      <svg
                        className="w-12 h-12 text-gray-400 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                      <h3 className="text-sm font-medium text-gray-900 mb-1">No categories found</h3>
                      <p className="text-sm text-gray-500">Try adjusting your search criteria</p>
                    </div>
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{category.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{category.productCount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(category.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {category.createdAt && !isNaN(new Date(category.createdAt))
                          ? format(new Date(category.createdAt), "dd-MM-yyyy hh:mm")
                          : "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => openEditModal(category)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => openBlockModal(category)}
                          className={
                            category.status === "Active"
                              ? "text-red-600 hover:text-red-900 p-1"
                              : "text-green-600 hover:text-green-900 p-1"
                          }
                        >
                          {category.status === "Active" ? (
                            <LockClosedIcon className="h-4 w-4" />
                          ) : (
                            <LockOpenIcon className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
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

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 backdrop-blur-sm bg-white/30"
            onClick={() => !addingCategory && setShowAddModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Category</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  disabled={addingCategory}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
                  placeholder="Enter category title"
                />
              </div>
            </div>
            <div className="flex space-x-3 justify-end mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                disabled={addingCategory}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <LoadingButton
                onClick={handleAddCategory}
                loading={addingCategory}
                loadingText="Adding..."
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Add Category
              </LoadingButton>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 backdrop-blur-sm bg-white/30"
            onClick={() => !updatingCategory && setShowEditModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Category</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  disabled={updatingCategory}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>
            </div>
            <div className="flex space-x-3 justify-end mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                disabled={updatingCategory}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <LoadingButton
                onClick={() => setShowEditConfirmModal(true)}
                loading={updatingCategory}
                loadingText="Updating..."
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Update Category
              </LoadingButton>
            </div>
          </div>
        </div>
      )}

      {/* Edit Confirmation Modal */}
      <ConfirmationModal
        isOpen={showEditConfirmModal}
        onClose={() => !updatingCategory && setShowEditConfirmModal(false)}
        onConfirm={handleEditCategory}
        title="Confirm Update"
        message={`Are you sure you want to update the category "${selectedCategory?.title}"?`}
        confirmText="Update Category"
        cancelText="Cancel"
        type="info"
        loading={updatingCategory}
      />

      {/* Block/Unblock Confirmation Modal */}
      <ConfirmationModal
        isOpen={showBlockModal}
        onClose={() => !togglingStatus && setShowBlockModal(false)}
        onConfirm={handleToggleBlock}
        title={selectedCategory?.status === "Active" ? "Block Category" : "Unblock Category"}
        message={`Are you sure you want to ${
          selectedCategory?.status === "Active" ? "block" : "unblock"
        } the category "${selectedCategory?.title}"?`}
        confirmText={selectedCategory?.status === "Active" ? "Block" : "Unblock"}
        cancelText="Cancel"
        type={selectedCategory?.status === "Active" ? "danger" : "info"}
        loading={togglingStatus}
      />
    </div>
  )
}

export default CategoryManagement
