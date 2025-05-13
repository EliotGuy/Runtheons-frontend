'use client';

import type { FC } from 'react';
import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { PerformancePlanProps } from '@/types/sanity';
import { FaRegCirclePlay } from "react-icons/fa6";
import { twMerge } from 'tailwind-merge';
import VideoModal from '../VideoModal';

const PerformancePlan: FC<PerformancePlanProps> = ({ title, subTitle, ctaText, ctaLink, videos, embeds }) => {
  const [currentId, setCurrentId] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideos, setSelectedVideos] = useState([]);

  const handleVideoChange = (idx: number) => {
    if (idx === currentId) return;
    setCurrentId(idx);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  };

  const handleOpenModal = () => {
    setSelectedVideos(embeds);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col gap-4 sm:gap-6 lg:gap-10 font-satoshi px-2 sm:px-4 lg:px-6">
      <motion.div
        className='flex flex-col lg:flex-row justify-between w-full'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className='w-full'>
          <motion.p
            className='title text-white'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {title}
          </motion.p>
          <div className='flex flex-col lg:flex-row justify-between w-full items-start lg:items-center gap-2 sm:gap-4'>
            <motion.p
              className='text-[#7B7B7B] title'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              {subTitle}
            </motion.p>
            <motion.div
              className='flex gap-2 content-title text-white items-center cursor-pointer'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              onClick={handleOpenModal}
            >
              <FaRegCirclePlay />
              <a className='underline'>{ctaText}</a>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <div className="relative w-full rounded-[12px] sm:rounded-[20px] lg:rounded-[30px]">
        <div className="relative rounded-[12px] sm:rounded-[20px] lg:rounded-[30px] overflow-hidden z-20">
          <div className="relative w-full h-full aspect-video">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentId}
                className="absolute w-full h-full"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: "0%", opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover rounded-[12px] sm:rounded-[20px] lg:rounded-[30px]"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  aria-label="Interactive video content"
                >
                  <source src={videos[currentId]?.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={`background - ${currentId}`}
            className="absolute -inset-1 rounded-md blur-xl bg-[#6EBFD0] z-10"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>
      <div className='flex flex-col md:flex-row justify-between space-y-3 md:space-y-0 md:space-x-3 lg:space-x-6'>
        {videos?.map((video: any, idx: number) => (
          <div
            key={video?._key}
            className='group flex flex-col gap-2 sm:gap-3 cursor-pointer'
            onClick={() => handleVideoChange(idx)}
          >
            <div
              className={twMerge(
                'flex gap-2 sm:gap-3 items-center content-title transition-colors duration-300',
                idx === currentId ? 'text-white' : 'text-[#7B7B7B] group-hover:text-white'
              )}
            >
              <p className={idx === currentId ? 'text-[#6EBFD0]' : 'group-hover:text-[#6EBFD0]'}>{video?.title}</p>
              <FaRegCirclePlay />
            </div>
            <p className={twMerge(
              'content-text transition-colors duration-300',
              idx === currentId ? 'text-white' : 'text-[#7B7B7B] group-hover:text-white'
            )}>
              {video?.description}
            </p>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <VideoModal videos={selectedVideos} onClose={handleCloseModal} isOpen={isModalOpen} />
      )}
    </div>
  );
};

export default PerformancePlan;
