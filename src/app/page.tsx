import { CatalogClient } from '@/components/catalog-client';
import { templates } from '@/data';

export const dynamic = 'force-static';

export default function HomePage() {
  return <CatalogClient templates={templates} />;
}
