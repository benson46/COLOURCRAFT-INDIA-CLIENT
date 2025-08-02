import { Link } from "react-router";

const ProductCard = ({ product }) => {
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
      <Link to={`/product/${product._id}`}>
        {/* Product Image */}
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={
              product.images?.[0] || 
              "/placeholder.svg?height=400&width=400"
            }
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Info */}
        <div className="p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-500 transition-colors">
            {product.title}
          </h3>
          <p className="text-xl font-bold text-gray-900">
            ₹{product.price.toLocaleString('en-IN')}
          </p>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard;