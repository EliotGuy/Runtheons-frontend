'use client';

import Link from 'next/link'
import Image from 'next/image'
import { HeaderType } from '@/types/sanity'
import { imageBuilder } from '@/client'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react';

export default function Header({ data }: { data: HeaderType }) {
  const pathName = usePathname();
  let selectedChoice = null;
  if (pathName.includes('/atleta')) {
    selectedChoice = 'ATLETA';
  } else if (pathName.includes('/performance-expert')) {
    selectedChoice = 'PERFORMANCE EXPERT';
  }

  const [topClass, setTopClass] = useState('');

  useEffect(() => {
    const updateTopClass = () => {
      const width = window.innerWidth;

      if (width >= 1024) {
        setTopClass(selectedChoice === 'PERFORMANCE EXPERT' ? 'top-[72px]' : 'top-[40px]');
      } else if (width >= 768) {
        setTopClass(selectedChoice === 'PERFORMANCE EXPERT' ? 'top-[72px]' : 'top-[40px]');
      } else {
        setTopClass('top-auto');
      }
    };

    updateTopClass();
    window.addEventListener('resize', updateTopClass);

    return () => window.removeEventListener('resize', updateTopClass);
  }, [selectedChoice]);

  return (
    <header className="w-full px-6 md:px-16 lg:px-20 xl:px-24 2xl:px-[139px] py-6 md:py-10 lg:py-10 xl:py-16 2xl:py-[50px]; flex md:flex-row md:justify-between md:items-center flex-col justify-center items-center relative">
      <Link href="/" className="flex items-center md:-ml-4 lg:ml-0">
        {data?.logo && (
          <Image
            src={imageBuilder.image(data?.logo?.asset?._ref).url()}
            alt={'Rutheons Logo'}
            width={130}
            height={35}
            priority={false}
            className="w-auto"
          />
        )}
        <span className="text-lg md:text-[18px] lg:text-xl font-bold">{data.title}</span>
      </Link>

      {selectedChoice && (
        <div className={`mt-6 md:absolute md:right-[60px] lg:right-[139px] transform md:-translate-y-1/2 text-white text-sm md:text-[14px] lg:text-[16px] leading-[20px] md:leading-[21px] lg:leading-[22px] max-w-[230px] text-center md:text-left ${topClass}`}>
          <p className="text-[16px] md:text-[18px] lg:text-[20px] leading-[22px] md:leading-[23px] lg:leading-[24px]">
            Hai scelto: <span className="font-bold text-[22px] md:text-[26px] lg:text-[30px] leading-[28px] md:leading-[30px] lg:leading-[39px]">{selectedChoice}</span>
          </p>
          <p className="text-[12px] md:text-[14px] lg:text-[16px]">
            Sei un Atleta?{' '}
            <Link href="/scelta-atleta-performance-expert" className="text-[#6EBFD0] underline">
              Clicca qui
            </Link>
          </p>
        </div>
      )}
    </header>
  )
}