"use client"

import { useState, useEffect } from "react"
import { MagnifyingGlassIcon, FunnelIcon, EyeIcon } from "@heroicons/react/24/outline"
import { toast } from "react-toastify"

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [dateFilter, setDateFilter] = useState("All")
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [newStatus, setNewStatus] = useState("")

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 10

  // Mock data for demonstration - expanded to show pagination
  const mockOrders = [
    {
      id: "#ORD-001",
      customer: "John Smith",
      email: "john@example.com",
      date: "2024-01-15",
      amount: "$125.00",
      paymentStatus: "Completed",
      orderStatus: "Delivered",
    },
    {
      id: "#ORD-002",
      customer: "Sarah Johnson",
      email: "sarah@example.com",
      date: "2024-01-15",
      amount: "$89.50",
      paymentStatus: "Pending",
      orderStatus: "Shipped",
    },
    {
      id: "#ORD-003",
      customer: "Mike Wilson",
      email: "mike@example.com",
      date: "2024-01-14",
      amount: "$200.00",
      paymentStatus: "Failed",
      orderStatus: "Cancelled",
    },
    {
      id: "#ORD-004",
      customer: "Emily Davis",
      email: "emily@example.com",
      date: "2024-01-14",
      amount: "$75.25",
      paymentStatus: "Completed",
      orderStatus: "Out for Delivery",
    },
    {
      id: "#ORD-005",
      customer: "David Brown",
      email: "david@example.com",
      date: "2024-01-13",
      amount: "$150.00",
      paymentStatus: "Refunded",
      orderStatus: "Returned",
    },
    // Add more mock orders for pagination testing
    ...Array.from({ length: 20 }, (_, i) => ({
      id: `#ORD-${String(i + 6).padStart(3, "0")}`,
      customer: `Customer ${i + 6}`,
      email: `customer${i + 6}@example.com`,
      date: "2024-01-12",
      amount: `$${(Math.random() * 200 + 50).toFixed(2)}`,
      paymentStatus: ["Completed", "Pending", "Failed"][Math.floor(Math.random() * 3)],
      orderStatus: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"][Math.floor(Math.random() * 5)],
    })),
  ]

  useEffect(() => {
    fetchOrders()
  }, [currentPage, searchTerm, statusFilter])

  const fetchOrders = async () => {
    try {
      setLoading(true)

      // TODO: Replace with actual API with pagination
      // const response = await dev_admin_api.get(`/orders?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}&status=${statusFilter}`)
      // setOrders(response.data.orders)
      // setTotalPages(response.data.totalPages)

      // Using mock data for now
      setTimeout(() => {
        let filteredOrders = mockOrders

        // Apply filters
        if (searchTerm) {
          filteredOrders = filteredOrders.filter(
            (order) =>
              order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
              order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
              order.email.toLowerCase().includes(searchTerm.toLowerCase()),
          )
        }

        if (statusFilter !== "All") {
          filteredOrders = filteredOrders.filter((order) => order.orderStatus === statusFilter)
        }

        // Calculate pagination
        const totalItems = filteredOrders.length
        const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage)
        const startIndex = (currentPage - 1) * itemsPerPage
        const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage)

        setOrders(paginatedOrders)
        setTotalPages(calculatedTotalPages)
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Error fetching orders:", error)
      toast.error("Failed to load orders")
      setOrders([])
      setLoading(false)
    }
  }

  const handleUpdateOrderStatus = async () => {
    try {
      // TODO: Replace with actual API
      // const response = await dev_admin_api.patch(`/orders/${selectedOrder.id}/status`, { status: newStatus })

      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === selectedOrder.id ? { ...order, orderStatus: newStatus } : order)),
      )

      toast.success("Order status updated successfully")
      setShowUpdateModal(false)
      setSelectedOrder(null)
      setNewStatus("")
    } catch (error) {
      toast.error("Failed to update order status")
    }
  }

  const openUpdateModal = (order) => {
    setSelectedOrder(order)
    setNewStatus(order.orderStatus)
    setShowUpdateModal(true)
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

  const getPaymentStatusBadge = (status) => {
    const styles = {
      Completed: "bg-green-100 text-green-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Failed: "bg-red-100 text-red-800",
      Refunded: "bg-blue-100 text-blue-800",
    }

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status] || "bg-gray-100 text-gray-800"}`}>
        {status}
      </span>
    )
  }

  const getOrderStatusBadge = (status) => {
    const styles = {
      Pending: "bg-yellow-100 text-yellow-800",
      Confirmed: "bg-blue-100 text-blue-800",
      Packed: "bg-indigo-100 text-indigo-800",
      Shipped: "bg-purple-100 text-purple-800",
      "Out for Delivery": "bg-orange-100 text-orange-800",
      Delivered: "bg-green-100 text-green-800",
      Returned: "bg-gray-100 text-gray-800",
      Cancelled: "bg-red-100 text-red-800",
    }

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status] || "bg-gray-100 text-gray-800"}`}>
        {status}
      </span>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{mockOrders.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <MagnifyingGlassIcon className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {mockOrders.filter((o) => o.orderStatus === "Pending").length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-50 text-yellow-600">
              <FunnelIcon className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Delivered</p>
              <p className="text-2xl font-bold text-green-600">
                {mockOrders.filter((o) => o.orderStatus === "Delivered").length}
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
              <p className="text-sm font-medium text-gray-600">Cancelled</p>
              <p className="text-2xl font-bold text-red-600">
                {mockOrders.filter((o) => o.orderStatus === "Cancelled").length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-red-50 text-red-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">All Orders</h3>
            <p className="text-sm text-gray-600">Manage and track all customer orders</p>
          </div>
        </div>

        {/* Filters */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search orders by customer, ID, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                        <div className="text-sm text-gray-500">{order.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getPaymentStatusBadge(order.paymentStatus)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getOrderStatusBadge(order.orderStatus)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 p-1">
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => openUpdateModal(order)}
                          className="text-green-600 hover:text-green-900 text-xs font-medium"
                        >
                          Update Status
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
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
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                      </svg>
                      <h3 className="text-sm font-medium text-gray-900 mb-1">No orders found</h3>
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

      {/* Update Order Status Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 backdrop-blur-sm bg-white/30" onClick={() => setShowUpdateModal(false)} />

          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Order Status</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Order: {selectedOrder?.id}</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Packed">Packed</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Returned">Returned</option>
              </select>
            </div>
            <div className="flex space-x-3 justify-end">
              <button
                onClick={() => setShowUpdateModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateOrderStatus}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Orders
