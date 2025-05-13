import groq from 'groq';

export const ctaQuery = groq`
  ...,
  type == 'internalLink' => {
    ...,
    internalLink {
      ...,
      reference -> {
        ...,
        seo { slug },
      }
    }
  }
`;
