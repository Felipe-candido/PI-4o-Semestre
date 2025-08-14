import { ReservationDetails } from "@/components/reservation-details"
import MainLayout from '@/components/layout/MainLayout'

// Mock reservation data for demonstration
const mockReservation = {
  id: "RES-2024-001234",
  property: {
    name: "Oceanview Villa Paradise",
    address: "123 Coastal Drive, Malibu, CA 90265",
    image: "/luxury-beachfront-villa.png",
  },
  dates: {
    checkIn: "2024-07-15",
    checkOut: "2024-07-22",
  },
  guests: 6,
  pricing: {
    nightlyRate: 450,
    nights: 7,
    subtotal: 3150,
    cleaningFee: 125,
    serviceFee: 189,
    total: 3464,
  },
  amenities: [
    { name: "Pool", icon: "🏊" },
    { name: "BBQ Grill", icon: "🔥" },
    { name: "WiFi", icon: "📶" },
    { name: "Kitchen", icon: "🍳" },
    { name: "Parking", icon: "🚗" },
    { name: "Beach Access", icon: "🏖️" },
  ],
  host: {
    name: "Sarah Johnson",
    avatar: "/friendly-woman-host.png",
  },
  location: {
    lat: 34.0259,
    lng: -118.7798,
  },
  canCheckIn: true, // This would be determined by current date vs check-in date
}

const userRole = "visitor"
const userName = "Visitante"
const userAvatar = "/placeholder.svg?height=32&width=32" 

export default function ReservationPage() {
  return (
    <MainLayout userName={userName} userAvatar={userAvatar}>
      <div className="min-h-screen bg-background">
      <ReservationDetails reservation={mockReservation} />
      </div>
    </MainLayout>
    
  )
}
