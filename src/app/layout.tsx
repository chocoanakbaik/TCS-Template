import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://tcs-template.vercel.app'),
  title: 'TCS Template — Template yang mengikuti cara Anda bekerja',
  description: 'Koleksi template digital gratis dari The Choco Studios. Sesuaikan kebutuhan dan unduh file XLSX atau Markdown langsung dari browser.',
  applicationName: 'TCS Template',
  keywords: ['TCS Template','The Choco Studios','template Excel','spreadsheet','template dokumen','template gratis'],
  openGraph: {
    type: 'website',
    siteName: 'TCS Template',
    title: 'TCS Template — Template yang mengikuti cara Anda bekerja',
    description: 'Pilih, sesuaikan, dan unduh template digital gratis dari The Choco Studios.',
    url: 'https://tcs-template.vercel.app/',
  },
  twitter: {
    card: 'summary',
    title: 'TCS Template — The Choco Studios',
    description: 'Koleksi template digital gratis yang dapat disesuaikan dan diunduh langsung di browser.',
  },
  robots: {index:true,follow:true},
};

export const viewport: Viewport = {themeColor:'#f6f7f3',colorScheme:'light'};

export default function RootLayout({children}:{children:ReactNode}) {
  return <html lang="id"><body>{children}</body></html>;
}
