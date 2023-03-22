import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie policy for this website',
};

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: `<h1>Cookie Policy</h1>
<p><strong>Last updated: January 2025</strong></p>
<h2>1. What Are Cookies</h2>
<p>Cookies are small text files stored on your device when you visit our website.</p>
<h2>2. Types of Cookies We Use</h2>
<p>We use essential cookies necessary for the website to function and analytics cookies to improve our site.</p>
<h2>3. How to Manage Cookies</h2>
<p>Most web browsers allow control of cookies through browser settings.</p>
<h2>4. Contact</h2>
<p>If you have any questions about our Cookie Policy, please contact us through our contact page.</p>` }} />
      </div>
    </div>
  );
}