export const SUBJECTS = [
  'Claude Code Tips',
  'Financial Advice',
  'Coaching Stories',
  'Science & Math',
  'Paradoxes & Dilemmas',
  'Time Management & Study',
  'Negotiation',
  'Business Books',
] as const;

export type SubjectName = (typeof SUBJECTS)[number];
