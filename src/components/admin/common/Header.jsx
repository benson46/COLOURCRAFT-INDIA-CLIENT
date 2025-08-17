import { useState } from "react";
import { useLocation } from "react-router";
import {
  MagnifyingGlassIcon,
  BellIcon,
  ChevronDownIcon,
  SunIcon,
  MoonIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useAdminAuth } from "../../../context/adminAuthContext";
import { dev_admin_api } from "../../../utils/axios";
import { toast } from "react-toastify";



const Header = () => {
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const {admin,setAdmin} = useAdminAuth();

  const getPageTitle = (pathname) => {
    if (pathname.includes("/admin/users")) return "User Management";
    if (pathname.includes("/admin/orders")) return "Orders Management";
    if (pathname.includes("/admin/products")) return "Products Management";
    if (pathname.includes("/admin/categories")) return "Categories Management";
    if (pathname.includes("/admin/settings")) return "Settings";
    return "Dashboard";
  };



  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const logoutAdmin = async() => {
    try {
      const response = await dev_admin_api.post("/logout"); 

      if(response.data.success){
        setAdmin(null);
        localStorage.removeItem("admin");
        toast.success("Logged out successfully");
      }
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Page Title */}
        <div className="flex items-center space-x-4 min-w-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 ml-12 lg:ml-0 truncate">
            {getPageTitle(location.pathname)}
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Search - Hidden on mobile */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-48 lg:w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
            />
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <SunIcon className="h-5 w-5 text-gray-600" />
            ) : (
              <MoonIcon className="h-5 w-5 text-gray-600" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
              aria-label="Notifications"
            >
              <BellIcon className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400"></span>
            </button>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={toggleProfile}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Profile menu"
            >
              <UserCircleIcon className="h-8 w-8 text-gray-600" />
              <div className="hidden sm:block text-left">
                <span className="text-sm font-medium text-gray-700">
                  John Doe
                </span>
                <div className="text-xs text-gray-500">Administrator</div>
              </div>
              <ChevronDownIcon className="h-4 w-4 text-gray-500" />
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsProfileOpen(false)}
                  aria-hidden="true"
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Settings
                  </a>
                  <hr className="my-1 border-gray-200" />
                  <button onClick={logoutAdmin} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
