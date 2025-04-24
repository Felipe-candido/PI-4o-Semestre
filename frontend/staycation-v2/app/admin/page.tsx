import Link from "next/link"
import MainLayout from "@/components/layout/MainLayout"
import { DollarSign, Users, Home, Calendar, TrendingUp, ArrowUpRight } from "lucide-react"

export default function AdminDashboard() {
  // In a real app, you would get the user data from your auth context
  const userRole = "admin"
  const userName = "Admin User"
  const userAvatar = "/placeholder.svg?height=32&width=32"

  return (
    <MainLayout userRole={userRole} userName={userName} userAvatar={userAvatar}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's an overview of the platform.</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <span className="text-gray-600 mr-2">Last updated:</span>
            <span className="font-medium">{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Total Revenue</h2>
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold">$124,500</p>
              <p className="ml-2 text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                22%
              </p>
            </div>
            <p className="text-gray-600 text-sm mt-1">Compared to last month</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold">1,245</p>
              <p className="ml-2 text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                15%
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
              <p className="text-3xl font-bold">328</p>
              <p className="ml-2 text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                8%
              </p>
            </div>
            <p className="text-gray-600 text-sm mt-1">Compared to last month</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Bookings</h2>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold">856</p>
              <p className="ml-2 text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                12%
              </p>
            </div>
            <p className="text-gray-600 text-sm mt-1">Compared to last month</p>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Pending Approvals</h2>
            <Link href="/admin/approvals" className="text-primary hover:text-primary/80 font-medium flex items-center">
              View all
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  {
                    property: "Countryside Retreat 1",
                    owner: "John Doe",
                    submitted: "May 15, 2023",
                    status: "Pending",
                  },
                  {
                    property: "Countryside Retreat 2",
                    owner: "Jane Smith",
                    submitted: "May 16, 2023",
                    status: "Pending",
                  },
                  {
                    property: "Countryside Retreat 3",
                    owner: "Robert Johnson",
                    submitted: "May 17, 2023",
                    status: "Pending",
                  },
                  {
                    property: "Countryside Retreat 4",
                    owner: "Emily Davis",
                    submitted: "May 18, 2023",
                    status: "Pending",
                  },
                  {
                    property: "Countryside Retreat 5",
                    owner: "Michael Wilson",
                    submitted: "May 19, 2023",
                    status: "Pending",
                  },
                ].map((property, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-md object-cover"
                            src={`/placeholder.svg?height=40&width=40&text=Property`}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{property.property}</div>
                          <div className="text-xs text-gray-500">São Paulo, Brazil</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={`/placeholder.svg?height=32&width=32&text=Owner`}
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{property.owner}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{property.submitted}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {property.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-green-600 hover:text-green-900 mr-3">Approve</button>
                      <button className="text-red-600 hover:text-red-900 mr-3">Reject</button>
                      <Link href="#" className="text-primary hover:text-primary/80">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recent Users</h2>
            <Link href="/admin/users" className="text-primary hover:text-primary/80 font-medium flex items-center">
              View all
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  {
                    name: "John Doe",
                    email: "john@example.com",
                    role: "Owner",
                    joined: "May 15, 2023",
                    status: "Active",
                  },
                  {
                    name: "Jane Smith",
                    email: "jane@example.com",
                    role: "Tenant",
                    joined: "May 16, 2023",
                    status: "Active",
                  },
                  {
                    name: "Robert Johnson",
                    email: "robert@example.com",
                    role: "Owner",
                    joined: "May 17, 2023",
                    status: "Active",
                  },
                  {
                    name: "Emily Davis",
                    email: "emily@example.com",
                    role: "Tenant",
                    joined: "May 18, 2023",
                    status: "Inactive",
                  },
                  {
                    name: "Michael Wilson",
                    email: "michael@example.com",
                    role: "Owner",
                    joined: "May 19, 2023",
                    status: "Active",
                  },
                ].map((user, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={`/placeholder.svg?height=40&width=40&text=User`}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.joined}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link href="#" className="text-primary hover:text-primary/80 mr-3">
                        Edit
                      </Link>
                      <button className="text-red-600 hover:text-red-900">Disable</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Platform Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">Revenue Overview</h2>
            <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Chart placeholder - Revenue data would be displayed here</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">User Growth</h2>
            <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Chart placeholder - User growth data would be displayed here</p>
            </div>
          </div>
        </div>

        {/* Popular Regions */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-6">Popular Regions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Region
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Properties
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bookings
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Growth
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  {
                    region: "São Paulo",
                    properties: 120,
                    bookings: 458,
                    revenue: "$45,800",
                    growth: "+12%",
                  },
                  {
                    region: "Rio de Janeiro",
                    properties: 95,
                    bookings: 356,
                    revenue: "$35,600",
                    growth: "+8%",
                  },
                  {
                    region: "Minas Gerais",
                    properties: 75,
                    bookings: 245,
                    revenue: "$24,500",
                    growth: "+15%",
                  },
                  {
                    region: "Bahia",
                    properties: 65,
                    bookings: 186,
                    revenue: "$18,600",
                    growth: "-3%",
                  },
                  {
                    region: "Santa Catarina",
                    properties: 55,
                    bookings: 165,
                    revenue: "$16,500",
                    growth: "+5%",
                  },
                ].map((region, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{region.region}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{region.properties}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{region.bookings}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{region.revenue}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm font-medium ${
                          region.growth.startsWith("+") ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {region.growth}
                      </div>
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

