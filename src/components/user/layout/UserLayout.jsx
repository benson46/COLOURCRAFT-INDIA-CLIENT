import { Outlet } from "react-router"
import Navbar from "../common/Navbar"
import Footer from "../common/Footer"
import ToastConfig from "../../common/ToastConfig"

const UserLayout = () => {
  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast Container */}
      <ToastConfig />
    </div>
  )
}

export default UserLayout
