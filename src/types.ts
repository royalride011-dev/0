export interface Vehicle {
  id: string;
  name: string;
  type: string;
  image: string;
  capacityPassengers: number;
  capacityLuggage: number;
  features: string[];
  description: string;
  estimatedPricePerKm: number; // JOD per km
  basePrice: number; // Base JOD
}

export interface ServiceType {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  icon: string; // Lucide icon name
  features: string[];
  image: string;
}

export interface Testimonial {
  name: string;
  role: string;
  rating: number;
  text: string;
  date: string;
  source: 'Google Reviews' | 'Direct VIP Client';
  avatar?: string;
}

export interface BookingInquiry {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupLocation: string;
  dropoffLocation: string;
  serviceType: string;
  vehicleId: string;
  date: string;
  time: string;
  additionalNotes: string;
  estimatedCost: number;
  status: 'Pending' | 'Confirmed' | 'Completed';
  createdAt: string;
  voiceNote?: string;
}
