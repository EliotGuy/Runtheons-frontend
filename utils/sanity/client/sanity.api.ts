import { assertValue } from '@/utils/assertValue';

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'NEXT_PUBLIC_SANITY_DATASET is required'
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'NEXT_PUBLIC_SANITY_PROJECT_ID is required'
);

export const apiVersion = assertValue(
  process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  'NEXT_PUBLIC_SANITY_API_VERSION is required'
);

export const useCdn =
  'true' ===
  assertValue(
    process.env.NEXT_PUBLIC_SANITY_USE_CDN,
    'NEXT_PUBLIC_SANITY_USE_CDN is required'
  );

export const studioUrl = assertValue(
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
  'NEXT_PUBLIC_SANITY_STUDIO_URL is required'
);
