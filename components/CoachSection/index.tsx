'use client';

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { CoachSectionProps } from '@/types/sanity';
import Button from '@/molecules/Button';
import { imageBuilder } from '@/client';
import { FaRegCirclePlay } from "react-icons/fa6";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CoachSection: FC<CoachSectionProps> = ({ title, subtitle, ctaText, buttonText, descriptionBlocks, image }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/scelta-atleta-performance-expert');
  };
  const [imageWidth, setImageWidth] = useState(650);

  useEffect(() => {
    const updateWidth = () => {
      const windowWidth = window.innerWidth;

      let multiplier;
      if (windowWidth <= 1024) {
        multiplier = 0.55;
      } else if (windowWidth <= 1117) {
        multiplier = 0.54;
      } else if (windowWidth <= 1166) {
        multiplier = 0.53;
      } else if (windowWidth <= 1316) {
        multiplier = 0.51;
      } else if (windowWidth <= 1439) {
        multiplier = 0.43;
      } else if (windowWidth <= 1440) {
        multiplier = 0.51;
      } else if (windowWidth <= 1492) {
        multiplier = 0.54;
      } else if (windowWidth <= 1536) {
        multiplier = 0.49;
      } else if (windowWidth <= 1560) {
        multiplier = 0.54;
      } else if (windowWidth <= 1763) {
        multiplier = 0.51;
      } else if (windowWidth <= 1770) {
        multiplier = 0.49;
      } else if (windowWidth <= 1850) {
        multiplier = 0.43;
      } else {
        multiplier = 0.43;
      }

      let newWidth = windowWidth * multiplier;
      newWidth = Math.max(300, Math.min(newWidth, 750));

      setImageWidth(newWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div className="relative">
      <motion.div
        className="flex flex-col lg:flex-row font-satoshi rounded-[16px] md:rounded-[30px] lg:rounded-[50px] bg-[#1C1C1C] p-5 sm:p-8 md:p-12 lg:p-20 py-6 sm:py-10 md:py-14 lg:py-18 relative overflow-visible mask-gradient"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 text-white max-w-full lg:max-w-[60%]">
          <motion.div
            className="title text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p>{title}</p>
            <p className="text-[#7B7B7B]">{subtitle}</p>
          </motion.div>

          <motion.div
            className="flex flex-col gap-3 sm:gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {descriptionBlocks?.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <p className='content-title text-white font-bold'>{item?.title}</p>
                <p className="text-[#BABABA] content-text">{item?.content}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="flex gap-2 sm:gap-3 items-center text-white content-title cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            onClick={handleClick}
          >
            <FaRegCirclePlay />
            <p className="underline">{ctaText}</p>
          </motion.div>

          <Button text={buttonText} onclick={handleClick} className="w-auto !button-padding !content-text" />
        </div>
      </motion.div>

      <div className="absolute top-6 sm:top-12 right-0 w-[70%] sm:w-[60%] md:w-[50%] lg:w-[40%] overflow-visible z-10 hidden lg:block">
        {image && (
          <motion.div
            initial={{ opacity: 0, filter: 'blur(20px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1 }}
            className="absolute lg:-top-32 lg:-right-24 -top-20 -right-16 lg:block hidden mask-gradient"
            style={{ width: `${imageWidth}px` }}
          >
            <Image
              src={imageBuilder.image(image?.asset?._ref).url()}
              alt="Coach Image"
              width={imageWidth}
              height={imageWidth}
              priority={false}
              unoptimized
              className="h-auto object-cover mask-gradient"
            />
          </motion.div>
        )}
      </div>

      <FaRegCirclePlay className='absolute top-6 right-6 lg:top-10 lg:right-10 xl:top-10 xl:right-10 text-white text-[24px] sm:text-[32px] md:text-[40px]' />
    </div>
  );
};

export default CoachSection;