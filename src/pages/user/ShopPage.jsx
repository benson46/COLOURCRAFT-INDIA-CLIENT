import { useState, useMemo } from "react";
import ShopHeader from "../../components/user/shop/ShopHeader";
import ShopContent from "../../components/user/shop/ShopContent";
import { products } from "../../data/products";
import Navbar from "../../components/user/common/Navbar";
import NewsLetter from '../../components/user/common/NewsLetter'
import Footer from '../../components/user/common/Footer'
import { Helmet } from "react-helmet";
const ShopPage = () => {
  const [filters, setFilters] = useState({
    categories: [],
    services: [],
    search: "",
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      if (
        filters.search &&
        !product.name.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      // Category filter
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(product.category)
      ) {
        return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <>
    <Helmet>
      <title>Shop</title>
    </Helmet>
    <div className=" ShopPage min-h-screen bg-cream-50">
      <ShopHeader />
      <ShopContent
        filters={filters}
        onFilterChange={setFilters}
        filteredProducts={filteredProducts}
      />
      <NewsLetter/>
    </div>
    </>
  );
};

export default ShopPage;
