import Link from 'next/link';
import React from 'react';

import Button from '@/molecules/Button';

import type { PortableTextReactComponents } from '@portabletext/react';

export const generateSlug = (text: string): string =>
  text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');

export const RichTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    ctaBar: ({ value }: any) => {
      const { ctas } = value;

      return (
        <div className="flex flex-wrap gap-4">
          {ctas &&
            ctas.map((cta: any) => {
              let href = '';
              if (cta?.type === 'internalLink') {
                href = cta?.internalLink?.reference?.seo?.slug?.current;
              } else if (cta?.type === 'link') {
                href = cta?.link?.href;
              }

              return (
                <Button
                  key={cta?.buttonText}
                  variant={cta?.buttonStyle}
                  label={cta?.buttonText}
                  size={cta?.buttonSize}
                  trailingIcon={cta?.iconPosition === 'trailing' && cta?.icon?.name}
                  leadingIcon={cta?.iconPosition === 'leading' && cta?.icon?.name}
                  href={href}
                />
              );
            })}
        </div>
      );
    },
  },
  block: {
    h1: ({ children }: any) => {
      if (children[0]?.props?.text) {
        const headingId = children[0]
          ? generateSlug(children[0]?.props?.text.toString())
          : `heading-${children[0]?.props?.text}`;

        return (
          <h2 className="my-4 text-gray-900" id={headingId}>
            {children}
          </h2>
        );
      }

      const headingId = children[0] ? generateSlug(children[0].toString()) : `heading-${children[0]}`;

      return (
        <h1 className="my-4 text-gray-900" id={headingId}>
          {children}
        </h1>
      );
    },
    h2: ({ children }: any) => {
      if (children[0]?.props?.text) {
        const headingId = children[0]
          ? generateSlug(children[0]?.props?.text.toString())
          : `heading-${children[0]?.props?.text}`;

        return (
          <h2 className="lg:text-display-lg my-4 text-gray-900" id={headingId}>
            {children}
          </h2>
        );
      }

      const headingId = children[0] ? generateSlug(children[0].toString()) : `heading-${children[0]}`;

      return (
        <h2 className="lg:text-display-lg my-4 text-gray-900" id={headingId}>
          {children}
        </h2>
      );
    },
    h3: ({ children }: any) => {
      if (children[0]?.props?.text) {
        const headingId = children[0]
          ? generateSlug(children[0]?.props?.text.toString())
          : `heading-${children[0]?.props?.text}`;

        return (
          <h3 className="my-4 text-gray-900" id={headingId}>
            {children}
          </h3>
        );
      }

      const headingId = children[0] ? generateSlug(children[0].toString()) : `heading-${children[0]}`;

      return (
        <h3 className="my-4 text-gray-900" id={headingId}>
          {children}
        </h3>
      );
    },
    blockquote: ({ children }) => (
      <blockquote className="my-4 rounded-2xl bg-gray-50 p-8 italic text-gray-700">{children}</blockquote>
    ),
    ul: ({ children }) => <ul className="my-4 ml-8 list-disc">{children}</ul>,
    ol: ({ children }) => <ol className="my-4 ml-8 list-decimal">{children}</ol>,
    li: ({ children }) => <li className="mb-2">{children}</li>,
    p: ({ children }) => <p className="my-4 text-xl">{children}</p>,
  },
  marks: {
    internalLink: ({ children, value }: any) => {
      const slug = value?.reference?.seo?.slug?.current || value?.slug;
      const rel = slug && !slug?.startsWith('/') ? 'noreferrer noopener' : undefined;
      const target = value?.blank ? '_blank' : undefined;

      return (
        <Link href={`/${slug}`} rel={rel} className="text-gray-300 hover:text-gray-100 underline" target={target}>
          {children}
        </Link>
      );
    },
    link: ({ children, value }: any) => (
      <Link href={value?.href} target="_blank" className="text-gray-300 hover:text-gray-100 underline">
        {children}
      </Link>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-2 ml-10 list-disc">{children}</li>,
    number: ({ children }) => <li className="mb-2 ml-10 list-decimal">{children}</li>,
  },
};
