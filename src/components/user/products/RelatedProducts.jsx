import ProductCard from "./ProductCard"
import { products } from "../../../data/products"

const RelatedProducts = ({ currentProductId, category }) => {
  // Get related products from the same category, excluding current product
  const relatedProducts = products
    .filter((product) => product.id !== currentProductId && product.category === category)
    .slice(0, 4)

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-12">Related Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map((product) => (
            <div key={product.id} className="group">
              <ProductCard product={product} />
              <div className="mt-4 text-center">
                <button className="bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RelatedProducts
