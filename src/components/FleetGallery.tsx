import React from 'react';
import { VEHICLES } from '../data';
import { LazyImage } from './LazyImage';

export default function FleetGallery() {
  return (
    <div className="py-12 bg-royal-navy-950">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-serif text-champagne-gold-500 mb-8 text-center">Our Fleet Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {VEHICLES.map((vehicle) => (
            <div key={vehicle.id} className="rounded-lg overflow-hidden border border-[#C5A85C]/35 bg-stone-900 shadow-md">
              <LazyImage
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-champagne-gold-500 font-serif text-lg">{vehicle.name}</h3>
                <p className="text-gray-400 text-sm mt-1">{vehicle.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
