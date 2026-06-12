import Layout from '@/components/Layout';
import DimensionalHero from '@/sections/DimensionalHero';
import Manifesto from '@/sections/Manifesto';
import RecentProjects from '@/sections/RecentProjects';
import Expertise from '@/sections/Expertise';
import ContactCTA from '@/sections/ContactCTA';

export default function Home() {
  return (
    <Layout>
      <DimensionalHero />
      <Manifesto />
      <RecentProjects />
      <Expertise />
      <ContactCTA />
    </Layout>
  );
}
