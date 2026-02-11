import { motion } from "framer-motion";
import { GameContent } from "@/hooks/useContent";
import { MessageCircle } from "lucide-react";

interface CommunitySectionProps {
  content: GameContent;
}

/**
 * Discord community section with pulsing glow button
 */
export function CommunitySection({ content }: CommunitySectionProps) {
  return (
    <section id="community" className="relative py-24">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Join the Community
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Connect with thousands of players on Discord
          </p>

          <a
            href={content.discordLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300 animate-pulse-glow"
          >
            <MessageCircle className="w-6 h-6" strokeWidth={1.5} />
            Join Discord
          </a>
        </motion.div>
      </div>
    </section>
  );
}
