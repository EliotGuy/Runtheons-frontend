'use client'

import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface VideoCardProps {
  videoUrl: any;
}

const VideoCard: React.FC<VideoCardProps> = ({ videoUrl }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div className="flex items-center justify-center w-full ml-[5px] sm:ml-[10px] md:ml-[15px] lg:ml-[25px] xl:ml-[40px]">
      <motion.div
        ref={cardRef}
        className="relative w-full rounded-[20px] md:rounded-[35px] layout-rounded"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          transform: `perspective(960px) rotateX(${mousePosition.y * -10}deg) rotateY(${mousePosition.x * 10 + 3}deg)`,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 80 }}
      >
        <div className="relative overflow-hidden z-20 rounded-[20px] md:rounded-[35px] lg:rounded-[50px]">
          <div className="aspect-video">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              controls
              aria-label="Interactive video content"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div className="absolute -inset-1 rounded-md blur-xl bg-[#6EBFD0] z-10"></div>
      </motion.div>
    </div>
  );
};

export default VideoCard;
