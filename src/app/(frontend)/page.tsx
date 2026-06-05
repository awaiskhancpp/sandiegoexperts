import Hero from "@/components/Hero";
import WhySection from "@/components/WhySection";
import HowWeWork from "@/components/HowWeWork";
import VideoTestimonials from "@/components/VideoTestimonials";
import StatsSection from "@/components/StatsSection";
import WorkWithUs from "@/components/WorkWithUs";
import ProcessSection from "@/components/ProcessSection";
import RoadmapSection from "@/components/RoadmapSection";
import WealthSection from "@/components/WealthSection";
import CaseStudies from "@/components/CaseStudies";
import RevenueGap from "@/components/RevenueGap";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhySection />
      <HowWeWork />
      <VideoTestimonials />
      <StatsSection />
      <WorkWithUs />
      <ProcessSection />
      <RoadmapSection />
      <WealthSection />
      <CaseStudies />
      <RevenueGap />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <SiteFooter />
    </main>
  );
}
