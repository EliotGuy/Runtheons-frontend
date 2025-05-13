import Link from 'next/link';

const parseUrl = (href: string) => {
  if (!href) {
    return {
      Component: 'div',
      href: ''
    } as const;
  }

  if (href[0] === '/') {
    return {
      href,
      as: Link
    };
  }

  if (href[0] === '#') {
    return {
      href,
      as: Link
    };
  }

  const domain = 'localhost'; // ADD YOUR DOMAIN HERE

  let url: URL;
  try {
    if (!/^https?:\/\//i.test(href)) {
      url = new URL(href, `http://${domain}`);
    } else {
      url = new URL(href);
    }
  } catch (error) {
    throw new Error(`Invalid URL: ${href}`);
  }

  const isInternal =
    url.hostname === `www.${domain}` || url.hostname === domain;

  return {
    Component: isInternal ? Link : 'a',
    rel: isInternal ? '' : 'noreferrer noopener',
    target: isInternal ? '' : '_blank',
    href: isInternal ? url.pathname + url.search + url.hash : href
  } as const;
};

export default parseUrl;
