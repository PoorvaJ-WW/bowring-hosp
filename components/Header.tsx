'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900">
          Bowring and Lady Curzon Hospital
        </Link>
        <div className="hidden md:flex items-center gap-8">
            <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
            <a href="/about" className="text-gray-600 hover:text-gray-900">About</a>
            <a href="/patient-care" className="text-gray-600 hover:text-gray-900">Patient Care</a>
            <a href="/services-and-facilities" className="text-gray-600 hover:text-gray-900">Services & Facilities</a>
            <a href="/maternity-and-childcare" className="text-gray-600 hover:text-gray-900">Specialties</a>
            <a href="/medical-college" className="text-gray-600 hover:text-gray-900">Medical College</a>
        </div>
      </nav>
    </header>
  );
}
