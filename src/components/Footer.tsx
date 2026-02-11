import { GameContent } from "@/hooks/useContent";

interface FooterProps {
  content: GameContent;
}

/**
 * Simple footer with game name and year
 */
export function Footer({ content }: FooterProps) {
  return (
    <footer className="border-t border-border/30 py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} {content.gameName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
