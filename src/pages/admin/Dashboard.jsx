import DashboardCards from "../../components/admin/DashboardCards"
import RecentOrders from "../../components/admin/RecentOrders"

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Dashboard Cards */}
      <DashboardCards />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders - Takes 2 columns on xl screens */}
        <div className="xl:col-span-2">
          <RecentOrders />
        </div>

        {/* Quick Stats Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Pending Orders</span>
                <span className="text-lg font-bold text-orange-600">23</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Low Stock Items</span>
                <span className="text-lg font-bold text-red-600">5</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">New Messages</span>
                <span className="text-lg font-bold text-blue-600">12</span>
              </div>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="min-w-0">
                  <p className="text-sm text-gray-900">New order received</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="min-w-0">
                  <p className="text-sm text-gray-900">Product updated</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="min-w-0">
                  <p className="text-sm text-gray-900">Low stock alert</p>
                  <p className="text-xs text-gray-500">3 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
