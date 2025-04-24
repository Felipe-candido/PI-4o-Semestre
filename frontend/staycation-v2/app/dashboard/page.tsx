import Link from "next/link"
import MainLayout from "@/components/layout/MainLayout"
import { DollarSign, Users, Home, Calendar, TrendingUp, ArrowUpRight, Star } from "lucide-react"

export default function OwnerDashboard() {
  // In a real app, you would get the user data from your auth context
  const userRole = "owner"
  const userName = "Maria Silva"
  const userAvatar = "/placeholder.svg?height=32&width=32"

  return (
    <MainLayout userRole={userRole} userName={userName} userAvatar={userAvatar}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
            <p className="text-gray-600">Welcome back, Maria! Here's an overview of your properties.</p>
          </div>
          <Link
            href="/dashboard/properties/new"
            className="mt-4 md:mt-0 bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-lg inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add New Property
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Total Earnings</h2>
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold">$12,580</p>
              <p className="ml-2 text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                12%
              </p>
            </div>
            <p className="text-gray-600 text-sm mt-1">Compared to last month</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Total Bookings</h2>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold">48</p>
              <p className="ml-2 text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                8%
              </p>
            </div>
            <p className="text-gray-600 text-sm mt-1">Compared to last month</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Properties</h2>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Home className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold">5</p>
              <p className="ml-2 text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                20%
              </p>
            </div>
            <p className="text-gray-600 text-sm mt-1">Compared to last month</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Total Guests</h2>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold">156</p>
              <p className="ml-2 text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                5%
              </p>
            </div>
            <p className="text-gray-600 text-sm mt-1">Compared to last month</p>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recent Bookings</h2>
            <Link
              href="/dashboard/bookings"
              className="text-primary hover:text-primary/80 font-medium flex items-center"
            >
              View all
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Guest
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  {
                    guest: "John Doe",
                    property: "Countryside Retreat 1",
                    dates: "May 15-20, 2023",
                    amount: "$840",
                    status: "Confirmed",
                  },
                  {
                    guest: "Jane Smith",
                    property: "Countryside Retreat 2",
                    dates: "May 22-25, 2023",
                    amount: "$450",
                    status: "Pending",
                  },
                  {
                    guest: "Robert Johnson",
                    property: "Countryside Retreat 3",
                    dates: "Jun 5-10, 2023",
                    amount: "$950",
                    status: "Confirmed",
                  },
                  {
                    guest: "Emily Davis",
                    property: "Countryside Retreat 4",
                    dates: "Jun 15-18, 2023",
                    amount: "$520",
                    status: "Pending",
                  },
                  {
                    guest: "Michael Wilson",
                    property: "Countryside Retreat 5",
                    dates: "Jun 20-25, 2023",
                    amount: "$780",
                    status: "Confirmed",
                  },
                ].map((booking, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={`/placeholder.svg?height=40&width=40&text=Guest`}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{booking.guest}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.property}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.dates}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{booking.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.status === "Confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Your Properties */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Your Properties</h2>
            <Link
              href="/dashboard/properties"
              className="text-primary hover:text-primary/80 font-medium flex items-center"
            >
              View all
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-xl overflow-hidden shadow-md">
                <div className="relative h-48">
                  <img
                    src={`/placeholder.svg?height=300&width=400&text=Property+${item}`}
                    alt={`Property ${item}`}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-semibold ${
                      item === 3 ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                    }`}
                  >
                    {item === 3 ? "Pending Approval" : "Active"}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">Countryside Retreat {item}</h3>
                  <p className="text-gray-600 text-sm mb-3">São Paulo, Brazil</p>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">
                      $120 <span className="text-gray-600 font-normal text-sm">night</span>
                    </p>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-primary fill-current" />
                      <span className="text-sm font-medium ml-1">4.9</span>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <Link
                      href={`/dashboard/properties/${item}`}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium py-2 px-4 rounded-lg text-center"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/properties/${item}`}
                      className="flex-1 bg-primary hover:bg-primary/90 text-white text-sm font-medium py-2 px-4 rounded-lg text-center"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Earnings Chart */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Monthly Earnings</h2>
          <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder - Monthly earnings data would be displayed here</p>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

