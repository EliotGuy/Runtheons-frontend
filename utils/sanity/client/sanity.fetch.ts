import { draftMode } from 'next/headers';

import { client } from '@/utils/sanity/client/sanity.client';
import { getStegaConfig } from '@/utils/sanity/client/sanity.stega.config';
import { token } from '@/utils/sanity/client/sanity.token';

import type { ClientPerspective, QueryParams, StegaConfig } from 'next-sanity';

export interface SanityFetchParams {
  query: string;
  params?: QueryParams;
  perspective?: Omit<ClientPerspective, 'raw'>;
  stega?: StegaConfig;
}

export const sanityFetch = async <QueryResponse>({
  query,
  params = {},
  perspective = 'published',
  stega = getStegaConfig({ perspective })
}: SanityFetchParams) => {
  return client.fetch<QueryResponse>(query, params, {
    stega: false,
    perspective: 'published',
    useCdn: true,
    // When not in preview mode, cache the response for 60 seconds
    next: { revalidate: 60 }
  });
};
