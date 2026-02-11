import { useEffect, useState } from "react";

export interface GameContent {
  gameName: string;
  description: string;
  playLink: string;
  discordLink: string;
  features: { title: string; description: string; icon: string }[];
  team: { name: string; role: string }[];
  howToPlay: {
    platforms: Record<string, { title: string; steps: string[] }>;
  };
}

/**
 * Hook to load content.json dynamically
 */
export function useContent() {
  const [content, setContent] = useState<GameContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/content.json")
      .then((res) => res.json())
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load content.json:", err);
        setLoading(false);
      });
  }, []);

  return { content, loading };
}
