import { Users, ShoppingCart, DollarSign, Activity } from "lucide-react"

const DashboardCards = () => {
  const cards = [
    {
      title: "Total Users",
      value: "12,345",
      change: "+12%",
      changeType: "positive",
      icon: Users,
      color: "blue",
    },
    {
      title: "Today's Orders",
      value: "1,234",
      change: "+8%",
      changeType: "positive",
      icon: ShoppingCart,
      color: "green",
    },
    {
      title: "Revenue",
      value: "$45,678",
      change: "+15%",
      changeType: "positive",
      icon: DollarSign,
      color: "purple",
    },
    {
      title: "Active Sessions",
      value: "2,345",
      change: "-3%",
      changeType: "negative",
      icon: Activity,
      color: "orange",
    },
  ]

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-50 text-blue-600",
      green: "bg-green-50 text-green-600",
      purple: "bg-purple-50 text-purple-600",
      orange: "bg-orange-50 text-orange-600",
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon

        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-600 mb-1 truncate">{card.title}</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 truncate">{card.value}</p>
                <div className="flex items-center">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      card.changeType === "positive" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {card.change}
                  </span>
                  <span className="text-xs text-gray-500 ml-2 hidden sm:inline">vs last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg flex-shrink-0 ml-4 ${getColorClasses(card.color)}`}>
                <Icon size={20} className="sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default DashboardCards
