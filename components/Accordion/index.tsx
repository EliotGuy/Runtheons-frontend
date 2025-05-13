'use client';

import type { FC } from 'react';
import type { AccordionProps } from '@/types/sanity';
import Image from 'next/image';
import { Accordion, AccordionItem } from "@heroui/accordion";
import { twMerge } from 'tailwind-merge';
import { imageBuilder } from '@/client';
import { useState, useEffect } from 'react';

const FAQ: FC<AccordionProps> = ({ title, titleImage, faqItems }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="flex flex-col text-white font-satoshi rounded-2xl gap-8 md:gap-10">
      <div className='flex items-center justify-center'>
        {titleImage && (
          <Image src={imageBuilder.image(titleImage?.asset?._ref).url()} alt="Title Image" width={40} height={40} className='w-3/4 lg:w-2/3' />
        )}
      </div>

      <h2 className="title px-4">
        {title}
      </h2>

      <div className="w-full">
        <Accordion className="w-full !px-0" style={{ padding: 'none' }}>
          {faqItems?.map((item?: any, idx?: number) => (
            <AccordionItem
              key={idx}
              aria-label={item?.question}
              title={
                <span className="text-white font-bold content-title">
                  {item?.question}
                </span>
              }
              indicator={<></>}
              className={twMerge(
                "py-1 sm:py-4 !text-white !content-text px-6 md:px-10 bg-[#1C1C1C]",
                idx !== faqItems?.length - 1 ? 'border-b border-gray-400' : 'rounded-b-[20px]',
                idx !== 0 ? '' : 'rounded-t-[20px]'
              )}
            >
              <p className="text-sm md:text-md">{item?.answer}</p>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
