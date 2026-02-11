import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, CheckCircle, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Feedback {
  id: string;
  username: string;
  suggestion: string | null;
  rating: number;
  created_at: string;
}

/**
 * Feedback form with database persistence + auto-rolling feedback carousel
 */
export function FeedbackSection() {
  const [username, setUsername] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Fetch feedbacks
  const fetchFeedbacks = async () => {
    const { data } = await supabase
      .from("feedbacks")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setFeedbacks(data);
  };

  useEffect(() => {
    fetchFeedbacks();

    // Realtime subscription
    const channel = supabase
      .channel("feedbacks-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "feedbacks" }, () => {
        fetchFeedbacks();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Auto-roll carousel
  useEffect(() => {
    if (feedbacks.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % feedbacks.length);
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [feedbacks.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Username is required.");
      return;
    }
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }

    const { error: insertError } = await supabase.from("feedbacks").insert({
      username: username.trim(),
      suggestion: suggestion.trim() || null,
      rating,
    });

    if (insertError) {
      setError("Failed to submit feedback. Please try again.");
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setUsername("");
      setSuggestion("");
      setRating(0);
    }, 3000);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("feedbacks").delete().eq("id", id);
  };

  return (
    <section id="feedback" className="relative py-24 bg-space-gradient">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Feedback
          </h2>
          <p className="text-muted-foreground text-lg">
            Help us improve with your suggestions
          </p>
          <div className="w-16 h-1 bg-primary mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="glass-card rounded-xl p-8 space-y-6"
          >
            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-10"
              >
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="font-display text-2xl font-bold text-foreground">Thank you!</p>
                <p className="text-muted-foreground mt-2">Your feedback has been submitted.</p>
              </motion.div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Username <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Suggestion</label>
                  <textarea
                    value={suggestion}
                    onChange={(e) => setSuggestion(e.target.value)}
                    placeholder="Share your ideas..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Rating <span className="text-primary">*</span>
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        className="transition-transform duration-200 hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 transition-colors duration-200 ${
                            star <= (hoveredStar || rating)
                              ? "text-primary fill-primary"
                              : "text-muted-foreground"
                          }`}
                          strokeWidth={1.5}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-lg font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-primary/20"
                >
                  <Send className="w-5 h-5" strokeWidth={1.5} />
                  Submit Feedback
                </button>
              </>
            )}
          </motion.form>

          {/* Rolling feedback display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-xl p-8 flex flex-col"
          >
            <h3 className="font-display text-xl font-bold text-foreground mb-6">
              Community Feedback
            </h3>

            {feedbacks.length === 0 ? (
              <p className="text-muted-foreground text-sm flex-1 flex items-center justify-center">
                No feedback yet. Be the first!
              </p>
            ) : (
              <div className="flex-1 relative overflow-hidden min-h-[200px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={feedbacks[currentIndex]?.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-foreground">
                          {feedbacks[currentIndex]?.username}
                        </span>
                        <button
                          onClick={() => handleDelete(feedbacks[currentIndex]?.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors duration-200"
                          title="Delete feedback"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-5 h-5 ${
                              s <= (feedbacks[currentIndex]?.rating || 0)
                                ? "text-primary fill-primary"
                                : "text-muted-foreground"
                            }`}
                            strokeWidth={1.5}
                          />
                        ))}
                      </div>
                      {feedbacks[currentIndex]?.suggestion && (
                        <p className="text-foreground/80 leading-relaxed text-sm">
                          "{feedbacks[currentIndex]?.suggestion}"
                        </p>
                      )}
                    </div>
                    <p className="text-muted-foreground text-xs mt-4">
                      {new Date(feedbacks[currentIndex]?.created_at).toLocaleDateString()}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Dots indicator */}
                {feedbacks.length > 1 && (
                  <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1.5 pt-4">
                    {feedbacks.slice(0, Math.min(feedbacks.length, 10)).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          i === currentIndex ? "bg-primary w-4" : "bg-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
