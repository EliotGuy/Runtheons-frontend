import Hero from '@/components/Hero';
import VideoCard from '../VideoCard';
import DigitalTwin from '../DigitalTwin';
import PerformancePlan from '../PerformancePlan';
import CoachSection from '../CoachSection';
import LearningIntegration from '../LearningIntegration';
import PricingPlan from '../PricingPlan';
import FAQ from '../Accordion';
import CategorySelection from '../CategorySelection';
import AtletaPricing from '../AtletaPricing';
import OurFounders from '../OurFounders';
import ThankYou from '../ThankYou';

const LayoutSection = (props: any) => {

  const componentGenerator = (data: any) => {
    switch (data?._type) {
      case 'hero':
        return <Hero {...data} />;
      case 'videoEmbed':
        return <VideoCard {...data} />;
      case 'digitalTwin':
        return <DigitalTwin {...data} />
      case 'performancePlan':
        return <PerformancePlan {...data} />
      case 'coachSection':
        return <CoachSection {...data} />
      case 'learningIntegration':
        return <LearningIntegration {...data} />
      case 'pricingPlan':
        return <PricingPlan {...data} />
      case 'faqComponent':
        return <FAQ {...data} />
      case 'categorySelection':
        return <CategorySelection {...data} />
      case 'atletaPricing':
        return <AtletaPricing {...data} />
      case 'ourFounders':
        return <OurFounders {...data} />
      case 'thankYou':
        return <ThankYou {...data} />
      default:
        return <div className="container">Missing component</div>;
    }
  };

  return (
    <div className="layout-padding">
      {componentGenerator(props)}
    </div>
  );
};

export default LayoutSection;
