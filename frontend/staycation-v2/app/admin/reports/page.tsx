import MainLayout from "@/components/layout/MainLayout"

export default function AdminReports() {
  // In a real app, you would get the user data from your auth context
  const userRole = "admin"
  const userName = "Admin User"
  const userAvatar = "/placeholder.svg?height=32&width=32"

  return (
    <MainLayout userRole={userRole} userName={userName} userAvatar={userAvatar}>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Platform Reports</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Bookings Overview</h2>
            <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">Booking Chart Placeholder</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Bookings</p>
                <p className="text-2xl font-bold">1,245</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Growth</p>
                <p className="text-2xl font-bold text-green-500">+15%</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Revenue</h2>
            <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">Revenue Chart Placeholder</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
                <p className="text-2xl font-bold">$124,500</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Growth</p>
                <p className="text-2xl font-bold text-green-500">+22%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Popular Regions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Region
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Bookings
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Growth
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">São Paulo</td>
                  <td className="px-6 py-4 whitespace-nowrap">458</td>
                  <td className="px-6 py-4 whitespace-nowrap">$45,800</td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-500">+12%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Rio de Janeiro</td>
                  <td className="px-6 py-4 whitespace-nowrap">356</td>
                  <td className="px-6 py-4 whitespace-nowrap">$35,600</td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-500">+8%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Minas Gerais</td>
                  <td className="px-6 py-4 whitespace-nowrap">245</td>
                  <td className="px-6 py-4 whitespace-nowrap">$24,500</td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-500">+15%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Bahia</td>
                  <td className="px-6 py-4 whitespace-nowrap">186</td>
                  <td className="px-6 py-4 whitespace-nowrap">$18,600</td>
                  <td className="px-6 py-4 whitespace-nowrap text-red-500">-3%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Export Reports</h2>
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md">Export Bookings (CSV)</button>
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md">Export Revenue (CSV)</button>
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md">Export User Data (CSV)</button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

