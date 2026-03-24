import { Box } from '@mui/material';
import { LandingHeader } from './sections/LandingHeader';
import { HeroSection } from './sections/HeroSection';
import { TrustBadges } from './sections/TrustBadges';
import { FeaturesSection } from './sections/FeaturesSection';
import { ComplianceSection } from './sections/ComplianceSection';
import { AboutSection } from './sections/AboutSection';
import { ContactSection } from './sections/ContactSection';
import { LandingFooter } from './sections/LandingFooter';

export default function Landing() {
  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <LandingHeader />
      <HeroSection />
      <TrustBadges />
      <FeaturesSection />
      <ComplianceSection />
      <AboutSection />
      <ContactSection />
      <LandingFooter />
    </Box>
  );
}
