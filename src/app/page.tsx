import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorks } from './components/HowItWorks';
import { BenefitsSection } from './components/BenefitsSection';
import { PricingSection } from './components/PricingSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <div id="features">
         <FeaturesSection /> 
      </div>
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <BenefitsSection />
      <div id="pricing">
      {/*  <PricingSection /> */} 
      </div>
      <div id="testimonials">
        {/* <TestimonialsSection /> */}
      </div>
      <CTASection />
      <Footer />
    </div>
  );
}
