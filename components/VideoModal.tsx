'use client';

import { useState, useEffect, useRef, FC } from 'react';
import { motion } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import { imageBuilder } from '@/client';

interface Video {
  _key: string;
  title: string;
  description: string;
  videoUrl: string;
  preview: any;
  type: 'ATLETA' | 'PERFORMANCE_EXPERT';
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  videos: Video[];
}

const VideoModal: FC<ModalProps> = ({ isOpen, onClose, videos }) => {
  const [activeTab, setActiveTab] = useState<'ATLETA' | 'PERFORMANCE_EXPERT'>('ATLETA');
  const [filteredVideos, setFilteredVideos] = useState<Video[]>(videos.filter(video => video.type === 'ATLETA'));
  const [currentVideoId, setCurrentVideoId] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const filtered = videos.filter(video => video.type === activeTab);
    setFilteredVideos(filtered);
    setCurrentVideoId(0);
  }, [activeTab, videos]);

  const handleVideoChange = (idx: number) => {
    if (idx === currentVideoId) return;
    setCurrentVideoId(idx);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-20 overflow-auto px-4 sm:px-8 z-50">
      <motion.div
        className="relative bg-[#181818] rounded-[30px] md:rounded-[50px] w-full max-w-[90%] md:max-w-[80%] h-[90%] flex flex-col z-20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute -inset-1 rounded-md blur-xl bg-[#6EBFD0] z-10"></div>

        <div className="relative bg-[#1C1C1C] rounded-[30px] md:rounded-[50px] w-full h-full flex flex-col z-20 gap-6 md:gap-16 pb-[60px] md:pb-[80px]">
          <button className="absolute top-4 right-4 text-[#9D9D9D] text-[35px] md:text-[45px]" onClick={onClose}>
            <IoMdClose />
          </button>

          <div className="flex flex-col md:flex-row w-full h-full py-16 md:py-20 px-6 md:px-10">
            <div className="w-full md:w-2/3 flex justify-center items-center">
              <video
                ref={videoRef}
                className="w-full h-auto md:h-full object-cover rounded-[20px] md:rounded-[30px]"
                autoPlay
                loop
                muted
                playsInline
                controls
                aria-label="Interactive video content"
              >
                <source src={filteredVideos[currentVideoId || 0]?.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="hidden md:block w-[1.5px] bg-[#303030] mx-10"></div>

            <div className="w-full md:w-1/3 flex flex-col mt-6 md:mt-0">
              <h2 className="text-white text-[24px] md:text-[30px] leading-[32px] md:leading-[40px] font-bold mb-4 md:mb-8">
                Come ti può aiutare:
              </h2>
              <div className="space-y-4 overflow-auto max-h-[240px] md:max-h-full pr-2">
                {filteredVideos.map((video, idx) => (
                  <button
                    key={idx}
                    className={`flex items-start gap-4 p-4 rounded-[20px] md:rounded-[30px] transition-all w-full text-white ${currentVideoId === idx ? 'bg-[#252525]' : ''}`}
                    onClick={() => handleVideoChange(idx)}
                  >
                    {video?.preview && (
                      <img
                        src={imageBuilder.image(video?.preview?.asset?._ref).url()}
                        alt={video.title}
                        className="w-1/3 md:w-1/2 h-auto object-cover rounded-md"
                      />
                    )}
                    <div className="text-left space-y-2">
                      <p className="text-[14px] md:text-[16px] leading-[20px] md:leading-[22px] font-semibold">
                        {video.title}
                      </p>
                      <p className="text-[14px] md:text-[16px] leading-[20px] md:leading-[22px] text-[#9D9D9D]">
                        {video.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex text-[20px] md:text-[30px] leading-[28px] md:leading-[40px] w-full text-white absolute bottom-0">
            <button
              className={`flex w-1/2 justify-center text-center py-6 md:py-8 font-bold transition-all rounded-bl-[30px] md:rounded-bl-[50px] ${activeTab === 'ATLETA' ? 'bg-[#1C1C1C] text-white' : 'bg-[#121212] text-[#7B7B7B]'}`}
              onClick={() => {
                setActiveTab('ATLETA');
                handleVideoChange(0);
              }}
            >
              ATLETA
            </button>
            <button
              className={`flex w-1/2 justify-center text-center py-6 md:py-8 font-bold transition-all rounded-br-[30px] md:rounded-br-[50px] ${activeTab === 'PERFORMANCE_EXPERT' ? 'bg-[#1C1C1C] text-white' : 'bg-[#121212] text-[#7B7B7B]'}`}
              onClick={() => {
                setActiveTab('PERFORMANCE_EXPERT');
                handleVideoChange(0);
              }}
            >
              PERFORMANCE EXPERT
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VideoModal;