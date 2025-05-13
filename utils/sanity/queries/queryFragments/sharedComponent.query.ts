import groq from 'groq';

export const sharedComponentQuery = groq`
  @->{
    ...,
    content[]{
      _type == "conversionPanel" =>{
        ...,
        internalLink{
          reference->{
            ...,
          }
        }
      }
    }
  }
`;
