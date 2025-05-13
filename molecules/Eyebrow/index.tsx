'use client';
import type { FC, ReactNode } from 'react';

export interface EyebrowProps {
  heading?: string;
  headingType: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
  children?: ReactNode;
}

const Eyebrow: FC<EyebrowProps> = ({ heading, headingType, children }) => {
  const H = headingType || 'div';

  return <H className="uppercase text-base font-ttInterphrasesMono">{heading || children}</H>;
};

export default Eyebrow;
