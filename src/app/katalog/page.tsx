import { CatalogClient } from '@/components/catalog-client';
import { templates } from '@/data';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Katalog Template — TCS Template',
  description: 'Jelajahi 225 template digital dari sembilan kategori pekerjaan. Sesuaikan dan unduh gratis.',
};

export default function KatalogPage() {
  return <CatalogClient templates={templates} view="catalog" />;
}
