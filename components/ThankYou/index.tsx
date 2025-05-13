'use client';

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import type { ThankYouProps } from '@/types/sanity';
import Button from '@/molecules/Button';
import Image from 'next/image';
import { imageBuilder } from '@/client';
import { useSearchParams } from 'next/navigation';

const ThankYou: FC<ThankYouProps> = ({ title, subtitle, ctaText, inviteText, image }) => {
  const params = useSearchParams();
  const [user, setUser] = useState(null);
  const userId = params.get('id');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      fetchUserData(userId);
    }
  }, [userId]);

  const fetchUserData = async (userId: any) => {
    try {
      const response = await fetch(`/api/user/${userId}`);
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async () => {
    const referralUrl = `${window.location.origin}/referral?id=${userId}`;

    try {
      await navigator.clipboard.writeText(referralUrl);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center text-center font-satoshi gap-10 px-4 md:gap-16 md:px-0">
      <div className='relative w-full max-w-[362px]'>
        <Image
          src={imageBuilder.image(image?.asset?._ref).url()}
          alt={'Thank you'}
          width={362}
          height={435}
          priority={false}
          unoptimized
          className='relative z-10 mask-gradient w-full'
        />
        <div
          className="absolute opacity-100 rounded-full md:-top-16 -top-5 left-0 z-0 w-full h-[400px] md:h-[529px]"
          style={{
            background: 'radial-gradient(closest-side at 50% 50%, #6EBFD0 0%, #000000 100%)',
          }}
        ></div>
      </div>
      <div className='flex flex-col items-center gap-2 text-white md:gap-4'>
        <span className='title'>
          {title?.replace('[nome] ', user?.nome)}
        </span>
        <span className='content-text md:max-w-[650px]'>
          {subtitle}
        </span>
      </div>
      <div className="flex flex-col space-y-4 w-full justify-center max-w-[300px] md:flex-row md:space-y-0 md:space-x-6 md:max-w-none">
        <Button text={ctaText} className="sm:w-full sm:h-auto w-[200px] h-auto !button-padding" />
        <Button text={inviteText} onclick={handleInvite} className="sm:w-full sm:h-auto w-[200px] h-[70px] !button-padding" />
      </div>
    </div>
  );
};

export default ThankYou;