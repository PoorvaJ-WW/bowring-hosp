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
  description: "Bowring & Lady Curzon Hospitals (BLCH) is one of India's oldest and most historic government hospitals, located in the heart of Bangalore. It is a teaching hosp",
  metadataBase: new URL('https://bowring-and-lady-cur-2kgs-3-24-hth.sites.wisdomscribe.ai'),
  // Basic site-wide defaults - pages will override with specific metadata
  openGraph: {
    siteName: 'Bowring and Lady Curzon Hospital',
    type: 'website',
    locale: 'en_US',
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
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          

        </Providers>
      </body>
    </html>
  );
}