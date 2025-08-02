import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useAuth } from "../../../context/authContext";

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user,setUser } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-cream-50 sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">
              COLURCRAFT <span className="text-orange-500">INDIA</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                to="/"
                className={`${
                  currentPath === "/"
                    ? "text-coral-500 font-medium"
                    : "text-gray-700 hover:text-coral-500"
                } transition-colors`}
              >
                Home
              </Link>
              <Link
                to="/about-us"
                className={`${
                  currentPath === "/about-us"
                    ? "text-coral-500 font-medium"
                    : "text-gray-700 hover:text-coral-500"
                } transition-colors`}
              >
                About
              </Link>
              <Link
                to="/services"
                className={`${
                  currentPath === "/services"
                    ? "text-coral-500 font-medium"
                    : "text-gray-700 hover:text-coral-500"
                } transition-colors`}
              >
                Services
              </Link>
              <Link
                to="/products"
                className={`${
                  currentPath === "/products"
                    ? "text-coral-500 font-medium"
                    : "text-gray-700 hover:text-coral-500"
                } transition-colors`}
              >
                Shop
              </Link>
              <Link
                to="/portfolio"
                className={`${
                  currentPath === "/portfolio"
                    ? "text-coral-500 font-medium"
                    : "text-gray-700 hover:text-coral-500"
                } transition-colors`}
              >
                Portfolio
              </Link>
              <Link
                to="/contact"
                className={`${
                  currentPath === "/contact"
                    ? "text-coral-500 font-medium"
                    : "text-gray-700 hover:text-coral-500"
                } transition-colors`}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <span className="text-gray-700 font-medium"> {user.name}</span>
                <button  className="text-gray-700 hover:text-coral-500 cursor-pointer" onClick={()=> setUser(undefined)}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-coral-500 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-700 hover:text-coral-500 font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-coral-500"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link to="/" className="block px-3 py-2 text-coral-500 font-medium">
                Home
              </Link>
              <Link to="/about-us" className="block px-3 py-2 text-gray-700">
                About
              </Link>
              <Link to="/services" className="block px-3 py-2 text-gray-700">
                Services
              </Link>
              <Link to="/shop" className="block px-3 py-2 text-gray-700">
                Shop
              </Link>
              <Link to="/portfolio" className="block px-3 py-2 text-gray-700">
                Portfolio
              </Link>
              <Link to="/contact" className="block px-3 py-2 text-gray-700">
                Contact
              </Link>
            </div>

            {!user && (
              <div className="px-2 py-2 border-t space-y-1 sm:px-3 bg-white">
                <Link to="/login" className="block px-3 py-2 text-gray-700">
                  Login
                </Link>
                <Link to="/register" className="block px-3 py-2 text-gray-700">
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
