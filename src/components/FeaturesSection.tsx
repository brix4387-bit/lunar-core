import { motion } from "framer-motion";
import { GameContent } from "@/hooks/useContent";
import { Globe, Repeat, Boxes, Trophy, Smartphone, Puzzle } from "lucide-react";

/** Map icon names from content.json to Lucide components */
const iconMap: Record<string, React.ElementType> = {
  globe: Globe,
  repeat: Repeat,
  boxes: Boxes,
  trophy: Trophy,
  smartphone: Smartphone,
  puzzle: Puzzle,
};

interface FeaturesSectionProps {
  content: GameContent;
}

/**
 * Features grid section with hover glow cards
 */
export function FeaturesSection({ content }: FeaturesSectionProps) {
  return (
    <section id="features" className="relative py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Features
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need for an unforgettable experience
          </p>
          <div className="w-16 h-1 bg-primary mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.features.map((feature, i) => {
            const Icon = iconMap[feature.icon] || Globe;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card rounded-xl p-6 hover-glow cursor-default"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
