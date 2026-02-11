
-- Feedback table for public submissions
CREATE TABLE public.feedbacks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL,
  suggestion TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.feedbacks ENABLE ROW LEVEL SECURITY;

-- Anyone can read feedbacks (public display)
CREATE POLICY "Anyone can read feedbacks"
  ON public.feedbacks FOR SELECT
  USING (true);

-- Anyone can insert feedbacks (no auth required)
CREATE POLICY "Anyone can insert feedbacks"
  ON public.feedbacks FOR INSERT
  WITH CHECK (true);

-- Anyone can delete feedbacks (for now, public delete)
CREATE POLICY "Anyone can delete feedbacks"
  ON public.feedbacks FOR DELETE
  USING (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.feedbacks;
