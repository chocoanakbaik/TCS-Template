import { CatalogClient } from '@/components/catalog-client';
import { templates } from '@/data';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Tentang TCS Template — The Choco Studios',
  description: 'Kenali TCS Template, prinsip pengembangan, dan cara data Anda diproses di browser.',
};

export default function TentangPage() {
  return <CatalogClient templates={templates} view="about" />;
}
