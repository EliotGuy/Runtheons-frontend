import type { Metadata } from 'next';
import { SeoType } from '@/types/sanity';

const renderMetadata = (slug?: string, seo?: SeoType, featuredImage?: string): Metadata => {
  const title = seo?.title || 'Runtheons';
  const description = seo?.description || '';
  const images = featuredImage || seo?.ogImage || '/images/logo.png';
  const url = `https://www.runtheons.com/${slug || ''}`;
  const index = !seo?.noIndex;
  const follow = !seo?.noFollow;
  const site = 'https://www.runtheons.com';

  const metadata = {
    title,
    description,
    openGraph: {
      images,
      description,
      title,
      url,
    },
    robots: {
      index,
      follow,
    },
    metadataBase: new URL(site),
    alternates: {
      canonical: url,
    },
    icons: {
      icon: images,
      shortcut: images,
      apple: images,
    },
  };

  return metadata;
};

export default renderMetadata;
