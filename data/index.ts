import type { TweetEntry } from '../types';
import { claudeTweets } from './subjects/claude';
import { financialTweets } from './subjects/financial';
import { coachingTweets } from './subjects/coaching';
import { scienceTweets } from './subjects/science';
import { paradoxesTweets } from './subjects/paradoxes';
import { timeManagementTweets } from './subjects/time-management';
import { negotiationTweets } from './subjects/negotiation';
import { businessBooksTweets } from './subjects/business-books';

export const allTweetData: TweetEntry[] = [
  ...claudeTweets,
  ...financialTweets,
  ...coachingTweets,
  ...scienceTweets,
  ...paradoxesTweets,
  ...timeManagementTweets,
  ...negotiationTweets,
  ...businessBooksTweets,
];

export { SUBJECTS, type SubjectName } from './constants';
