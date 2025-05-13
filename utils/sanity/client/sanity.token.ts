'server-only';

import { assertValue } from '@/utils/assertValue';

export const token = assertValue(
  process.env.SANITY_READ_TOKEN,
  'SANITY_READ_TOKEN is required'
);
