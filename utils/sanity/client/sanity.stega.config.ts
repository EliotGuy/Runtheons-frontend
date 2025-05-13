import { studioUrl } from '@/utils/sanity/client/sanity.api';

import type { ClientPerspective, StegaConfig } from 'next-sanity';

const arraysHaveOverlap = (arr1: unknown[], arr2: unknown[]) =>
  arr1.some((item) => arr2.includes(item));

const fieldNamesExcludedFromStega = [
  '_type',
  'backgroundColor',
  'backgroundIsCustomized',
  'blank',
  'buttonSize',
  'buttonStyle',
  'color',
  'ctaButtonStyle',
  'ctaButtonSize',
  'direction',
  'edgeTreatments',
  'eyebrowType',
  'formId',
  'headingLevel',
  'headingSize',
  'iconPosition',
  'inset',
  'layout',
  'mask',
  'mediaSide',
  'mediaType',
  'mode',
  'padding',
  'rightContentType',
  'textColor',
  'videoProvider',
  'videoId'
];

const fieldNamesIncludedInStega = ['date'];

interface StegaConfigParams {
  perspective: Omit<ClientPerspective, 'raw'>;
}

export const getStegaConfig = ({
  perspective
}: StegaConfigParams): StegaConfig => ({
  studioUrl,
  enabled:
    perspective === 'previewDrafts' || process.env.VERCEL_ENV === 'preview',
  filter: (props) => {
    // See these docs: https://github.com/sanity-io/client?tab=readme-ov-file#using-visual-editing-with-steganography
    const { sourcePath } = props;

    if (arraysHaveOverlap(sourcePath, fieldNamesExcludedFromStega)) {
      // Returning false means that the field will not be appended with stega data
      return false;
    }

    if (arraysHaveOverlap(sourcePath, fieldNamesIncludedInStega)) {
      // Returning true means that the field will be appended with stega data
      return true;
    }

    // For all other cases, Sanity's default behavior will be used
    return props.filterDefault(props);
  }
});
