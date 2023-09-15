'use client';

/**
 * ContactUs View
 * Generated with inlined content - clean standalone code
 */

export default function ContactUsView() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">Get in Touch with Bowring & Lady Curzon Hospital</h1>
            <p className="text-xl text-gray-600 mb-8">Serving Bengaluru for over 157 years. Our team is here to assist you 24/7 with your healthcare needs, inquiries, and appointments.</p>
            
            <div className="flex flex-wrap gap-4">
              
              
            </div>
          </div>
          <div className="mt-12 lg:mt-0">
            <img src="/placeholder.jpg" alt="Hero image" className="rounded-xl shadow-2xl w-full" />
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:grid lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Visit Our Historic Campus</h2>
            <div className="space-y-4 text-gray-600">
              <p><strong>Address:</strong> Lady Curzon Road, Shivaji Nagar, Tasker Town, Bengaluru, Karnataka - 560001, India</p>
              <p><strong>Phone:</strong> 080-25591362</p>
              <p><strong>Email:</strong> info@blchhospital.gov.in</p>
            </div>
          </div>
          <div className="mt-12 lg:mt-0">
            <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center text-gray-500">
              Map / Contact Form
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:grid lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Contact Us</h2>
            <div className="space-y-4 text-gray-600">
              
              
              
            </div>
          </div>
          <div className="mt-12 lg:mt-0">
            <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center text-gray-500">
              Map / Contact Form
            </div>
          </div>
        </div>
      </section>
      {/* Form Section */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-gray-600"></p>
          </div>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea rows="4" className="w-full px-4 py-2 border rounded-lg"></textarea>
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700">Send Message</button>
          </form>
        </div>
      </section>
    </main>
  );
}
