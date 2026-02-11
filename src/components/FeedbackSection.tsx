import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send, CheckCircle } from "lucide-react";

/**
 * Suggestion & Rating form with localStorage persistence
 */
export function FeedbackSection() {
  const [username, setUsername] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
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

    // Store in localStorage
    const existing = JSON.parse(localStorage.getItem("feedback") || "[]");
    existing.push({
      username: username.trim(),
      suggestion: suggestion.trim(),
      rating,
      date: new Date().toISOString(),
    });
    localStorage.setItem("feedback", JSON.stringify(existing));

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setUsername("");
      setSuggestion("");
      setRating(0);
    }, 3000);
  };

  return (
    <section id="feedback" className="relative py-24 bg-space-gradient">
      <div className="container mx-auto px-4 max-w-xl">
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
              <p className="font-display text-2xl font-bold text-foreground">
                Thank you!
              </p>
              <p className="text-muted-foreground mt-2">
                Your feedback has been submitted.
              </p>
            </motion.div>
          ) : (
            <>
              {/* Username */}
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

              {/* Suggestion */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Suggestion
                </label>
                <textarea
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  placeholder="Share your ideas..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 resize-none"
                />
              </div>

              {/* Star rating */}
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

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              {/* Submit */}
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
      </div>
    </section>
  );
}
