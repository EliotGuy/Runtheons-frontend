'use client';

import type { FC } from 'react';
import type { HeroProps } from '@/types/sanity';
import Button from '@/molecules/Button';
import { useState, useEffect } from 'react';
import OnboardingInputRange from '../InputRange';
import { useRouter } from 'next/navigation';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const Hero: FC<HeroProps> = ({ eyebrow, heading, ctaText }) => {
  const [userCount, setUserCount] = useState(0);
  const router = useRouter();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [20, -20]);
  const rotateY = useTransform(x, [-100, 100], [-20, 20]);
  const progressValue = useMotionValue(0);
  const smoothProgress = useSpring(progressValue, { stiffness: 100, damping: 20 });

  const animatedNumber = useTransform(smoothProgress, (latest) => Math.round((latest / 100) * 2000));

  useEffect(() => {
    progressValue.set((userCount / 2000) * 100);
  }, [userCount]);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUserCount(data.count);
      } catch (error) {
        console.error('Error fetching user count:', error);
      } finally {
      }
    };
    fetchUserCount();
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = ((mouseX / width) - 0.5) * 200;
    const yPct = ((mouseY / height) - 0.5) * 200;
    x.set(xPct);
    y.set(yPct);
  };

  const handleClick = () => {
    router.push('/scelta-atleta-performance-expert');
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-6 md:gap-8 lg:gap-10">
      <div className="flex flex-col gap-3 md:gap-5 lg:gap-8 text-center lg:text-left w-full lg:w-1/2">
        <p className="title text-white">
          {eyebrow}
        </p>
        <Button
          onclick={handleClick}
          className="!content-text !button-padding !rounded-[21px] w-auto mx-auto lg:mx-0"
          text={ctaText}
        />
        <a className="text-[#6EBFD0] text-[20px] leading-[28px] md:text-[26px] md:leading-[34px] lg:text-[36px] lg:leading-[46px] font-bold">
          {heading}
        </a>
      </div>

      <motion.div
        className="relative flex w-full md:w-3/4 lg:w-1/2 h-[180px] md:h-[240px] lg:h-[320px] px-4 md:px-8 lg:px-12 justify-center max-w-[350px] max-h-[250px] md:max-w-[450px] md:max-h-[350px] lg:max-w-[650px] lg:max-h-[450px] mt-6 md:mt-8 lg:mt-0"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="relative flex flex-col justify-between bg-[#000] rounded-[16px] md:rounded-[24px] lg:rounded-[40px] p-3 md:p-5 lg:p-8 shadow-lg border border-[#2A2A2A] items-center w-full"
          style={{
            boxShadow: '0 0 80px #6EBFD0',
            transform: 'perspective(600px) rotateX(8deg) rotateY(-12deg) skewX(-4deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          <motion.span
            className={"text-white text-[100px] md:text-[140px] lg:text-[190px] font-extrabold font-satoshi tracking-wide leading-[80px] md:leading-[100px] lg:leading-[140px]"}
          >
            {animatedNumber}
          </motion.span>
          <OnboardingInputRange value={userCount} />
          <div className="text-white text-[12px] md:text-[14px] lg:text-[18px] mt-[-4px] md:mt-[-6px]">
            posti disponibili
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
