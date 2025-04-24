import Link from "next/link"
import MainLayout from "@/components/layout/MainLayout"
import { Star, Search, Filter, Plus } from "lucide-react"

export default function Properties() {
  // In a real app, you would get the user data from your auth context
  const userRole = "owner"
  const userName = "Maria Silva"
  const userAvatar = "/placeholder.svg?height=32&width=32"

  return (
    <MainLayout userRole={userRole} userName={userName} userAvatar={userAvatar}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">My Properties</h1>
            <p className="text-gray-600">Manage your listings and check their performance</p>
          </div>
          <Link
            href="/dashboard/properties/new"
            className="mt-4 md:mt-0 bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-lg inline-flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Property
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search properties..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                <option>All Status</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Inactive</option>
              </select>
              <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg inline-flex items-center">
                <Filter size={18} className="mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Properties List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="bg-white rounded-xl overflow-hidden shadow-md">
              <div className="relative h-48">
                <img
                  src={`/placeholder.svg?height=300&width=400&text=Property+${item}`}
                  alt={`Property ${item}`}
                  className="w-full h-full object-cover"
                />
                <div
                  className={`absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-semibold ${
                    item === 3
                      ? "bg-yellow-100 text-yellow-800"
                      : item === 5
                        ? "bg-gray-100 text-gray-800"
                        : "bg-green-100 text-green-800"
                  }`}
                >
                  {item === 3 ? "Pending Approval" : item === 5 ? "Inactive" : "Active"}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">Countryside Retreat {item}</h3>
                <p className="text-gray-600 text-sm mb-2">São Paulo, Brazil</p>
                <div className="flex justify-between items-center mb-3">
                  <p className="font-semibold">
                    $120 <span className="text-gray-600 font-normal text-sm">night</span>
                  </p>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-primary fill-current" />
                    <span className="text-sm font-medium ml-1">4.9</span>
                    <span className="text-xs text-gray-500 ml-1">(28)</span>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-gray-500">Bookings</p>
                      <p className="font-semibold">{10 + item}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-gray-500">Views</p>
                      <p className="font-semibold">{120 + item * 10}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-3">
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
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
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
            <button className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">1</button>
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
              2
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
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
    </MainLayout>
  )
}

