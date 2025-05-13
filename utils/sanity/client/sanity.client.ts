import { createClient } from '@sanity/client';

import {
  apiVersion,
  dataset,
  projectId,
  useCdn
} from '@/utils/sanity/client/sanity.api';

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  perspective: 'published',
  stega: {
    enabled: false,
    studioUrl: 'https://studio.wbstks.dev'
  }
});
