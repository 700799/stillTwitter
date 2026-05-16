export type Tweet = {
  id: number;
  content: string;
  category: string;
  char_count: number;
  posted: boolean;
  posted_at: string | null;
  twitter_id: string | null;
  is_scheduled: boolean;
  created_at: string;
};

export type ScheduledPost = {
  id: number;
  tweet_id: number;
  scheduled_at: string;
  status: 'pending' | 'posted' | 'failed';
  twitter_id: string | null;
  error: string | null;
  created_at: string;
  content: string;
  category: string;
};

export type Stats = {
  total: number;
  posted: number;
  pending: number;
  scheduled: number;
};
