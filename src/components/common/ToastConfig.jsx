import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const ToastConfig = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      className="mt-16 sm:mt-4"
      toastClassName="rounded-lg shadow-lg"
      bodyClassName="text-sm font-medium"
      progressClassName="bg-gradient-to-r from-orange-500 to-red-600"
      limit={5}
    />
  )
}

export default ToastConfig
