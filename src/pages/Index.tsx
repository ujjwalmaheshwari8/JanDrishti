import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import FeaturesSection from "@/components/FeaturesSection";
import PipelineSection from "@/components/PipelineSection";
import AIDemoSection from "@/components/AIDemoSection";
import WhyMattersSection from "@/components/WhyMattersSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <PipelineSection />
      <AIDemoSection />
      <WhyMattersSection />
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border">
        <p>© 2026 JanDrishti — AI-Powered Governance Intelligence Platform</p>
      </footer>
    </div>
  );
};

export default Index;
