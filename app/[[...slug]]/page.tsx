import { Metadata } from 'next'
import { getSinglePageData } from '@/utils/sanity/queries';
import renderMetadata from '@/utils/renderMetaData';
import { fetchFullPageData } from '@/utils/sanity/queries/page.queries';
import { size } from 'lodash';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import LayoutSection from '@/components/LayoutSection';
import PageWrapper from '@/components/PageWrapper';

type Params = {
  params: {
    slug?: string[];
  };
};

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
  const pageType = 'page';
  const { slug } = await params;
  const paramSlug = slug && Array.isArray(slug) ? `${slug.join('/')}` : '/';
  const seoData = await getSinglePageData(pageType, paramSlug);

  return renderMetadata(paramSlug, seoData?.props.data?.seo);
};

const Page = async ({ params }: Params) => {
  const { slug } = await params;
  const paramSlug = slug && Array.isArray(slug) ? `/${slug.join('/')}` : '/';

  const pageData = await fetchFullPageData(paramSlug.length === 1 ? paramSlug : paramSlug.replace('/', ''));


  if (!size(pageData)) {
    return notFound();
  }

  return <PageWrapper pageData={pageData} />;
}

export default Page;
