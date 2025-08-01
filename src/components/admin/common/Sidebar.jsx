import { useState } from "react"
import { NavLink } from "react-router"
import { LayoutDashboard, Users, ShoppingCart, Package, Settings, Menu, X, FolderOpen } from "lucide-react"

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { id: "users", label: "Users", icon: Users, path: "/admin/users" },
    { id: "orders", label: "Orders", icon: ShoppingCart, path: "/admin/orders" },
    { id: "products", label: "Products", icon: Package, path: "/admin/products" },
    { id: "categories", label: "Categories", icon: FolderOpen, path: "/admin/categories" },
    { id: "settings", label: "Settings", icon: Settings, path: "/admin/settings" },
  ]

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  const closeMobileSidebar = () => {
    setIsMobileOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg hover:bg-gray-50 transition-colors border border-gray-200"
        aria-label="Toggle mobile menu"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 backdrop-blur-sm bg-black/20 z-30"
          onClick={closeMobileSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-40
          ${isCollapsed ? "w-16" : "w-64"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col
        `}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 min-h-[73px]">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 text-sm">Colourcraft</span>
                <span className="text-xs text-gray-500">Admin Panel</span>
              </div>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex p-1.5 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu size={16} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={closeMobileSidebar}
                className={({ isActive }) =>
                  `group flex items-center px-3 py-2.5 rounded-lg text-left transition-all duration-200 relative ${
                    isActive
                      ? "bg-blue-50 text-blue-700 font-medium shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  } ${isCollapsed ? "justify-center" : ""}`
                }
              >
                <Icon size={20} className="flex-shrink-0" />
                {!isCollapsed && <span className="ml-3 font-medium truncate">{item.label}</span>}

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="text-xs text-gray-500 text-center">© 2024 Colourcraft India</div>
          </div>
        )}
      </div>
    </>
  )
}

export default Sidebar
