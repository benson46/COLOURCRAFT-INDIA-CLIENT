import { Outlet, useNavigate } from "react-router"
import { useEffect } from "react"
import Sidebar from "../common/Sidebar"
import Header from "../common/Header"
import ToastConfig from "../../common/ToastConfig"
import { useAdminAuth } from "../../../context/adminAuthContext"

const AdminLayout = () => {
  const { admin,loading } = useAdminAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !admin) {
      navigate("/admin/")
    }
  }, [admin, loading,navigate])

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Toast Container */}
      <ToastConfig />
    </div>
  )
}

export default AdminLayout
