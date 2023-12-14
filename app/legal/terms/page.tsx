import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Terms and conditions for using this website',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: `<h1>Terms and Conditions</h1>
<p><strong>Last updated: January 2025</strong></p>
<h2>1. Acceptance of Terms</h2>
<p>By accessing this website, you agree to these terms and conditions.</p>
<h2>2. Use of Website</h2>
<p>You may use our website for lawful purposes only. You agree not to use the website for any illegal or unauthorized purpose.</p>
<h2>3. Intellectual Property</h2>
<p>All content on this website is protected by copyright laws.</p>
<h2>4. Disclaimers</h2>
<p>This website is provided "as is" without warranties of any kind.</p>
<h2>5. Contact</h2>
<p>For questions about these terms, please contact us through our contact page.</p>` }} />
      </div>
    </div>
  );
}