import { GameContent } from "@/hooks/useContent";

interface NavBarProps {
  content: GameContent;
}

/**
 * Fixed top navigation bar with smooth scroll links
 */
export function NavBar({ content }: NavBarProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo / Game name */}
        <button
          onClick={() => scrollTo("hero")}
          className="font-display text-xl font-bold text-foreground tracking-wide hover:text-primary transition-colors duration-300"
        >
          {content.gameName}
        </button>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {["How to Play", "Features", "Team", "Community", "Feedback"].map(
            (label) => (
              <button
                key={label}
                onClick={() => scrollTo(label.toLowerCase().replace(/ /g, "-"))}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
              >
                {label}
              </button>
            )
          )}
        </div>

        {/* CTA */}
        <a
          href={content.playLink}
          className="bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary/20"
        >
          Play Now
        </a>
      </div>
    </nav>
  );
}
