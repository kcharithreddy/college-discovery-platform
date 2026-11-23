import type { Metadata, Viewport } from 'next';
import './globals.css';
import { CompareProvider } from '@/components/CompareProvider';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'CollegeFinder: compare engineering colleges in India',
  description: 'Search engineering colleges by state, fees and NIRF rank. Compare placements, hostels and campus life, and read honest student reviews before you join.'
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f7fb' },
    { media: '(prefers-color-scheme: dark)', color: '#080b16' }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <CompareProvider>
            <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2">
              Skip to content
            </a>
            <Nav />
            <div id="main" className="flex-1 pb-24">{children}</div>
            <Footer />
          </CompareProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
