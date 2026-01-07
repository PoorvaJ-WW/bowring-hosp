'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/services-and-facilities" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/departments-and-specialties" className="text-gray-400 hover:text-white transition-colors">Departments</Link></li>
              <li><Link href="/contact-us" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Patient Services</h3>
            <ul className="space-y-2">
              <li><Link href="/appointment-booking" className="text-gray-400 hover:text-white transition-colors">Book Appointment</Link></li>
              <li><Link href="/emergency-services" className="text-gray-400 hover:text-white transition-colors">Emergency Services</Link></li>
              <li><Link href="/outpatient-services" className="text-gray-400 hover:text-white transition-colors">Outpatient Services</Link></li>
              <li><Link href="/telemedicine" className="text-gray-400 hover:text-white transition-colors">Telemedicine</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/cookie-policy" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Bowring and Lady Curzon Hospital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
