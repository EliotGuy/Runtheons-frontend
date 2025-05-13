'use client';

import type { FC } from 'react';
import type { PricingPlanProps } from '@/types/sanity';
import Button from '@/molecules/Button';
import { twMerge } from 'tailwind-merge';
import { useState, useEffect } from 'react';
import PaymentModal from '../PaymentModal';

const AtletaPricing: FC<PricingPlanProps> = ({ title, subtitle, plans }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [selectedPlanTitle, setSelectedPlanTitle] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (selectedPlanTitle) {
      setIsModalOpen(true);
    }
  }, [selectedPlanTitle]);

  const handlePayment = (planTitle: string) => {
    if (selectedPlanTitle !== planTitle) setSelectedPlanTitle(planTitle);
    else setIsModalOpen(true);
  };

  if (!isClient) return null;

  return (
    <div className="flex flex-col w-full font-satoshi gap-16 lg:gap-24">
      <div className='flex flex-col text-center items-center gap-2 text-white'>
        <span className='font-bold title'>{title}</span>
        <span className='content-text w-5/6 md:w-2/3' style={{ whiteSpace: 'pre-line' }}>
          {subtitle}
        </span>
      </div>
      <div className='flex flex-col relative justify-center items-center gap-10 lg:gap-16'>
        <div className='flex flex-col md:flex-row justify-center md:justify-between gap-10 md:gap-16 mxl:gap-72'>
          {plans?.map((plan?: any, idx?: number) => (
            <div className="w-full flex flex-col md:flex-row" key={idx}>
              <div className={twMerge('w-full flex relative rounded-[30px] md:rounded-[40px] lg:rounded-[50px] max-w-full md:max-w-[450px] lg:max-w-[580px]')}>
                {idx === plans.length - 1 && (
                  <div className="absolute -inset-1 rounded-md blur-xl bg-[#6EBFD0] z-10"></div>
                )}
                <div className={twMerge('w-full rounded-[30px] md:rounded-[40px] lg:rounded-[50px] flex flex-col justify-between bg-[#1C1C1C] z-20 relative', plan?.border?.enabled ? `border-4 border-[${plan?.border?.color}]` : '')}>
                  <div className='px-6 md:px-8 lg:px-12 py-6 md:py-8 lg:py-10 pb-2'>
                    <div className='flex justify-between items-center'>
                      <span className='text-white title'>{plan?.title}</span>
                      <span className='text-[#6EBFD0] title'>{plan?.price}</span>
                    </div>
                    <hr className='w-full border-0.5 border-[#5A5A5A]' />
                    <div className='flex flex-col text-white content-title font-bold my-2 md:my-3 lg:my-4 xl:my-8 px-2'>
                      <span>{plan?.description}</span>
                    </div>
                    <hr className='w-full border-0.5 border-[#5A5A5A]' />
                    <div className='flex flex-col p-2 md:p-4 lg:px-2'>
                      {plan?.features?.map((item?: string, idx?: number) => (
                        <span className='content-text text-[#BABABA]' key={idx}>{item}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className='flex w-full justify-between text-[#6D6D6D] title px-6 md:px-8 lg:px-12 mb-4 md:mb-6'>
                      <div className="relative text-gray-400">
                        {plan?.originPrice}
                        <span className="absolute top-1/2 -left-2 h-[3px] bg-[#6EBFD0] rotate-[-20deg]" style={{ width: 'calc(100% + 20px)' }}></span>
                      </div>
                      <span className='text-white'>{plan?.discountPrice}</span>
                    </div>
                    <Button
                      onclick={() => handlePayment(plan?.title)}
                      text={plan?.ctaText}
                      className='w-full !rounded-t-none !rounded-b-[30px] md:!rounded-b-[40px] lg:rounded-b-[50px] !py-8 md:!py-10 lg:!py-12'
                    />
                  </div>
                </div>
              </div>
              <div
                className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-[4px] hidden lg:block"
                style={{
                  backgroundImage: "linear-gradient(to bottom, #5A5A5A 40%, transparent 40%)",
                  backgroundSize: "4px 40px",
                  backgroundRepeat: "repeat-y",
                }}
              ></div>
              <div className="flex flex-col gap-4 text-center whitespace-break-spaces mt-6 md:hidden">
                <span className="title">{plan?.optionTitle}</span>
                <span className="content-text">{plan?.options}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden md:flex flex-row gap-6 md:gap-10 mxl:gap-24">
          {plans?.map((plan?: any, idx?: number) => (
            <div className="flex flex-col gap-8 text-center whitespace-break-spaces" key={idx}>
              <span className="title">{plan?.optionTitle}</span>
              <span className="content-text">{plan?.options}</span>
            </div>
          ))}
        </div>
      </div>
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        planTitle={selectedPlanTitle}
      />
    </div>
  );
};

export default AtletaPricing;
