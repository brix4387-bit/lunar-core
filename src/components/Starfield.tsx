import { useEffect, useRef } from "react";

/**
 * Full-screen red-themed pixelated starfield background
 */
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const PIXEL_SIZE = 3;

    const stars: { x: number; y: number; size: number; speed: number; opacity: number; twinkleSpeed: number; red: number }[] = [];
    const STAR_COUNT = 300;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(document.documentElement.scrollHeight, window.innerHeight);
    };

    const initStars = () => {
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: (Math.floor(Math.random() * 2) + 1) * PIXEL_SIZE,
          speed: Math.random() * 0.3 + 0.05,
          opacity: Math.random(),
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          red: Math.random() > 0.5 ? 1 : 0,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = false;

      stars.forEach((star) => {
        star.opacity += star.twinkleSpeed;
        if (star.opacity > 1 || star.opacity < 0.2) {
          star.twinkleSpeed *= -1;
        }

        star.y -= star.speed;
        if (star.y < -5) {
          star.y = canvas.height + 5;
          star.x = Math.random() * canvas.width;
        }

        // Mix of red-tinted and neutral stars
        const r = star.red ? 255 : 230;
        const g = star.red ? Math.floor(80 + Math.random() * 40) : 220;
        const b = star.red ? Math.floor(60 + Math.random() * 30) : 220;

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${star.opacity})`;
        ctx.fillRect(
          Math.floor(star.x / PIXEL_SIZE) * PIXEL_SIZE,
          Math.floor(star.y / PIXEL_SIZE) * PIXEL_SIZE,
          star.size,
          star.size
        );
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    initStars();
    draw();

    const handleResize = () => {
      resize();
      initStars();
    };

    window.addEventListener("resize", handleResize);
    const observer = new ResizeObserver(resize);
    observer.observe(document.documentElement);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
