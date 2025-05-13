'use client';

import type { FC } from 'react';
import type { OurFoundersProps } from '@/types/sanity';
import Image from 'next/image';
import { imageBuilder } from '@/client';
import Cal, { getCalApi } from "@calcom/embed-react";
import { useState, useEffect } from 'react';

const OurFounders: FC<OurFoundersProps> = ({ title, description, founders }) => {
  const [isClient, setIsClient] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    setIsClient(true);

    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1800);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    const calContainer = document.querySelector('.cal-inline-container') as HTMLElement;
    if (calContainer && window.innerWidth >= 1800) {
      calContainer.style.transform = 'scale(1.49)';
      calContainer.style.transformOrigin = 'top';
      calContainer.style.overflow = 'hidden';
    } else if (calContainer && window.innerWidth >= 1500) {
      calContainer.style.transform = 'scale(1.2)';
      calContainer.style.transformOrigin = 'top';
      calContainer.style.overflow = 'hidden';
    } else if (calContainer && window.innerWidth >= 1300) {
      calContainer.style.transform = 'scale(1.1)';
      calContainer.style.transformOrigin = 'top';
      calContainer.style.overflow = 'hidden';
    } else if (calContainer) {
      calContainer.style.transform = 'scale(1)';
      calContainer.style.transformOrigin = 'top';
      calContainer.style.overflow = 'hidden';
    }

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "meet-runtheons-waiting-list" });
      if (cal) {
        cal("ui", {
          hideEventTypeDetails: false,
          layout: "month_view",
          theme: "dark",
          cssVarsPerTheme: {
            light: { "cal-border-booker-width": "0px" },
            dark: { "cal-border-booker-width": "0px" },
          },
        });
      }
      setTimeout(() => {
        const calContainer = document.querySelector('.cal-inline-container') as HTMLElement;
        if (calContainer && window.innerWidth >= 1800) {
          calContainer.style.transform = 'scale(1.49)';
          calContainer.style.transformOrigin = 'top';
          calContainer.style.overflow = 'hidden';
        } else if (calContainer && window.innerWidth >= 1500) {
          calContainer.style.transform = 'scale(1.2)';
          calContainer.style.transformOrigin = 'top';
          calContainer.style.overflow = 'hidden';
        } else if (calContainer && window.innerWidth >= 1300) {
          calContainer.style.transform = 'scale(1.1)';
          calContainer.style.transformOrigin = 'top';
          calContainer.style.overflow = 'hidden';
        } else if (calContainer) {
          calContainer.style.transform = 'scale(1)';
          calContainer.style.transformOrigin = 'top';
          calContainer.style.overflow = 'hidden';
        }
      }, 2000);
    })();
  }, [isLargeScreen]);

  if (!isClient) return null;

  return (
    <div className='flex flex-col gap-32'>
      <div className="flex flex-col items-center justify-center text-center gap-10 font-satoshi">
        <div className='flex flex-col gap-2 text-white items-center'>
          <span className='title'>{title}</span>
          <span className='content-text max-w-[1100px]'>{description}</span>
        </div>
        <div className='flex flex-wrap justify-center gap-16 md:gap-32'>
          {founders?.map((founder: any, idx: number) => (
            <div className='flex flex-col gap-8 md:gap-16 items-center' key={idx}>
              <Image
                src={imageBuilder.image(founder?.headshot?.asset?._ref).url()}
                alt={'Founder Headshot'}
                width={200}
                height={200}
                className='md:w-[300px] md:h-[300px] rounded-full'
                priority={false}
                unoptimized
              />
              <div className='flex flex-col content-title text-white text-center'>
                <span className='text-[#6EBFD0] font-bold'>{founder?.firstName + ' '}{founder?.lastName}</span>
                <span className='content-text'>{founder?.email}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='w-full'>
        <Cal
          namespace="meet-runtheons-waiting-list"
          calLink="ousseni/meet-runtheons-waiting-list"
          style={{
            width: "100%",
            height: "60%",
            overflow: "scroll",
            transform: isLargeScreen ? 'scale(1.49)' : 'none',
            transformOrigin: isLargeScreen ? 'top' : 'unset',
          }}
          config={{ layout: "month_view" }}
        />
      </div>
    </div>
  );
};

export default OurFounders;
