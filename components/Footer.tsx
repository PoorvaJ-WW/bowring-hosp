'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Bowring and Lady Curzon Hospital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
