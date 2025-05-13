import groq from 'groq';

export const trustbarQuery = groq`
  ...,
  companies[]->{
    ...,
  }
`;
