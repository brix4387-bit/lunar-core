import { useContent } from "@/hooks/useContent";
import { Starfield } from "@/components/Starfield";
import { NavBar } from "@/components/NavBar";
import { HeroSection } from "@/components/HeroSection";
import { HowToPlaySection } from "@/components/HowToPlaySection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TeamSection } from "@/components/TeamSection";
import { CommunitySection } from "@/components/CommunitySection";
import { FeedbackSection } from "@/components/FeedbackSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  const { content, loading } = useContent();

  if (loading || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <NavBar content={content} />

      <main className="relative">
        {/* Pixelated starfield fills entire page */}
        <Starfield />

        <div className="relative z-10">
          <HeroSection content={content} />
          <HowToPlaySection content={content} />
          <FeaturesSection content={content} />
          <TeamSection content={content} />
          <CommunitySection content={content} />
          <FeedbackSection />
          <Footer content={content} />
        </div>
      </main>
    </div>
  );
};

export default Index;
