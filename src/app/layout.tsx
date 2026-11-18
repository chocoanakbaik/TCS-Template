import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import tcsTemplateLogo from '../../Logo TCS Template dengan Ikon Centang.png';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://tcs-template.vercel.app'),
  title: 'TCS Template — Template yang mengikuti cara Anda bekerja',
  description: 'Koleksi template digital gratis dan premium dari The Choco Studios. Sesuaikan kebutuhan, lakukan pembayaran untuk template premium, dan unduh file XLSX atau Markdown.',
  applicationName: 'TCS Template',
  keywords: ['TCS Template','The Choco Studios','template Excel','spreadsheet','template dokumen','template gratis'],
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    siteName: 'TCS Template',
    title: 'TCS Template — Template yang mengikuti cara Anda bekerja',
    description: 'Pilih dan sesuaikan template digital gratis atau premium dari The Choco Studios.',
    url: 'https://tcs-template.vercel.app/',
    images: [{ url: tcsTemplateLogo.src, width: tcsTemplateLogo.width, height: tcsTemplateLogo.height, alt: 'Logo TCS Template' }],
  },
  twitter: {
    card: 'summary',
    title: 'TCS Template — The Choco Studios',
    description: 'Koleksi template digital yang dapat disesuaikan dan diunduh setelah proses penyesuaian dan verifikasi pembayaran.',
    images: [{ url: tcsTemplateLogo.src, alt: 'Logo TCS Template' }],
  },
  verification: {
    google: 'yCgLGWwxuy-D3nzW2sfa7GvtMmJf5QaOSFKd3xlsZdw',
  },
  robots: {index:true,follow:true},
};

export const viewport: Viewport = {themeColor:'#f6f7f3',colorScheme:'light'};

export default function RootLayout({children}:{children:ReactNode}) {
  return <html lang="id"><body>{children}</body></html>;
}
