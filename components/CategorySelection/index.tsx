'use client';

import type { FC } from 'react';
import type { CategorySelectionProps } from '@/types/sanity';
import Image from 'next/image';
import { imageBuilder } from '@/client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

const CategorySelection: FC<CategorySelectionProps> = ({ title, categories }) => {
  const router = useRouter();

  const handleNavigation = (categoryName: string) => {
    if (categoryName.toLowerCase() === 'atleta') {
      router.push('/atleta');
    } else {
      router.push('/performance-expert');
    }
  };

  return (
    <div className="flex font-satoshi items-center justify-center text-center pb-16 px-4 md:px-8">
      <div className="flex flex-col gap-8 items-center">
        {/* Title */}
        <p className="text-[32px] sm:text-[40px] md:text-[60px] lg:text-[80px] leading-[40px] sm:leading-[48px] md:leading-[80px] lg:leading-[108px] text-white font-bold">
          {title}
        </p>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
          {categories?.map((item?: any, idx?: number) => (
            <motion.div
              key={item?._key}
              className="flex flex-col items-center justify-center bg-[#222222] rounded-[21px] p-6 px-10 md:p-8 md:px-16 gap-y-6 cursor-pointer
                         w-full max-w-[297px] h-[250px] sm:h-[280px] md:h-[297px]"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleNavigation(item?.name)}
            >
              <Image
                src={imageBuilder.image(item?.icon?.asset?._ref).url()}
                alt="Category Image"
                width={180}
                height={100}
                className={twMerge(
                  "w-[120px] h-[80px] sm:w-[150px] sm:h-[100px] md:w-[180px] md:h-[120px] object-contain",
                  idx === categories.length - 1 ? 'w-[160px] h-[110px]' : ''
                )}
              />
              <p className="text-[16px] sm:text-[18px] md:text-[20px] leading-[22px] sm:leading-[24px] md:leading-[26px] text-white font-bold text-center max-w-[200px]">
                {item?.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;
