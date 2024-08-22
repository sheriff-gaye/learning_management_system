"use client";

import Footer from "./_components/footer";
import { LandingContent } from "./_components/landing-content";
import { LandingHero } from "./_components/landing-hero";
import LandingNavBar from "./_components/landing-navbar";
import ProductShowCase from "./_components/product-showcase";
import CTA from "./_components/cta";

const LandingPage = () => {
  return (
    <div className="h-full">
      <LandingNavBar />
      <LandingHero />
      <ProductShowCase />
      <LandingContent />
      <CTA/>
     
      <Footer />
  
    </div>
  );
};

export default LandingPage;
