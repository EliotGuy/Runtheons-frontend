'use client'

import type { FC } from 'react';
import type { PricingPlanProps } from '@/types/sanity';
import Button from '@/molecules/Button';
import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const PricingPlan: FC<PricingPlanProps> = ({ title, subtitle, plans }) => {
  const router = useRouter()
  const [padding, setPadding] = useState(8);

  const updatePadding = () => {
    const width = window.innerWidth;

    let height;
    if (width < 640) height = 20;
    else if (width < 1024) height = 20;
    else if (width < 1440) height = 24;
    else if (width < 1600) height = 28;
    else if (width < 1847) height = 30;
    else height = 50;

    setPadding(height);
  };

  useEffect(() => {
    updatePadding();
    window.addEventListener('resize', updatePadding);

    return () => window.removeEventListener('resize', updatePadding);
  }, []);
  return (
    <div className="flex flex-col font-satoshi gap-12 md:gap-24">
      <div className="flex flex-col text-center text-white title">
        <p>
          {title}
        </p>
        <p className="text-[#7B7B7B]">
          {subtitle}
        </p>
      </div>
      <div className="grid gap-16 md:grid-cols-2 mxl:grid-cols-3
                grid-auto-rows-auto auto-rows-fr">
        {plans?.map((plan?: any, idx?: number) => (
          <div
            className={twMerge(
              'min-w-[300px] relative layout-rounded flex'
            )}
            key={idx}
          >
            {plan?.blur?.enableBlur && (
              <div className="absolute -inset-1 layout-rounded blur-xl bg-[#6EBFD0] z-10"></div>
            )}
            <div
              className={twMerge(
                'w-full layout-rounded flex flex-col justify-between bg-[#1C1C1C] z-20 relative',
                plan?.border?.enabled ? `border-4 border-[${plan?.border?.color}]` : ''
              )}
            >
              <div className="p-4 md:p-6 lg:p-8 2xl:p-14 pb-4" style={{ padding: `${padding}px` }}>
                <div className="flex justify-between items-center">
                  <p className="text-white title">
                    {plan?.name}
                  </p>
                  <p className="text-[#6EBFD0] text-[14px] leading-[20px] md:text-[16px] md:leading-[22px]">
                    {plan?.tag}
                  </p>
                </div>
                <hr className="w-full border-0.5 border-[#5A5A5A]" />
                <div className="flex flex-col text-white content-text font-bold my-2 md:my-3 lg:my-4 xl:my-8 px-1">
                  <p>{plan?.highlightText}</p>
                  <p>{plan?.price}</p>
                </div>
                <hr className="w-full border-0.5 border-[#5A5A5A]" />
                <div className="flex flex-col px-1 pt-2 md:pt-3 lg:pt-4 xl:pt-8">
                  {plan?.benefits?.map((item?: string, idx?: number) => (
                    <p className="content-sub-text font-semibold text-white" key={idx}>
                      {item}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-white content-text font-bold px-10 lg:px-12 xl:px-16 mb-6">
                  {plan?.savings}
                </p>
                <Button onclick={() => { router.push(`${plan?.tag === 'ATLETA' ? '/atleta' : '/performance-expert'}`) }} text={plan?.ctaText} className="w-full rounded-[30px] sm:rounded-[25px] md:rounded-[35px] lg:rounded-[42px] !rounded-t-none !button-padding" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPlan;
