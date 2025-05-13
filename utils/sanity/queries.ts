import groq from 'groq';
import { client } from '../../client';

export const getSinglePageData = async (pageType: string, slug: string) => {
  const query = groq`
    *[
      _type == $pageType
      && slug.current == $slug
    ][0]{
      seo {
        ...,
        "ogImage": ogImage.asset->url
      }
    }
  `;

  const params = { pageType, slug };

  const data = await client.fetch(query, params, {
    next: {
      revalidate: 5
    }
  });

  return {
    props: {
      data
    }
  };
};
