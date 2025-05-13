import { twJoin } from 'tailwind-merge';

import { headingStyles } from '@/utils/consts';

import type { FC } from 'react';
import type { HeadingProps } from '@/types/sanity';

const Heading: FC<HeadingProps> = ({
  heading,
  headingType,
  headingSize,
  headingWeight,
  children,
  className,
  center = false,
}) => {
  const H = headingType || 'h2';
  const id = heading
    ?.toLowerCase()
    .replace(/x[\d]+;/g, '')
    .replace(/[^a-z0-9\s]+/g, '')
    .replace(/\s/g, '-');

  return (
    <H
      id={`heading-${id}`}
      className={twJoin(className, headingStyles({ size: headingSize, center, weight: headingWeight }))}
    >
      {children || heading}
    </H>
  );
};

export default Heading;
