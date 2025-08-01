import ShopSidebar from "./ShopSidebar"
import ProductGrid from "./ProductGrid"
import NoProductsFound from "./NoProductFound"

const ShopContent = ({ filters, onFilterChange, filteredProducts }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:flex-shrink-0">
          <ShopSidebar filters={filters} onFilterChange={onFilterChange} />
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <NoProductsFound />
          )}
        </div>
      </div>
    </div>
  )
}

export default ShopContent