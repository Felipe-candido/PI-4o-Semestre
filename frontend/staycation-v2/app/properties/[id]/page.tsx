import Link from "next/link"
import MainLayout from "@/components/layout/MainLayout"
import { Star, MapPin, Wifi, Tv, Utensils, Car, Wind, PawPrint } from "lucide-react"

export default function PropertyDetails({ params }: { params: { id: string } }) {
  // In a real app, you would get the user data from your auth context
  const userRole = "visitor"
  const userName = "Guest"
  const userAvatar = "/placeholder.svg?height=32&width=32"

  return (
    <MainLayout userRole={userRole} userName={userName} userAvatar={userAvatar}>
      <div className="container mx-auto px-4">
        {/* Property Title */}
        <section className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Peaceful Countryside Retreat</h1>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-primary fill-current" />
              <span className="ml-1 font-medium">4.92</span>
              <span className="mx-1">·</span>
              <Link href="#reviews" className="text-gray-600 hover:underline">
                128 reviews
              </Link>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-1" />
              <span>São Paulo, Brazil</span>
            </div>
            <button className="ml-auto text-primary hover:underline flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 0m-3.935 0l-9.566-5.314m9.566-4.314a2.25 2.25 0 10-3.935 0m3.935 0l-9.566 5.314"
                />
              </svg>
              Share
            </button>
            <button className="text-primary hover:underline flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              Save
            </button>
          </div>
        </section>

        {/* Property Images */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:grid-rows-2 rounded-xl overflow-hidden">
            <div className="md:col-span-2 md:row-span-2">
              <img
                src="/placeholder.svg?height=600&width=800&text=Main+Image"
                alt="Main property view"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <img
                src="/placeholder.svg?height=300&width=400&text=Image+2"
                alt="Property image"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <img
                src="/placeholder.svg?height=300&width=400&text=Image+3"
                alt="Property image"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <img
                src="/placeholder.svg?height=300&width=400&text=Image+4"
                alt="Property image"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <img
                src="/placeholder.svg?height=300&width=400&text=Image+5"
                alt="Property image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <button className="mt-2 border border-gray-800 rounded-lg px-4 py-2 text-sm font-medium flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            Show all photos
          </button>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Host Info */}
            <section className="mb-8 border-b border-gray-200 pb-8">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Farm house hosted by Maria</h2>
                  <p className="text-gray-600">8 guests · 4 bedrooms · 6 beds · 3 baths</p>
                </div>
                <img
                  src="/placeholder.svg?height=56&width=56&text=Host"
                  alt="Host"
                  className="w-14 h-14 rounded-full"
                />
              </div>
            </section>

            {/* Property Description */}
            <section className="mb-8 border-b border-gray-200 pb-8">
              <h2 className="text-xl font-bold mb-4">About this place</h2>
              <p className="text-gray-600 mb-4">
                Welcome to our peaceful countryside retreat, nestled in the beautiful hills of São Paulo. This spacious
                farm house offers the perfect escape from city life, with stunning views, fresh air, and plenty of
                outdoor activities.
              </p>
              <p className="text-gray-600 mb-4">
                The property features 4 comfortable bedrooms, a fully equipped kitchen, spacious living areas, and a
                large outdoor space with a pool, BBQ area, and garden. It's perfect for families, groups of friends, or
                anyone looking to reconnect with nature.
              </p>
              <p className="text-gray-600">
                Located just 1 hour from São Paulo city, you'll enjoy the tranquility of the countryside while still
                being close to amenities. Nearby attractions include hiking trails, a lake for fishing, and local farms
                where you can buy fresh produce.
              </p>
              <button className="mt-4 text-primary font-semibold hover:underline">Show more</button>
            </section>

            {/* Amenities */}
            <section className="mb-8 border-b border-gray-200 pb-8">
              <h2 className="text-xl font-bold mb-4">What this place offers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Wifi className="w-6 h-6 mr-4 text-gray-600" />
                  <span>Free Wifi</span>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mr-4 text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  <span>Pool</span>
                </div>
                <div className="flex items-center">
                  <Tv className="w-6 h-6 mr-4 text-gray-600" />
                  <span>TV with streaming</span>
                </div>
                <div className="flex items-center">
                  <Utensils className="w-6 h-6 mr-4 text-gray-600" />
                  <span>Fully equipped kitchen</span>
                </div>
                <div className="flex items-center">
                  <Car className="w-6 h-6 mr-4 text-gray-600" />
                  <span>Free parking on premises</span>
                </div>
                <div className="flex items-center">
                  <Wind className="w-6 h-6 mr-4 text-gray-600" />
                  <span>Air conditioning</span>
                </div>
                <div className="flex items-center">
                  <PawPrint className="w-6 h-6 mr-4 text-gray-600" />
                  <span>Pets allowed</span>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mr-4 text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
                    />
                  </svg>
                  <span>BBQ grill</span>
                </div>
              </div>
              <button className="mt-6 border border-gray-800 rounded-lg px-6 py-2 font-medium">
                Show all 12 amenities
              </button>
            </section>

            {/* Calendar */}
            <section className="mb-8 border-b border-gray-200 pb-8">
              <h2 className="text-xl font-bold mb-4">7 nights in São Paulo</h2>
              <p className="text-gray-600 mb-4">May 15, 2023 - May 22, 2023</p>
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-gray-600">Calendar placeholder - would show availability</p>
              </div>
            </section>

            {/* Reviews */}
            <section id="reviews" className="mb-8">
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-primary fill-current" />
                <span className="ml-1 font-bold text-lg">4.92</span>
                <span className="mx-1">·</span>
                <span className="font-bold text-lg">128 reviews</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col">
                  <div className="flex justify-between mb-2">
                    <span>Cleanliness</span>
                    <div className="flex items-center">
                      <div className="w-24 h-1 bg-gray-300 rounded-full mr-2">
                        <div className="w-[95%] h-full bg-gray-800 rounded-full"></div>
                      </div>
                      <span className="text-sm">4.8</span>
                    </div>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Communication</span>
                    <div className="flex items-center">
                      <div className="w-24 h-1 bg-gray-300 rounded-full mr-2">
                        <div className="w-full h-full bg-gray-800 rounded-full"></div>
                      </div>
                      <span className="text-sm">5.0</span>
                    </div>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Check-in</span>
                    <div className="flex items-center">
                      <div className="w-24 h-1 bg-gray-300 rounded-full mr-2">
                        <div className="w-[90%] h-full bg-gray-800 rounded-full"></div>
                      </div>
                      <span className="text-sm">4.5</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex justify-between mb-2">
                    <span>Accuracy</span>
                    <div className="flex items-center">
                      <div className="w-24 h-1 bg-gray-300 rounded-full mr-2">
                        <div className="w-[95%] h-full bg-gray-800 rounded-full"></div>
                      </div>
                      <span className="text-sm">4.8</span>
                    </div>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Location</span>
                    <div className="flex items-center">
                      <div className="w-24 h-1 bg-gray-300 rounded-full mr-2">
                        <div className="w-[90%] h-full bg-gray-800 rounded-full"></div>
                      </div>
                      <span className="text-sm">4.5</span>
                    </div>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Value</span>
                    <div className="flex items-center">
                      <div className="w-24 h-1 bg-gray-300 rounded-full mr-2">
                        <div className="w-[95%] h-full bg-gray-800 rounded-full"></div>
                      </div>
                      <span className="text-sm">4.8</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((review) => (
                  <div key={review} className="mb-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={`/placeholder.svg?height=40&width=40&text=User+${review}`}
                        alt={`User ${review}`}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <h4 className="font-medium">John Doe</h4>
                        <p className="text-gray-600 text-sm">May 2023</p>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      Amazing place! The farm house was beautiful, clean, and had everything we needed. The surroundings
                      are peaceful and the pool was perfect. Maria was a great host, very responsive and helpful. We'll
                      definitely be back!
                    </p>
                  </div>
                ))}
              </div>

              <button className="border border-gray-800 rounded-lg px-6 py-2 font-medium">Show all 128 reviews</button>
            </section>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-xl border border-gray-200 shadow-lg p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-2xl font-bold">$120</span>
                  <span className="text-gray-600"> night</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-primary fill-current" />
                  <span className="ml-1 font-medium">4.92</span>
                  <span className="mx-1 text-gray-400">·</span>
                  <Link href="#reviews" className="text-gray-600 hover:underline">
                    128 reviews
                  </Link>
                </div>
              </div>

              <div className="border border-gray-300 rounded-lg mb-4">
                <div className="grid grid-cols-2 divide-x divide-gray-300">
                  <div className="p-3">
                    <label className="block text-xs font-bold uppercase">CHECK-IN</label>
                    <input type="text" placeholder="Add date" className="w-full border-none p-0 focus:ring-0" />
                  </div>
                  <div className="p-3">
                    <label className="block text-xs font-bold uppercase">CHECKOUT</label>
                    <input type="text" placeholder="Add date" className="w-full border-none p-0 focus:ring-0" />
                  </div>
                </div>
                <div className="border-t border-gray-300 p-3">
                  <label className="block text-xs font-bold uppercase">GUESTS</label>
                  <select className="w-full border-none p-0 focus:ring-0 appearance-none bg-transparent">
                    <option>1 guest</option>
                    <option>2 guests</option>
                    <option>3 guests</option>
                    <option>4 guests</option>
                    <option>5 guests</option>
                    <option>6 guests</option>
                    <option>7 guests</option>
                    <option>8 guests</option>
                  </select>
                </div>
              </div>

              <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-lg mb-4">
                Reserve
              </button>
              <p className="text-center text-gray-600 mb-6">You won't be charged yet</p>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="underline">$120 x 7 nights</span>
                  <span>$840</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline">Cleaning fee</span>
                  <span>$60</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline">Service fee</span>
                  <span>$90</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-gray-300 font-bold">
                  <span>Total before taxes</span>
                  <span>$990</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Where you'll be</h2>
          <div className="h-80 bg-gray-200 rounded-xl mb-4">
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Map placeholder - Google Maps would be integrated here
            </div>
          </div>
          <h3 className="font-bold mb-2">São Paulo, Brazil</h3>
          <p className="text-gray-600 mb-4">
            The property is located in a peaceful rural area, about 1 hour drive from São Paulo city center. It's
            surrounded by nature, with beautiful views of the countryside.
          </p>
          <button className="text-primary font-semibold hover:underline">Show more</button>
        </section>
      </div>
    </MainLayout>
  )
}

