import { Route, Routes } from "react-router"
import UserLayout from "../components/user/layout/UserLayout"
import HomePage from "../pages/user/HomePage"
import AboutPage from "../pages/user/AboutPage"
import ServicesPage from "../pages/user/ServicesPage"
import Portfolio from "../pages/user/Portfolio"
import ContactPage from "../pages/user/ContactPage"
import ShopPage from "../pages/user/ShopPage"
import ProductsPage from "../pages/user/ProductsPage"
import ProductPage from "../pages/user/ProductPage"
import UserRegisterPage from "../pages/user/UserRegister"
import UserLoginPage from "../pages/user/UserLoginPage"
import { AuthProvider } from "../context/authContext"

const UserRouter = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Auth routes without layout */}
        <Route path="/register" element={<UserRegisterPage />} />
        <Route path="/login" element={<UserLoginPage />} />

        {/* Main routes with layout */}
        <Route path="/*" element={<UserLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="about-us" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="product/:id" element={<ProductPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default UserRouter
