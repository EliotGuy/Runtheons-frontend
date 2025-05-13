'use client';

import LayoutSection from '@/components/LayoutSection';

const PageWrapper = ({ pageData }: { pageData: any }) => {
  return (
    <main className="size-full">
      <div className="flex flex-col gap-6 sm:gap-10 md:gap-16 lg:gap-24">
        {pageData?.body?.map((component: any) => (
          <LayoutSection key={component?._key} {...component} />
        ))}
      </div>
    </main>
  );
};

export default PageWrapper;
