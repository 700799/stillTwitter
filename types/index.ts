export type TweetEntry = {
  subject: string;
  category: string;
  hook: string;
  parts: string[];
};

export type Tweet = {
  id: number;
  subject: string;
  category: string;
  hook: string;
  parts: string[];
  is_thread: boolean;
  part_count: number;
  posted: boolean;
  posted_at: string | null;
  twitter_id: string | null;
  is_scheduled: boolean;
  scheduled_at: string | null;
  created_at: string;
};

export type Account = {
  id: string;
  name: string;
  appKey: string;
  appSecret: string;
  accessToken: string;
  accessSecret: string;
};

export type ScheduledPost = {
  id: number;
  tweet_id: number;
  account_id: string;
  scheduled_at: string;
  status: 'pending' | 'posted' | 'failed';
  twitter_id: string | null;
  error: string | null;
  created_at: string;
  hook: string;
  subject: string;
  category: string;
  parts: string[];
};

export type Stats = {
  total: number;
  posted: number;
  pending: number;
  scheduled: number;
};

export type SubjectStat = {
  name: string;
  total: number;
  posted: number;
};

export type NewsSource = {
  id: number;
  name: string;
  url: string;
  category: string;
  active: boolean;
  created_at: string;
};

export type DigestArticle = {
  title: string;
  link: string;
  description: string | null;
  source: string;
  publishedAt: string;
};

export type NewsDigest = {
  id: number;
  date: string;
  articles: DigestArticle[];
  email_sent: boolean;
  created_at: string;
};

export type OptimizeResult = {
  score: number;
  score_reason: string;
  rewritten_hook: string;
  hashtags: string[];
  best_time: string;
  tip: string;
};
