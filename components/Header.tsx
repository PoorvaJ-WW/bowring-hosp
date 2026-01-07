'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b" role="banner">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-blue-600 text-white px-4 py-2 rounded z-50"
      >
        Skip to main content
      </a>
      <nav
        className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <Link href="/" className="text-xl font-bold text-gray-900" aria-label="Bowring and Lady Curzon Hospital - Home">
          Bowring and Lady Curzon Hospital
        </Link>
        <div className="hidden md:flex items-center gap-8" role="menubar">
            <a href="/" className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded" role="menuitem">Home</a>
            <a href="/about" className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded" role="menuitem">About</a>
            <a href="/patient-care" className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded" role="menuitem">Patient Care</a>
            <a href="/services-and-facilities" className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded" role="menuitem">Services & Facilities</a>
            <a href="/maternity-and-childcare" className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded" role="menuitem">Specialties</a>
            <a href="/medical-college" className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded" role="menuitem">Medical College</a>
        </div>
      </nav>
    </header>
  );
}
