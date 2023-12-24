'use client';

/**
 * Gallery View
 * Generated with inlined content - clean standalone code
 */

export default function GalleryView() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">A Visual Journey Through 157 Years of Healthcare Heritage</h1>
            <p className="text-xl text-gray-600 mb-8">Explore the rich history, architectural beauty, and modern medical excellence of one of India's oldest and most distinguished teaching hospitals.</p>
            
            <div className="flex flex-wrap gap-4">
              
              
            </div>
          </div>
          <div className="mt-12 lg:mt-0">
            <img src="/placeholder.jpg" alt="Hero image" className="rounded-xl shadow-2xl w-full" />
          </div>
        </div>
      </section>
      {/* Gallery Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Bowring & Lady Curzon Hospital Through the Lens</h2>
            <p className="text-gray-600">From Victorian-era architecture to state-of-the-art medical facilities, explore the visual story of BLCH spanning over a century and a half of dedicated service to the community.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Gallery images loaded dynamically */}
            <div className="bg-gray-200 rounded-lg aspect-square"></div>
            <div className="bg-gray-200 rounded-lg aspect-square"></div>
            <div className="bg-gray-200 rounded-lg aspect-square"></div>
            <div className="bg-gray-200 rounded-lg aspect-square"></div>
          </div>
        </div>
      </section>
      {/* Gallery Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Video Gallery: Witness Our Legacy and Modern Healthcare Excellence</h2>
            <p className="text-gray-600">Experience BLCH through engaging video content showcasing our historic campus, advanced medical facilities, educational programs, and the dedicated professionals who serve our community daily.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Gallery images loaded dynamically */}
            <div className="bg-gray-200 rounded-lg aspect-square"></div>
            <div className="bg-gray-200 rounded-lg aspect-square"></div>
            <div className="bg-gray-200 rounded-lg aspect-square"></div>
            <div className="bg-gray-200 rounded-lg aspect-square"></div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-indigo-600 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Have Historic Photos or Videos of BLCH?</h2>
          <p className="text-xl text-indigo-100 mb-8">Share Your Memories</p>
          <a href="#" className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50">Get Started</a>
        </div>
      </section>
    </main>
  );
}
