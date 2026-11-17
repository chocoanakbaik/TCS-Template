import { CatalogClient } from '@/components/catalog-client';
import { templates } from '@/data';

export const dynamic = 'force-static';

export const metadata = {
  title: 'TCS Template — Template yang mengikuti cara Anda bekerja',
  description: 'Koleksi template digital gratis dari The Choco Studios.',
};

export default function HomePage() {
  return <CatalogClient templates={templates} view="home" />;
}
