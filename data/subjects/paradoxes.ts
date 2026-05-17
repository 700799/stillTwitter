import type { TweetEntry } from '../../types';

export const paradoxesTweets: TweetEntry[] = [
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Game Theory',
    hook: "Two strangers who have never met keep making the same terrible decision — and it is completely rational",
    parts: [
      "The Prisoner's Dilemma: two suspects can't communicate. Betray or stay silent? Here's why rational people always betray each other even when cooperation gives the better outcome 🧵",
      "Stay silent: both get 1 year. One betrays: betrayer goes free, loyal one gets 3 years. Both betray: 2 years each. Betrayal is the dominant strategy regardless of what the other does.",
      "This explains cartels collapsing, arms races, and companies polluting. Rational self-interest destroys optimal collective outcomes. The only fix is repeated games, reputation, and enforcement.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Logic Paradoxes',
    hook: "A barber shaves all men who don't shave themselves — so who shaves the barber?",
    parts: [
      "Russell's Paradox (1901): if a set contains all sets that don't contain themselves, does it contain itself? If yes → contradiction. If no → contradiction. Bertrand Russell sent this in a letter and broke Frege's entire logical system.",
    ],
  },
];
