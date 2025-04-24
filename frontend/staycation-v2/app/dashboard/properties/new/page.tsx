import MainLayout from "@/components/layout/MainLayout"

export default function CreateListing() {
  // In a real app, you would get the user data from your auth context
  const userRole = "owner"
  const userName = "John Doe"
  const userAvatar = "/placeholder.svg?height=32&width=32"

  return (
    <MainLayout userRole={userRole} userName={userName} userAvatar={userAvatar}>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create New Listing</h1>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <form className="space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Property Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter property name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Property Type</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>Farm House</option>
                    <option>Ranch</option>
                    <option>Country House</option>
                    <option>Villa</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter city"
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Pricing</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Price per Night</label>
                  <input type="number" className="w-full p-2 border border-gray-300 rounded-md" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Weekend Price</label>
                  <input type="number" className="w-full p-2 border border-gray-300 rounded-md" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Cleaning Fee</label>
                  <input type="number" className="w-full p-2 border border-gray-300 rounded-md" placeholder="0.00" />
                </div>
              </div>
            </div>

            {/* Photos */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Photos</h2>
              <div className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center">
                <p className="text-gray-500">Drag and drop photos here or click to upload</p>
                <button type="button" className="mt-2 px-4 py-2 bg-gray-200 rounded-md">
                  Select Files
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button type="submit" className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
                Create Listing
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  )
}

