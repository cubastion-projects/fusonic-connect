import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import TrendingSection from '@/components/home/TrendingSection';
import AnnouncementsSection from '@/components/home/AnnouncementsSection';
import EventsSection from '@/components/home/EventsSection';
import SpacesSection from '@/components/home/SpacesSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <TrendingSection />
      <AnnouncementsSection />
      <EventsSection />
      <SpacesSection />
    </Layout>
  );
};

export default Index;
