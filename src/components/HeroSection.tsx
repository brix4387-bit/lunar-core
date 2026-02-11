import { motion } from "framer-motion";
import { GameContent } from "@/hooks/useContent";
import redMoon from "@/assets/red-moon.png";

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
      {/* Red Moon */}
      <div className="absolute top-1/2 left-1/2 animate-moon-float pointer-events-none" style={{ transform: "translate(-50%, -50%)" }}>
        <img
          src={redMoon}
          alt="Glowing red moon"
          className="w-[400px] h-[400px] md:w-[550px] md:h-[550px] opacity-40 select-none"
          draggable={false}
        />
        {/* Moon glow overlay */}
        <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl" />
      </div>

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
