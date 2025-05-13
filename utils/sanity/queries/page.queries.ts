import groq from 'groq';

import { PAGE_TYPES } from '@/utils/consts';
import { sanityFetch } from '@/utils/sanity/client/sanity.fetch';
import { ctaQuery } from '@/utils/sanity/queries/queryFragments/cta.query';
import { heroMarqueeQuery } from '@/utils/sanity/queries/queryFragments/heroMarquee.query';
import { sharedComponentQuery } from '@/utils/sanity/queries/queryFragments/sharedComponent.query';

const pageQuery = groq`
*[_type in ${JSON.stringify(PAGE_TYPES)} && slug.current == $slug][0] {
  ...,
  _createdAt,
  _id,
  _rev,
  _type,
  _updatedAt,
  slug,
  title,
  body[]{
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
    _type == "embeddedForm" => {
      hubspotForm-> {
        ...,
        redirectLinkType == "internalLink" => {
          internalLink-> {
            seo {
              slug {
                current
              }
            }
          }
        }
      },
      breadcrumb[] {
        ...,
        link-> {
          ...
        }
      }
    },
    _type == "heroMarquee" => {
      ${heroMarqueeQuery}
    },
    _type=="cardDeck"=>{
      ...,
      cards[]{
        ...,
        body[]{
          _type=="block"=>{
            ...,
            markDefs[]{
              ...,
              _type=="internalLink"=>{
                reference->{
                  seo,
                }
              }
            }
          }
        },
        cta{
          ...,
          actionType=="internalLink"=>{
            internalLink{
              reference->{
                seo,
              }
            }
          }
        }
      }
    },
    _type == "basicText" => {
      ...,
      body[]{
        ...,
        _type == "block" => {
          ...,
          markDefs[]{
            ...,
            _type == "internalLink" => {
              ...,
              reference->{
                seo
              }
            }
          }
        }
      },
      bodyRight[]{
        ...,
        _type == "block" => {
          ...,
          markDefs[]{
            ...,
            _type == "internalLink" => {
              ...,
              reference->{
                seo
              }
            }
          }
        }
      }
    },
    _type == "trustBar" =>{
      ...,
      companies[]->{
        ...,
      },
      link{
        ...,
        internalLink{
          reference->{
            ...,
          }
        }
      }
    },
    _type == "testimonialPanel" => {
      ...,
      testimonials[]->{
        ...,
        _type == "testimonial" => {
          ...,
          video->{
            ...,
            videoDetails
          },
          author->{
            ...,
            company->{
              ...,
              logotype{
                ...,
              }
            }
          }
        }
      }
    },
    _type == "industriesSelector"=>{
      ...,
      industries[]{
        ...,
        link{
          ...,
          internalLink{
            reference->{
              ...,
            }
          }
        }
      }
    },
    _type == "capabilitiesSlider"=>{
      ...,
      slides[]{
        ...,
        cta{
          ...,
          internalLink{
            reference->{
              seo,
            }
          }
        }
      }
    },
    _type == "videoEmbed"=>{
      ...,
      "videoUrl": video.asset->url
    },
    _type == "learningIntegration"=>{
      ...,
      embeds[]{
        ...,
        "videoUrl": video.asset->url
      }
    },
    _type == "performancePlan"=>{
      ...,
      videos[]{
        ...,
        "videoUrl": video.asset->url
      },
      embeds[]{
        ...,
        "videoUrl": video.asset->url
      }
    },
    _type == "clientStoriesCallout"=>{
      ...,
      clientStories[]{
        ...,
        clientStory->{
          "slug": seo.slug.current,
          ...,
        }
      }
    },
    _type == "hero"=>{
      ...,
      cta{
        ...,
        internalLink{
          ...,
          reference->{
            slug
          }
        }
      }
    },
    _type == "sharedComponentReference" => ${sharedComponentQuery}
  }
}`;

export const fetchFullPageData = async (slug: string) => {
  const data = await sanityFetch<any>({
    query: pageQuery,
    params: { slug }
  });

  return data;
};
