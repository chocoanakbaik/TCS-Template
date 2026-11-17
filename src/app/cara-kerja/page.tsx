import { CatalogClient } from '@/components/catalog-client';
import { templates } from '@/data';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Cara Kerja — TCS Template',
  description: 'Pelajari cara memilih, menyesuaikan, dan mengunduh template langsung dari browser.',
};

export default function CaraKerjaPage() {
  return <CatalogClient templates={templates} view="how-it-works" />;
}
