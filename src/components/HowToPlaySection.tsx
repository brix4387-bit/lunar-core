import { useState } from "react";
import { motion } from "framer-motion";
import { GameContent } from "@/hooks/useContent";

interface HowToPlaySectionProps {
  content: GameContent;
}

/**
 * How to Play section with platform tabs and step-by-step instructions
 */
export function HowToPlaySection({ content }: HowToPlaySectionProps) {
  const platforms = content.howToPlay.platforms;
  const platformKeys = Object.keys(platforms);
  const [activePlatform, setActivePlatform] = useState(platformKeys[0]);

  const activeData = platforms[activePlatform];

  return (
    <section id="how-to-play" className="relative py-24 bg-space-gradient">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            How to Play
          </h2>
          <p className="text-muted-foreground text-lg">
            Connect to {content.gameName} in just a few steps
          </p>
          {/* Red accent divider */}
          <div className="w-16 h-1 bg-primary mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Platform tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center gap-2 mb-10"
        >
          {platformKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActivePlatform(key)}
              className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
                activePlatform === key
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {platforms[key].title}
            </button>
          ))}
        </motion.div>

        {/* Steps */}
        <motion.div
          key={activePlatform}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          {activeData.steps.map((step, i) => (
            <div
              key={i}
              className="glass-card rounded-xl p-5 flex items-start gap-4 hover-glow"
            >
              {/* Step number */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <span className="text-primary font-bold text-sm">{i + 1}</span>
              </div>
              <p className="text-foreground/90 leading-relaxed pt-1.5">{step}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
