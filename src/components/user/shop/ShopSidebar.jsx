import { useState } from "react"
import { categories, services } from "../../../data/products"

const ShopSidebar = ({ onFilterChange, filters }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleCategoryChange = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]

    onFilterChange({ ...filters, categories: newCategories })
  }

  const handleServiceChange = (service) => {
    const newServices = filters.services.includes(service)
      ? filters.services.filter((s) => s !== service)
      : [...filters.services, service]

    onFilterChange({ ...filters, services: newServices })
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    onFilterChange({ ...filters, search: e.target.value })
  }

  return (
    <div className="w-full lg:w-80 space-y-6">
      {/* Search Product */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Product</h3>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Products Filter */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Products</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <label key={category} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
              />
              <span className="ml-3 text-gray-700 group-hover:text-red-500 transition-colors">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Services Filter */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Services</h3>
        <div className="space-y-3">
          {services.map((service) => (
            <label key={service} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.services.includes(service)}
                onChange={() => handleServiceChange(service)}
                className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
              />
              <span className="ml-3 text-gray-700 group-hover:text-red-500 transition-colors">{service}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShopSidebar
