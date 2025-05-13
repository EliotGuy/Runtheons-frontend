import { cva } from 'class-variance-authority';

import type { HeadingProps } from '@/types/sanity.ts';

export const PAGE_TYPES = ['page'];
export const getHeadingClasses = (size: HeadingProps['headingSize']) => {
  const sizes: Record<
    HeadingProps['headingSize'],
    { xl: string; lg: string; md: string; sm: string }
  > = {
    '9xl': { xl: 'text-9xl', lg: 'text-9xl', md: 'text-8xl', sm: 'text-5xl' },
    '8xl': { xl: 'text-8xl', lg: 'text-8xl', md: 'text-7xl', sm: 'text-4xl' },
    '7xl': { xl: 'text-7xl', lg: 'text-7xl', md: 'text-6xl', sm: 'text-3xl' },
    '6xl': { xl: 'text-6xl', lg: 'text-6xl', md: 'text-6xl', sm: 'text-3xl' },
    '5xl': { xl: 'text-5xl', lg: 'text-5xl', md: 'text-4xl', sm: 'text-3xl' },
    '4xl': { xl: 'text-4xl', lg: 'text-4xl', md: 'text-3xl', sm: 'text-3xl' },
    '3xl': { xl: 'text-3xl', lg: 'text-3xl', md: 'text-3xl', sm: 'text-3xl' },
    '2xl': { xl: 'text-2xl', lg: 'text-2xl', md: 'text-2xl', sm: 'text-2xl' },
    xl: { xl: 'text-xl', lg: 'text-xl', md: 'text-xl', sm: 'text-xl' },
    lg: { xl: 'text-lg', lg: 'text-lg', md: 'text-lg', sm: 'text-lg' },
    md: { xl: 'text-md', lg: 'text-md', md: 'text-md', sm: 'text-md' },
    sm: { xl: 'text-sm', lg: 'text-sm', md: 'text-sm', sm: 'text-sm' },
    xs: { xl: 'text-xs', lg: 'text-xs', md: 'text-xs', sm: 'text-xs' }
  };

  const { xl, lg, md, sm } = sizes[size];

  return `${sm} 2xl:${xl} xl:${xl} lg:${lg} md:${md} sm:${sm}`;
};

export const headingStyles = cva(['mb-0'], {
  variants: {
    size: {
      '9xl': getHeadingClasses('9xl'),
      '8xl': getHeadingClasses('8xl'),
      '7xl': getHeadingClasses('7xl'),
      '6xl': getHeadingClasses('6xl'),
      '5xl': getHeadingClasses('5xl'),
      '4xl': getHeadingClasses('4xl'),
      '3xl': getHeadingClasses('3xl'),
      '2xl': getHeadingClasses('2xl'),
      xl: getHeadingClasses('xl'),
      lg: getHeadingClasses('lg'),
      md: getHeadingClasses('md'),
      sm: getHeadingClasses('sm'),
      xs: getHeadingClasses('xs')
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-semibold'
    },
    center: {
      true: 'text-center',
      false: ''
    }
  },
  defaultVariants: {
    size: 'lg',
    weight: 'medium'
  }
});
