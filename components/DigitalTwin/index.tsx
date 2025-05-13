'use client';

import { imageBuilder } from '@/client';
import { FaRegCirclePlay } from "react-icons/fa6";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

interface Description {
  content: string;
  title: string;
}

interface DigitalTwinProps {
  ctaLink: string;
  ctaText: string;
  description: Description[];
  image: any;
  title: string;
}

const tileVariants = {
  hidden: { opacity: 0, filter: "blur(20px)" },
  visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 1.2, staggerChildren: 0.05 } },
};

const DigitalTwin: React.FC<DigitalTwinProps> = ({ ctaLink, ctaText, description, image, title }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [imageWidth, setImageWidth] = useState(600);
  const router = useRouter();
  const handleClick = () => {
    router.push('/scelta-atleta-performance-expert');
  };

  useEffect(() => {
    const updateWidth = () => {
      const windowWidth = window.innerWidth;

      let multiplier;
      if (windowWidth <= 1024) {
        multiplier = 0.52;
      } else if (windowWidth <= 1100) {
        multiplier = 0.55;
      } else if (windowWidth <= 1280) {
        multiplier = 0.53;
      } else if (windowWidth <= 1439) {
        multiplier = 0.47;
      } else if (windowWidth <= 1440) {
        multiplier = 0.50;
      } else if (windowWidth <= 1492) {
        multiplier = 0.51;
      } else if (windowWidth <= 1535) {
        multiplier = 0.48;
      } else if (windowWidth <= 1560) {
        multiplier = 0.51;
      } else if (windowWidth <= 1680) {
        multiplier = 0.50;
      } else if (windowWidth <= 1770) {
        multiplier = 0.46;
      } else if (windowWidth <= 1850) {
        multiplier = 0.4;
      } else {
        multiplier = 0.41;
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
    <div className="relative flex flex-col md:flex-row w-full">
      {/* Text Section */}
      <div className="flex flex-col p-6 sm:p-8 bg-[#1C1C1C] layout-rounded lg:p-20 lg:py-12 mask-gradient">
        <div className="flex flex-col gap-4 sm:gap-6 font-satoshi text-white w-full lg:w-1/2">
          <p className="title max-w-[260px] sm:max-w-[300px] lg:max-w-[400px] font-bold">
            {title}
          </p>
          <div className="flex flex-col gap-4 sm:gap-6">
            {description?.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-1 sm:gap-2">
                <p className="text-white font-bold content-title">
                  {item.title}
                </p>
                <p className="text-[#BABABA] content-text">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
          <div
            onClick={handleClick} className="flex items-center text-white gap-2 content-title cursor-pointer">
            <FaRegCirclePlay />
            <a className="underline content-title">
              {ctaText}
            </a>
          </div>
        </div>
      </div>

      {/* Image Section - Absolute Positioning Kept */}
      {image && (
        <motion.div
          ref={ref}
          animate={isInView ? "visible" : "hidden"}
          variants={tileVariants}
          className="absolute lg:-top-20 lg:-right-10 -top-12 -right-0 lg:block hidden mask-gradient"
          style={{ width: `${imageWidth}px` }}
        >
          <Image
            src={imageBuilder.image(image?.asset?._ref).url()}
            alt="Digital Twin"
            width={imageWidth}
            height={imageWidth}
            priority={false}
            unoptimized
            className="h-auto object-cover"
          />
        </motion.div>
      )}
    </div>
  );
};

export default DigitalTwin;
