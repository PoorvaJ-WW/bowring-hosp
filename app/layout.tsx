import { Providers } from '@/context/Providers';
import './globals.css';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: {
    template: '%s | Bowring and Lady Curzon Hospital',
    default: "Home | Bowring and Lady Curzon Hospital",
  },
  description: "Bowring & Lady Curzon Hospitals (BLCH) is one of India's oldest and most historic government hospitals, located in the heart of Bangalore. Offering comprehensive healthcare services including emergency care, maternity, surgery, and specialized treatments.",
  metadataBase: new URL('https://bowring-and-lady-cur-2kgs-3-24-hth.sites.wisdomscribe.ai'),
  keywords: ['hospital', 'healthcare', 'Bangalore', 'emergency services', 'maternity care', 'government hospital', 'medical college', 'patient care'],
  authors: [{ name: 'Bowring and Lady Curzon Hospital' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    siteName: 'Bowring and Lady Curzon Hospital',
    type: 'website',
    locale: 'en_US',
    title: 'Bowring and Lady Curzon Hospital - Quality Healthcare in Bangalore',
    description: "One of India's oldest and most historic government hospitals offering comprehensive healthcare services.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bowring and Lady Curzon Hospital',
    description: "Historic government hospital in Bangalore offering quality healthcare services.",
  },
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="site-id" content="{{WEBSITE_ID}}" />
        <script
          dangerouslySetInnerHTML={{
            __html: `/* ANALYTICS_SCRIPT_PLACEHOLDER */`
          }}
        />
      </head>
      <body className="antialiased">
        <Providers>

          
            <div className="min-h-screen flex flex-col">
              <Header />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          

        </Providers>
      </body>
    </html>
  );
}