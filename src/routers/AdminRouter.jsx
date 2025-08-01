import { Routes, Route } from "react-router"
import AdminLayout from "../components/admin/layout/AdminLayout"
import AdminLogin from "../pages/admin/AdminLogin"
import Dashboard from "../pages/admin/Dashboard"
import UserManagement from "../pages/admin/UserManagement"
import Orders from "../pages/admin/Orders"
import Products from "../pages/admin/Products"
import CategoryManagement from "../pages/admin/CategoryManagement"
import Settings from "../pages/admin/Settings"
import { AdminAuthProvider } from "../context/adminAuthContext"

const AdminRouter = () => {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<CategoryManagement />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </AdminAuthProvider>
  )
}

export default AdminRouter
