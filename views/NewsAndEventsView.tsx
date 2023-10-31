'use client';

/**
 * NewsAndEvents View
 * Generated with inlined content - clean standalone code
 */

export default function NewsAndEventsView() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">News and Events at Bowring & Lady Curzon Hospital</h1>
            <p className="text-xl text-gray-600 mb-8">Stay informed about the latest developments, medical achievements, community programs, and upcoming events at one of India's most historic healthcare institutions.</p>
            
            <div className="flex flex-wrap gap-4">
              
              
            </div>
          </div>
          <div className="mt-12 lg:mt-0">
            <img src="/placeholder.jpg" alt="Hero image" className="rounded-xl shadow-2xl w-full" />
          </div>
        </div>
      </section>
      {/* Events Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Upcoming Events & Programs</h2>
            <p className="text-gray-600">Join us for medical camps, health awareness programs, academic conferences, and community outreach initiatives. BLCH is committed to serving the community through education, prevention, and compassionate care.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Events loaded dynamically */}
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-indigo-600 font-semibold">Date TBD</p>
              <h3 className="font-semibold text-gray-900 mt-2">Event Title</h3>
              <p className="mt-2 text-gray-600">Event description...</p>
            </div>
          </div>
        </div>
      </section>
      {/* Blog Section */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest News & Announcements</h2>
            <p className="text-gray-600">Read about recent achievements, new services, medical breakthroughs, academic milestones, and stories from our 157-year journey of healthcare excellence.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog posts loaded dynamically */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>
              <h3 className="font-semibold text-gray-900">Blog Post Title</h3>
              <p className="mt-2 text-gray-600">Blog post excerpt...</p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-indigo-600 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Never Miss Important Updates from BLCH</h2>
          <p className="text-xl text-indigo-100 mb-8">Stay Connected</p>
          <a href="#" className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50">Get Started</a>
        </div>
      </section>
    </main>
  );
}
