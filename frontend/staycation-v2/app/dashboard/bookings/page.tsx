import Link from "next/link"
import MainLayout from "@/components/layout/MainLayout"
import { Search, Filter, Calendar } from "lucide-react"

export default function Bookings() {
  // In a real app, you would get the user data from your auth context
  const userRole = "owner"
  const userName = "Maria Silva"
  const userAvatar = "/placeholder.svg?height=32&width=32"

  return (
    <MainLayout userRole={userRole} userName={userName} userAvatar={userAvatar}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Bookings</h1>
            <p className="text-gray-600">Manage reservations for your properties</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <Calendar className="mr-2 text-primary" />
            <span className="text-gray-600">Today: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by guest name or property..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                <option>All Status</option>
                <option>Confirmed</option>
                <option>Pending</option>
                <option>Cancelled</option>
                <option>Completed</option>
              </select>
              <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg inline-flex items-center">
                <Filter size={18} className="mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Booking Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-gray-500 text-sm mb-2">Total Bookings</h3>
            <p className="text-3xl font-bold">48</p>
            <div className="mt-2 flex items-center text-green-600 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                />
              </svg>
              8% from last month
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-gray-500 text-sm mb-2">Upcoming Bookings</h3>
            <p className="text-3xl font-bold">12</p>
            <div className="mt-2 flex items-center text-green-600 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                />
              </svg>
              15% from last month
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-gray-500 text-sm mb-2">Completed Bookings</h3>
            <p className="text-3xl font-bold">32</p>
            <div className="mt-2 flex items-center text-green-600 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                />
              </svg>
              5% from last month
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-gray-500 text-sm mb-2">Cancellations</h3>
            <p className="text-3xl font-bold">4</p>
            <div className="mt-2 flex items-center text-red-600 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181"
                />
              </svg>
              2% from last month
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold">All Bookings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Guest
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Property
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Check In
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Check Out
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Guests
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  {
                    guest: "John Doe",
                    property: "Countryside Retreat 1",
                    checkIn: "May 15, 2023",
                    checkOut: "May 20, 2023",
                    guests: 4,
                    total: "$840",
                    status: "Confirmed",
                  },
                  {
                    guest: "Jane Smith",
                    property: "Countryside Retreat 2",
                    checkIn: "May 22, 2023",
                    checkOut: "May 25, 2023",
                    guests: 2,
                    total: "$450",
                    status: "Pending",
                  },
                  {
                    guest: "Robert Johnson",
                    property: "Countryside Retreat 3",
                    checkIn: "Jun 5, 2023",
                    checkOut: "Jun 10, 2023",
                    guests: 6,
                    total: "$950",
                    status: "Confirmed",
                  },
                  {
                    guest: "Emily Davis",
                    property: "Countryside Retreat 4",
                    checkIn: "Jun 15, 2023",
                    checkOut: "Jun 18, 2023",
                    guests: 3,
                    total: "$520",
                    status: "Pending",
                  },
                  {
                    guest: "Michael Wilson",
                    property: "Countryside Retreat 5",
                    checkIn: "Jun 20, 2023",
                    checkOut: "Jun 25, 2023",
                    guests: 5,
                    total: "$780",
                    status: "Confirmed",
                  },
                  {
                    guest: "Sarah Brown",
                    property: "Countryside Retreat 1",
                    checkIn: "Jul 1, 2023",
                    checkOut: "Jul 5, 2023",
                    guests: 2,
                    total: "$560",
                    status: "Cancelled",
                  },
                  {
                    guest: "David Miller",
                    property: "Countryside Retreat 3",
                    checkIn: "Jul 10, 2023",
                    checkOut: "Jul 15, 2023",
                    guests: 4,
                    total: "$750",
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
                          <div className="text-sm text-gray-500">guest{index + 1}@example.com</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.property}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.checkIn}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.checkOut}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.guests}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{booking.total}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.status === "Confirmed"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link href="#" className="text-primary hover:text-primary/80 mr-3">
                        View
                      </Link>
                      {booking.status === "Pending" && (
                        <>
                          <button className="text-green-600 hover:text-green-900 mr-3">Accept</button>
                          <button className="text-red-600 hover:text-red-900">Decline</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">1</span> to <span className="font-medium">7</span> of{" "}
                <span className="font-medium">48</span> results
              </div>
              <div className="flex items-center space-x-2">
                <button className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <button className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center">1</button>
                <button className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                  2
                </button>
                <button className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                  3
                </button>
                <span className="mx-1">...</span>
                <button className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                  7
                </button>
                <button className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

