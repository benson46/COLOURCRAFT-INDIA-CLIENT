"use client"

import { useState, useEffect } from "react"

const RecentOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Mock data as fallback - limited to 10 items
  const mockOrders = [
    {
      id: "#ORD-001",
      customer: "John Smith",
      date: "2024-01-15",
      paymentStatus: "Completed",
      orderStatus: "Delivered",
    },
    {
      id: "#ORD-002",
      customer: "Sarah Johnson",
      date: "2024-01-15",
      paymentStatus: "Pending",
      orderStatus: "Shipped",
    },
    {
      id: "#ORD-003",
      customer: "Mike Wilson",
      date: "2024-01-14",
      paymentStatus: "Failed",
      orderStatus: "Cancelled",
    },
    {
      id: "#ORD-004",
      customer: "Emily Davis",
      date: "2024-01-14",
      paymentStatus: "Completed",
      orderStatus: "Out for Delivery",
    },
    {
      id: "#ORD-005",
      customer: "David Brown",
      date: "2024-01-13",
      paymentStatus: "Refunded",
      orderStatus: "Returned",
    },
    {
      id: "#ORD-006",
      customer: "Lisa Anderson",
      date: "2024-01-13",
      paymentStatus: "Completed",
      orderStatus: "Packed",
    },
    {
      id: "#ORD-007",
      customer: "Tom Garcia",
      date: "2024-01-12",
      paymentStatus: "Pending",
      orderStatus: "Confirmed",
    },
    {
      id: "#ORD-008",
      customer: "Anna Martinez",
      date: "2024-01-12",
      paymentStatus: "Completed",
      orderStatus: "Return Requested",
    },
    {
      id: "#ORD-009",
      customer: "James Wilson",
      date: "2024-01-11",
      paymentStatus: "Completed",
      orderStatus: "Delivered",
    },
    {
      id: "#ORD-010",
      customer: "Maria Rodriguez",
      date: "2024-01-11",
      paymentStatus: "Pending",
      orderStatus: "Processing",
    },
  ]

  useEffect(() => {
    fetchRecentOrders()
  }, [])

  const fetchRecentOrders = async () => {
    try {
      setLoading(true)
      setError(null)

      // TODO: Replace with actual API
      // const response = await dev_admin_api.get('/orders?limit=10&sort=recent');
      // setOrders(response.data);

      // Using mock data for now with simulated delay
      setTimeout(() => {
        setOrders(mockOrders.slice(0, 10)) // Ensure only 10 items
        setLoading(false)
      }, 1000)
    } catch (err) {
      console.error("Error fetching recent orders:", err)
      setError("Failed to load recent orders")
      setOrders(mockOrders.slice(0, 10)) // Fallback to mock data
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          <p className="text-sm text-gray-600">Latest 10 customer orders and their status</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading recent orders...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          <p className="text-sm text-gray-600">Latest 10 customer orders and their status</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-gray-600 mb-2">{error}</p>
            <button onClick={fetchRecentOrders} className="text-blue-600 hover:text-blue-800 font-medium">
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Empty state
  if (!orders.length) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          <p className="text-sm text-gray-600">Latest 10 customer orders and their status</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="text-gray-600">No recent orders available.</p>
          </div>
        </div>
      </div>
    )
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
      "Failed Delivery Attempt": "bg-red-100 text-red-800",
      "Return Requested": "bg-amber-100 text-amber-800",
      "Return Approved": "bg-teal-100 text-teal-800",
      "Return Rejected": "bg-red-100 text-red-800",
      Returned: "bg-gray-100 text-gray-800",
      "Refund Initiated": "bg-blue-100 text-blue-800",
      "Refund Completed": "bg-green-100 text-green-800",
      Cancelled: "bg-red-100 text-red-800",
      "Cancellation Rejected": "bg-red-100 text-red-800",
      Processing: "bg-blue-100 text-blue-800",
    }

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status] || "bg-gray-100 text-gray-800"}`}
        title={status}
      >
        {status}
      </span>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
        <p className="text-sm text-gray-600">Latest 10 customer orders and their status</p>
      </div>

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
                Payment Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{getPaymentStatusBadge(order.paymentStatus)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{getOrderStatusBadge(order.orderStatus)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
          View all orders →
        </button>
      </div>
    </div>
  )
}

export default RecentOrders
