import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import type { ReactNode } from 'react';
import tcsTemplateLogo from '../../Logo TCS Template dengan Ikon Centang.png';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://tcs-template.vercel.app'),
  title: 'TCS Template — Template yang mengikuti cara Anda bekerja',
  description: 'Koleksi template digital gratis dari The Choco Studios. Sesuaikan kebutuhan dan unduh file XLSX atau Markdown langsung dari browser.',
  applicationName: 'TCS Template',
  keywords: ['TCS Template','The Choco Studios','template Excel','spreadsheet','template dokumen','template gratis'],
  other: {
    monetag: '4c6b0a757da5fb9bfe0c57541fe5b8ab',
  },
  icons: {
    icon: tcsTemplateLogo.src,
    shortcut: tcsTemplateLogo.src,
    apple: tcsTemplateLogo.src,
  },
  openGraph: {
    type: 'website',
    siteName: 'TCS Template',
    title: 'TCS Template — Template yang mengikuti cara Anda bekerja',
    description: 'Pilih, sesuaikan, dan unduh template digital gratis dari The Choco Studios.',
    url: 'https://tcs-template.vercel.app/',
    images: [{ url: tcsTemplateLogo.src, width: tcsTemplateLogo.width, height: tcsTemplateLogo.height, alt: 'Logo TCS Template' }],
  },
  twitter: {
    card: 'summary',
    title: 'TCS Template — The Choco Studios',
    description: 'Koleksi template digital gratis yang dapat disesuaikan dan diunduh langsung di browser.',
    images: [{ url: tcsTemplateLogo.src, alt: 'Logo TCS Template' }],
  },
  robots: {index:true,follow:true},
};

export const viewport: Viewport = {themeColor:'#f6f7f3',colorScheme:'light'};

export default function RootLayout({children}:{children:ReactNode}) {
  return <html lang="id"><body>{children}<Script src="/tcs-community-widget.js" data-theme="template" strategy="afterInteractive" /></body></html>;
}
