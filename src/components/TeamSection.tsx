import { motion } from "framer-motion";
import { GameContent } from "@/hooks/useContent";
import { User } from "lucide-react";

interface TeamSectionProps {
  content: GameContent;
}

/**
 * Development team section with avatar cards
 */
export function TeamSection({ content }: TeamSectionProps) {
  return (
    <section id="team" className="relative py-24 bg-space-gradient">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Team
          </h2>
          <p className="text-muted-foreground text-lg">
            The people behind the world
          </p>
          <div className="w-16 h-1 bg-primary mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-xl p-6 text-center hover-glow"
            >
              {/* Avatar placeholder */}
              <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-primary/60" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
