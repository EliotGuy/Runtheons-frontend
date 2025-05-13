import groq from 'groq';

import { ctaQuery } from '@/utils/sanity/queries/queryFragments/cta.query';
import { trustbarQuery } from '@/utils/sanity/queries/queryFragments/trustbar.query';

export const heroMarqueeQuery = groq`
  ...,
  body[]{
    ...,
    _type == "ctaBar" => {
      ...,
      ctas[]{
        ${ctaQuery}
      }
    },
  },
  trustbar{
    ...,
    headline[]{
      ...,
      children[]{
        ...,
        _type == "tokenReference" => {
          ...,
          token->{
            ...,
          }
        }
      }
    },
    trustbars[]{
      ...,
      token->{
        ...,
      },
      trustBar{
        ${trustbarQuery}
      }
    }
  }
`;
