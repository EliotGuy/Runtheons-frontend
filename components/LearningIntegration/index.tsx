'use client';

import type { FC } from 'react';
import { motion } from 'framer-motion';
import type { LearningIntegrationProps } from '@/types/sanity';
import Button from '@/molecules/Button';
import Image from 'next/image';
import { imageBuilder } from '@/client';
import { useState, useEffect } from 'react';
import VideoModal from '../VideoModal';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const LearningIntegration: FC<LearningIntegrationProps> = ({ title, subtitle, integrationsSection, learningSection, embeds }) => {
  const [integrationHeight, setIntegrationHeight] = useState(50);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideos, setSelectedVideos] = useState([]);

  const updateHeight = () => {
    const width = window.innerWidth;

    let height;
    if (width < 640) height = 66;
    else if (width < 1024) height = 72;
    else if (width < 1200) height = 64;
    else if (width < 1440) height = 69;
    else if (width < 1536) height = 79;
    else if (width < 1600) height = 82;
    else if (width < 1700) height = 86;
    else height = 101;

    setIntegrationHeight(height);
  };
  const handleOpenModal = () => {
    setSelectedVideos(embeds);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => window.removeEventListener('resize', updateHeight);
  }, []);
  return (
    <div className='flex flex-col text-white gap-4 sm:gap-6 md:gap-10 lg:gap-16'>
      <div className='flex flex-col title gap-1'>
        <p>{title}</p>
        <p className='text-[#7B7B7B]'>{subtitle}</p>
      </div>
      <div className='flex flex-col lg:flex-row justify-between space-y-8 lg:space-y-0 lg:space-x-16'>
        <div className='flex flex-col bg-[#1C1C1C] rounded-[30px] lg:rounded-[50px] p-6 lg:p-9 py-10 lg:py-16 gap-6 lg:gap-8 w-full lg:w-1/2'>
          <Image
            src={imageBuilder.image(learningSection?.learningLogo?.asset?._ref).url()}
            alt={'Learning Section Logo'}
            width={600}
            height={300}
            priority={false}
            className='w-auto max-w-full'
          />
          <div className='flex flex-col gap-2 w-full'>
            <p className='text-[#6EBFD0] content-title font-bold'>{learningSection.title}</p>
            <p className='content-text'>{learningSection.description}</p>
          </div>
          <Button text='COME FUNZIONA' outline className='!button-padding !content-text !font-bold' onclick={handleOpenModal} />
        </div>
        <div className='flex flex-col bg-[#1C1C1C] rounded-[30px] lg:rounded-[50px] p-6 lg:p-9 py-10 lg:py-16 gap-6 lg:gap-8 w-full lg:w-1/2'>
          {!integrationsSection?.integrationImage ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-4 2xl:gap-6 w-full">
              {integrationsSection?.integrations?.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-[#1C1C1C] rounded-xl flex justify-center items-center w-full h-[70px] md:h-[90px] shadow-inset-black p-5 sm:p-4.5 md:p-5 lg:p-5"
                  style={{ height: `${integrationHeight}px` }}
                >
                  <Image
                    src={imageBuilder.image(item?.logo?.asset?._ref).url()}
                    alt={`logo` + idx}
                    width={80}
                    height={50}
                    className="w-auto h-full max-h-full object-contain"
                  />
                </div>
              ))}
            </div>
          ) : (
            <Image
              src={imageBuilder.image(integrationsSection?.integrationImage?.asset?._ref).url()}
              alt={'Integration Section Logo'}
              width={600}
              height={300}
              priority={false}
              unoptimized
              className='w-auto max-w-full'
            />
          )}
          <div className='flex flex-col gap-2 w-full'>
            <p className='text-[#6EBFD0] content-title font-bold'>{integrationsSection.title}</p>
            <p className='content-text'>{integrationsSection.description}</p>
          </div>
          <Button text='COME FUNZIONA' outline className='!button-padding !content-text !font-bold' onclick={handleOpenModal} />
        </div>
      </div>
      {isModalOpen && (
        <VideoModal videos={selectedVideos} onClose={handleCloseModal} isOpen={isModalOpen} />
      )}
    </div>
  );
};

export default LearningIntegration;
