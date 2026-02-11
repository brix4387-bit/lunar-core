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

/**
 * Main Index page – single-page layout with smooth scroll navigation.
 * All text content is loaded dynamically from content.json.
 */
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
      {/* Animated starfield background */}
      <Starfield />

      {/* Navigation */}
      <NavBar content={content} />

      {/* Sections */}
      <main className="relative z-10">
        <HeroSection content={content} />
        <HowToPlaySection content={content} />
        <FeaturesSection content={content} />
        <TeamSection content={content} />
        <CommunitySection content={content} />
        <FeedbackSection />
        <Footer content={content} />
      </main>
    </div>
  );
};

export default Index;
