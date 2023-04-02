import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for this website',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: `<h1>Privacy Policy</h1>
<p><strong>Last updated: January 2025</strong></p>
<h2>1. Information We Collect</h2>
<p>We collect information you provide directly to us and information automatically collected when you use our website.</p>
<h2>2. How We Use Information</h2>
<p>We use the information we collect to provide, maintain, and improve our website.</p>
<h2>3. Information Sharing</h2>
<p>We do not sell or rent your personal information to third parties.</p>
<h2>4. Data Security</h2>
<p>We implement reasonable security measures to protect your information.</p>
<h2>5. Contact</h2>
<p>For questions about this Privacy Policy, please contact us through our contact page.</p>` }} />
      </div>
    </div>
  );
}