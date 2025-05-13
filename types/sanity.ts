export interface SeoType {
  slug?: {
    current?: string;
  };
  title?: string;
  description?: string;
  ogImage?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

export interface ThankYouProps {
  title?: string;
  subtitle?: string;
  image?: any;
  ctaText?: string;
  inviteText?: string;
}

export interface OurFoundersProps {
  title?: string;
  description?: string;
  founders?: any;
}

export interface CategorySelectionProps {
  title?: string;
  categories?: any;
}

export interface AccordionProps {
  title?: string;
  titleImage?: any;
  faqItems?: any;
}

export interface PricingPlanProps {
  title?: string;
  subtitle?: string;
  plans?: any;
}

export interface LearningIntegrationProps {
  title?: string;
  subtitle?: string;
  integrationsSection?: any;
  learningSection?: any;
  embeds?: any;
}

export interface CoachSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  buttonText?: string;
  descriptionBlocks?: any[];
  image?: any;
}

export interface PerformancePlanProps {
  title?: string;
  subTitle?: string;
  ctaText?: string;
  ctaLink?: string;
  videos?: any;
  embeds?: any;
}

export interface HeaderType {
  title: string;
  logo?: any;
  mainNav: {
    title: string;
    link: string;
  }[];
}

export interface FooterType {
  privacyPolicy: string;
}

export interface GlobalSettings {
  header: HeaderType;
  footer: FooterType;
}

export interface PageType {
  title: string;
  slug: {
    current: string;
  };
  content: any[];
  seo?: SeoType;
}

export interface HeroProps {
  _type: 'hero';
  eyebrow?: string;
  heading?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface HeadingProps {
  heading?: string;
  headingType: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  headingSize:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl';
  headingWeight: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  children?: ReactNode;
  className?: string;
  center?: boolean;
}
