import MainLayout from "@/components/layout/MainLayout"
import { DollarSign, Download, Calendar, ArrowUpRight, TrendingUp, Star } from "lucide-react"

export default function Earnings() {
  // In a real app, you would get the user data from your auth context
  const userRole = "owner"
  const userName = "Maria Silva"
  const userAvatar = "/placeholder.svg?height=32&width=32"

  return (
    <MainLayout userRole={userRole} userName={userName} userAvatar={userAvatar}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Earnings</h1>
            <p className="text-gray-600">Track your income and financial performance</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg inline-flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Last 30 days
            </button>
            <button className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg inline-flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* Earnings Overview */}
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
              <h2 className="text-lg font-semibold text-gray-700">This Month</h2>
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold">$2,450</p>
              <p className="ml-2 text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                8%
              </p>
            </div>
            <p className="text-gray-600 text-sm mt-1">Compared to last month</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Pending</h2>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold">$850</p>
              <p className="ml-2 text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                15%
              </p>
            </div>
            <p className="text-gray-600 text-sm mt-1">Compared to last month</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Platform Fee</h2>
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold">$1,258</p>
              <p className="ml-2 text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                12%
              </p>
            </div>
            <p className="text-gray-600 text-sm mt-1">Compared to last month</p>
          </div>
        </div>

        {/* Earnings Chart */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Earnings Overview</h2>
            <div className="flex space-x-2">
              <button className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">Monthly</button>
              <button className="hover:bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">Yearly</button>
            </div>
          </div>
          <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder - Monthly earnings data would be displayed here</p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Recent Transactions</h2>
              <button className="text-primary hover:text-primary/80 font-medium flex items-center">
                View all
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Transaction ID
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
                    Guest
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  {
                    id: "TRX-78945",
                    property: "Countryside Retreat 1",
                    guest: "John Doe",
                    date: "May 15, 2023",
                    amount: "$840",
                    status: "Completed",
                  },
                  {
                    id: "TRX-78946",
                    property: "Countryside Retreat 2",
                    guest: "Jane Smith",
                    date: "May 22, 2023",
                    amount: "$450",
                    status: "Pending",
                  },
                  {
                    id: "TRX-78947",
                    property: "Countryside Retreat 3",
                    guest: "Robert Johnson",
                    date: "Jun 5, 2023",
                    amount: "$950",
                    status: "Completed",
                  },
                  {
                    id: "TRX-78948",
                    property: "Countryside Retreat 4",
                    guest: "Emily Davis",
                    date: "Jun 15, 2023",
                    amount: "$520",
                    status: "Pending",
                  },
                  {
                    id: "TRX-78949",
                    property: "Countryside Retreat 5",
                    guest: "Michael Wilson",
                    date: "Jun 20, 2023",
                    amount: "$780",
                    status: "Completed",
                  },
                ].map((transaction, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{transaction.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{transaction.property}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{transaction.guest}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{transaction.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{transaction.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Property Performance */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Property Performance</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
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
                    Total Bookings
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Occupancy Rate
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Average Rating
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  {
                    property: "Countryside Retreat 1",
                    bookings: 18,
                    occupancy: "75%",
                    rating: 4.9,
                    revenue: "$5,400",
                  },
                  {
                    property: "Countryside Retreat 2",
                    bookings: 12,
                    occupancy: "60%",
                    rating: 4.7,
                    revenue: "$3,240",
                  },
                  {
                    property: "Countryside Retreat 3",
                    bookings: 10,
                    occupancy: "55%",
                    rating: 4.8,
                    revenue: "$2,850",
                  },
                  {
                    property: "Countryside Retreat 4",
                    bookings: 8,
                    occupancy: "45%",
                    rating: 4.6,
                    revenue: "$2,080",
                  },
                  {
                    property: "Countryside Retreat 5",
                    bookings: 6,
                    occupancy: "35%",
                    rating: 4.5,
                    revenue: "$1,560",
                  },
                ].map((property, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{property.property}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{property.bookings}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{property.occupancy}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-primary fill-current" />
                        <span className="ml-1 text-sm text-gray-900">{property.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{property.revenue}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payout History */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-6">Payout History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Payout ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Method
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  {
                    id: "PAY-12345",
                    date: "May 31, 2023",
                    amount: "$2,450",
                    method: "Bank Transfer",
                    status: "Completed",
                  },
                  {
                    id: "PAY-12346",
                    date: "Apr 30, 2023",
                    amount: "$1,980",
                    method: "Bank Transfer",
                    status: "Completed",
                  },
                  {
                    id: "PAY-12347",
                    date: "Mar 31, 2023",
                    amount: "$2,150",
                    method: "Bank Transfer",
                    status: "Completed",
                  },
                  {
                    id: "PAY-12348",
                    date: "Feb 28, 2023",
                    amount: "$1,750",
                    method: "Bank Transfer",
                    status: "Completed",
                  },
                ].map((payout, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{payout.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{payout.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{payout.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{payout.method}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {payout.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

