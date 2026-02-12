import { motion } from "framer-motion";
import { GameContent } from "@/hooks/useContent";

interface HeroSectionProps {
  content: GameContent;
}

/**
 * Hero section with floating red moon, title, and CTA buttons
 */
export function HeroSection({ content }: HeroSectionProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient"
    >

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight"
        >
          {content.gameName}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto"
        >
          {content.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={content.playLink}
            className="bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/30 animate-pulse-glow"
          >
            Play Now
          </a>
          <button
            onClick={() => scrollTo("how-to-play")}
            className="border border-border text-foreground px-8 py-3.5 rounded-xl font-semibold text-lg hover:scale-105 hover:border-primary/50 transition-all duration-300 bg-secondary/50"
          >
            How to Play
          </button>
          <a
            href={content.discordLink}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border text-foreground px-8 py-3.5 rounded-xl font-semibold text-lg hover:scale-105 hover:border-primary/50 transition-all duration-300 bg-secondary/50"
          >
            Join Discord
          </a>
        </motion.div>
      </div>
    </section>
  );
}
