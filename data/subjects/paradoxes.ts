import type { TweetEntry } from '../../types';

export const paradoxesTweets: TweetEntry[] = [
  // ── Logic Paradoxes ──────────────────────────────────────────────────────
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Logic Paradoxes',
    hook: "A barber shaves all men who don't shave themselves — so who shaves the barber?",
    parts: [
      "Russell's Paradox (1901): if a set contains all sets that don't contain themselves, does it contain itself? If yes → contradiction. If no → contradiction. Bertrand Russell sent this in a letter and broke Frege's entire logical system.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Logic Paradoxes',
    hook: 'This sentence is false. Go ahead, decide if that\'s true.',
    parts: [
      "The Liar Paradox: \"This statement is false.\" If it's true, it must be false. If it's false, it must be true. Ancient Greeks called it the Pseudomenon. Two thousand years later, we still have no clean solution.",
      "Tarski's fix: truth can only be talked about from a higher-level language than the one making the claim. No language can define its own truth predicate without contradiction. Mathematics had to be redesigned around this.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Logic Paradoxes',
    hook: "Zeno said you can never cross a room. Here's why he wasn't being stupid.",
    parts: [
      "Zeno's Dichotomy: to cross a room you must first reach the halfway point. Then the halfway point of what remains. Then the halfway again. You need to complete infinitely many steps — so how do you ever finish?",
      "The mathematical answer: an infinite series can have a finite sum. 1/2 + 1/4 + 1/8 + ... = 1. But Zeno's deeper point was philosophical — how can infinitely many completed acts happen in finite time? Physicists still debate whether space is truly continuous.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Logic Paradoxes',
    hook: 'Gödel proved that every sufficiently powerful math system contains truths it can never prove.',
    parts: [
      "Gödel's Incompleteness Theorem (1931): in any consistent formal system strong enough to do basic arithmetic, there exist true statements that cannot be proven within that system. Mathematics can never fully bootstrap itself.",
      "He constructed a statement that essentially says \"I am not provable.\" If the system could prove it, the system would be inconsistent. So the statement is true — and unprovable. Every math textbook rests on foundations that cannot be fully verified from inside.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Logic Paradoxes',
    hook: 'The word "heterological" describes words that don\'t describe themselves. Is "heterological" heterological?',
    parts: [
      "Grelling-Nelson Paradox (1908): \"short\" is short — autological. \"Long\" is not long — heterological. \"Heterological\" means a word that doesn't describe itself. If it IS heterological, it describes itself, making it autological. Contradiction either way.",
      "This isn't wordplay. It's the same structure as Russell's Paradox but in natural language. It shows self-reference creates contradictions regardless of whether you're doing set theory or just talking about words.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Logic Paradoxes',
    hook: "If God is omnipotent, can He create a stone so heavy He can't lift it?",
    parts: [
      "The Omnipotence Paradox: if God can create such a stone, there's something God cannot do (lift it). If God cannot create such a stone, there's something God cannot do (create it). Either way, omnipotence seems self-defeating.",
      "Philosophers respond in two ways: redefine omnipotence as \"able to do all logically possible things\" (creating contradictions isn't a coherent task), or accept that omnipotence is an incoherent concept. Neither answer satisfies everyone.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Logic Paradoxes',
    hook: 'Berry Paradox: "The smallest positive integer not definable in fewer than thirteen words." Count those words.',
    parts: [
      "That phrase contains 12 words — and it just defined a specific number. But by definition, that number cannot be defined in fewer than 13 words. Contradiction. G.H. Hardy told this to Bertrand Russell, who used it to develop the theory of types.",
      "The paradox exposes how \"definability\" is slippery. Any system that tries to talk about what it can and cannot describe runs into self-referential trouble. It's related to Gödel and to the limits of computation.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Logic Paradoxes',
    hook: 'Curry\'s Paradox: "If this sentence is true, then Santa Claus exists." Logic says Santa exists.',
    parts: [
      "Curry's Paradox: let S = \"If S is true, then P\" for any claim P. Assume S is true — then by S's content, P is true. So S being true implies P. That's exactly what S says — so S is true. Therefore P is true. For ANY P.",
      "This means with self-referential conditionals you can prove literally anything — unicorns exist, 2+2=5, the moon is cheese. The only fixes require restricting how conditionals interact with self-reference, which restructures all of logic.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Logic Paradoxes',
    hook: "The unexpected hanging: a judge's logical promise made execution impossible — or so the prisoner thought.",
    parts: [
      "A judge sentences a prisoner: \"You will be hanged next week on a day you cannot predict in advance.\" The prisoner reasons: it can't be Friday — if we reach Thursday night, I'd know. Can't be Thursday then either. By induction: no day works. He relaxes.",
      "On Wednesday morning, the guards come. The prisoner is genuinely surprised. The judge kept the promise perfectly. The prisoner's logic was flawless — and completely wrong. Philosophers have argued about why for 80 years.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Logic Paradoxes',
    hook: "Epimenides was a Cretan who said \"All Cretans are liars.\" Ancient logic never recovered.",
    parts: [
      "The Epimenides Paradox (6th century BC): if Epimenides is telling the truth, all Cretans are liars — including him, making his statement a lie. If he's lying, then not all Cretans are liars — but that doesn't tell us whether he specifically is honest.",
      "Unlike the pure Liar Paradox, this one doesn't generate a clean contradiction — but it's deeply unstable. Paul quotes it in the Bible (Titus 1:12) without noting the paradox. It inspired Russell, Gödel, and Tarski to rebuild logic on more careful foundations about self-reference.",
    ],
  },
  // ── Game Theory ───────────────────────────────────────────────────────────
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Game Theory',
    hook: "Two strangers who have never met keep making the same terrible decision — and it is completely rational",
    parts: [
      "The Prisoner's Dilemma: two suspects can't communicate. Betray or stay silent? Here's why rational people always betray each other even when cooperation gives the better outcome.",
      "Stay silent: both get 1 year. One betrays: betrayer goes free, loyal one gets 3 years. Both betray: 2 years each. Betrayal is the dominant strategy regardless of what the other does.",
      "This explains cartels collapsing, arms races, and companies polluting. Rational self-interest destroys optimal collective outcomes. The only fix is repeated games, reputation, and enforcement.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Game Theory',
    hook: "The pirate treasure problem: 5 pirates, one vote, and the greediest pirate takes almost everything.",
    parts: [
      "5 perfectly rational pirates rank themselves 1-5. Pirate 1 proposes how to split 100 gold coins. If 50%+ agree, the split stands; otherwise Pirate 1 is thrown overboard and Pirate 2 proposes. What does Pirate 1 offer?",
      "Pirate 1 offers: 98 coins for themselves, 0 to Pirate 2, 1 to Pirate 3, 0 to Pirate 4, 1 to Pirate 5. Pirates 3 and 5 vote yes — they get 1 coin, but if Pirate 1 dies, Pirate 2 proposes and they might get 0.",
      "The greediest pirate survives AND keeps almost all the gold. Backward induction — reasoning from the last step to the first — always produces counterintuitive results in perfectly rational agents.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Game Theory',
    hook: 'Everyone picked the same coffee shop. Nobody coordinated. Nobody even talked.',
    parts: [
      "Schelling's Focal Points: Thomas Schelling asked strangers \"Where would you meet someone in NYC tomorrow with no prior coordination?\" Most said Grand Central Station, noon. No communication — just shared culture creating a \"natural\" answer.",
      "These focal points (Schelling points) explain how people coordinate without talking. Language, currencies, borders, and social norms are all Schelling points — arbitrary conventions that became powerful because everyone expected everyone else to follow them.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Game Theory',
    hook: "The Centipede Game: two players could earn $100 together — but rational play stops them at $1.",
    parts: [
      "Two players alternate: pass or take. If you take, you grab a slightly larger share and the game ends. If both keep passing, the pot grows to $100. Backward induction says player 1 should take immediately on move 1 — earning $1.",
      "Why? If we reach the last move, that player takes. So the previous player should take first. And so on back to move 1. Every experiment shows real people cooperate far longer than theory predicts — because humans aren't purely rational backward inducers.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Game Theory',
    hook: "The Tragedy of the Commons: when something belongs to everyone, everyone destroys it.",
    parts: [
      "A shared pasture: each herder benefits fully from adding one more cow but shares the cost of overgrazing with everyone. The rational move for each individual destroys the commons. Fisheries, aquifers, clean air — the pattern repeats.",
      "Garrett Hardin called it inevitable. Elinor Ostrom won the Nobel Prize showing communities DO solve it — through local rules, monitoring, and graduated sanctions. The tragedy isn't inevitable; it's a design problem. She's the only woman to win the Economics Nobel solo.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Game Theory',
    hook: "Braess's Paradox: adding a new road made every driver's commute longer.",
    parts: [
      "Stuttgart, 1969: traffic engineers added a new road to ease congestion. Every driver rationally chose the new \"faster\" route. Result: everyone's travel time increased. The road made traffic worse.",
      "This happens because selfish routing ignores network effects. Adding capacity can shift equilibria disastrously. New York removed a road (42nd St) and traffic improved. Seoul removed an urban highway — commutes got faster and they got a river park.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Game Theory',
    hook: "The Dollar Auction: bidding $1 for a dollar bill, people routinely pay $5 to win it.",
    parts: [
      "The Dollar Auction (Shubik, 1971): auction a $1 bill. Highest bidder wins it; second-highest bidder ALSO pays their bid but gets nothing. Both bidders keep raising to avoid being the \"loser\" who pays for nothing.",
      "Experiments routinely end with the dollar selling for $3-$20. Rational escalation traps both players. This models arms races, patent wars, and overpaying in acquisitions. Once sunk costs are on the table, logic evaporates.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Game Theory',
    hook: 'Cooperation collapsed in WWI trenches — until it didn\'t. What changed?',
    parts: [
      "Robert Axelrod studied WWI trench warfare: opposing units developed live-and-let-live systems — not shooting at mealtimes, deliberately missing. Pure cooperation between enemies. Against orders.",
      "Iterated Prisoner's Dilemma explains it. In one-shot games, defect. In repeated games with the same opponent, Tit-for-Tat beats everything: cooperate first, then mirror whatever the other player did last. Reputation and repetition make cooperation rational.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Game Theory',
    hook: "Nash Equilibrium: the stable point where no player wants to change — even if it's terrible for everyone.",
    parts: [
      "John Nash (1950): a Nash Equilibrium is a set of strategies where no player can improve their outcome by changing their strategy alone, given everyone else's choices. It's not optimal — it's just stable.",
      "The Prisoner's Dilemma's Nash Equilibrium is mutual betrayal — stable but worse than mutual cooperation. Traffic jams, nuclear deterrence, and price wars are all Nash Equilibria. Stability and optimality are completely different things.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Game Theory',
    hook: "The Volunteer's Dilemma: someone needs to act. Everyone waits for someone else.",
    parts: [
      "If a public good requires one person to sacrifice — report a crime, blow the whistle, stop a fight — everyone benefits if anyone acts, but the actor bears the cost alone. The rational move: wait and hope someone else volunteers.",
      "Bystander effect is this paradox in action. The more witnesses to an emergency, the less likely any individual helps — each assumes someone else will. The effect is real and devastatingly documented. Kitty Genovese became infamous for it, though the original media account was partly myth.",
    ],
  },
  // ── Moral Dilemmas ────────────────────────────────────────────────────────
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Moral Dilemmas',
    hook: 'You can save five lives by killing one. Your hand is on the lever. What do you do?',
    parts: [
      "The Trolley Problem (Philippa Foot, 1967): a runaway trolley heads toward five people. You can pull a lever to divert it onto a side track — where it will kill one person. Most people pull the lever. 5 lives for 1 seems like clear math.",
      "Now: same trolley, same five people. But you're on a bridge with a large man next to you. Pushing him off would stop the trolley and save five. Most people refuse — even though the arithmetic is identical.",
      "Same outcome, different moral intuition. We feel differently about using someone as a means versus redirecting existing harm. Neither consequentialism nor deontology fully explains our actual intuitions. This thought experiment launched a thousand philosophy careers.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Moral Dilemmas',
    hook: "Your self-driving car must choose: swerve and kill the driver, or stay straight and kill five pedestrians.",
    parts: [
      "The Trolley Problem goes corporate: MIT's Moral Machine project asked 40 million people across 233 countries to decide how autonomous vehicles should be programmed to handle unavoidable accidents.",
      "Results: people prefer saving more lives, saving the young over the old, saving humans over pets. But they differ dramatically across cultures — Eastern countries weight pedestrians differently than Western ones. No universal answer exists. Car companies had to choose anyway.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Moral Dilemmas',
    hook: "The violinist problem: you wake up, surgically attached to a famous musician who will die if you disconnect.",
    parts: [
      "Judith Jarvis Thomson's thought experiment (1971): a famous violinist needs your kidneys for 9 months or he dies. You were kidnapped and attached without consent. Do you have a moral obligation to stay connected?",
      "She used this to argue about abortion rights — even granting that a fetus is a person, does another person's right to life automatically override your right to bodily autonomy? The thought experiment separates \"personhood\" from \"right to use someone's body.\" Philosophers have debated it for 50 years.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Moral Dilemmas',
    hook: "The Experience Machine: you can live in a perfect simulation of happiness forever. Do you plug in?",
    parts: [
      "Robert Nozick's Experience Machine (1974): a machine can give you any experience — success, love, pleasure — indistinguishable from reality. You'd never know you were inside. Would you plug in permanently?",
      "Most people say no. This is a problem for pure hedonism — if pleasure is all that matters, you should plug in. Our refusal reveals we care about actually doing things, actually being certain kinds of people, actually connecting with reality. Pleasure alone isn't what we value.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Moral Dilemmas',
    hook: "The Repugnant Conclusion: a world of billions of barely-worth-living lives is morally better than our world.",
    parts: [
      "Derek Parfit's Repugnant Conclusion (1984): if total welfare is what matters morally, a world with 100 billion people living barely-worth-living lives has MORE total welfare than a world with 1 billion people living wonderful lives.",
      "So we're morally obligated to maximize population until everyone is just barely above misery. Nearly everyone finds this monstrous — but it follows logically from total utilitarianism. Parfit spent his career trying to find a moral framework that avoided it. He died without a solution he was satisfied with.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Moral Dilemmas',
    hook: "Heinz steals medicine to save his dying wife. Is he wrong?",
    parts: [
      "Kohlberg's Heinz Dilemma: a druggist overcharges for medicine only he can make. Heinz cannot afford it and his wife will die without it. He breaks in and steals the drug. Was he right?",
      "Kohlberg used this to map moral development across six stages — from \"wrong because he'll be punished\" to \"right because human life overrides property.\" Most adults never reach stage 6. The dilemma reveals that moral reasoning, not just moral conclusions, matures over a lifetime.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Moral Dilemmas',
    hook: "The Non-Identity Problem: future people who wouldn't exist without your \"bad\" decision can't be harmed by it.",
    parts: [
      "Parfit's Non-Identity Problem: a woman is advised to wait 3 months before conceiving — her child will be healthier. She conceives now. The child is born with a preventable condition but has a life worth living.",
      "Was she wrong? The child she'd have had later would be a DIFFERENT person. This particular child can't say \"I'd have been better off\" because if she'd waited, he wouldn't exist. You can't harm someone by bringing them into a life worth living. So what exactly is the moral objection? Nobody has a clean answer.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Moral Dilemmas',
    hook: "You can torture one terrorist to stop a bomb. Every moral framework breaks on this case.",
    parts: [
      "The Ticking Time Bomb scenario: a captured terrorist knows where a bomb will kill thousands in hours. Torture is illegal and immoral — but abstaining kills thousands. Is there a right answer?",
      "Consequentialists say torture. Deontologists say never. Virtue ethicists ask what a good person would be, not just do. The scenario is almost certainly unrealistic in real intelligence work — but it's been used to justify actual torture programs. Thought experiments have real consequences when politicians take them literally.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Moral Dilemmas',
    hook: "The Transplant Problem: surgeons kill a healthy patient to save five. Same math as the trolley, totally different verdict.",
    parts: [
      "A surgeon has five patients dying without organ transplants and one healthy patient whose organs could save all five. Should the surgeon kill the healthy patient? Everyone says no — it's monstrous.",
      "But the arithmetic is identical to the trolley lever. The Doctrine of Double Effect explains the difference: it's permissible to cause harm as a side effect of a good result, but not to cause harm AS A MEANS to a good result. The surgeon uses the patient as a tool. The lever-puller redirects existing danger.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Moral Dilemmas',
    hook: "Peter Singer's Shallow Pond: you'd ruin your suit to save a drowning child. Why won't you save one in Africa?",
    parts: [
      "Peter Singer's argument (1972): if you passed a drowning child in a shallow pond, you'd ruin your suit to save them without hesitation. Letting a child die of a preventable disease in Africa is morally equivalent — distance is morally irrelevant.",
      "Therefore, you're morally obligated to donate until the marginal utility of your giving equals the marginal utility of what you keep. Most people find this conclusion demanding to the point of impossibility. Singer accepts it. The argument has no obvious flaw — but most people find its demands intolerable.",
    ],
  },
  // ── Decision Theory ───────────────────────────────────────────────────────
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Decision Theory',
    hook: "Newcomb's Problem: a perfect predictor has already decided. Do you take one box or two?",
    parts: [
      "Newcomb's Problem (1960): a being with a perfect prediction record presents two boxes. Box A is transparent: $1,000. Box B is opaque: $1,000,000 if the being predicted you'd take only Box B, empty if it predicted you'd take both. The prediction is sealed. What do you take?",
      "Evidential decision theory: take only Box B. One-boxers almost always get $1M. Your choice is evidence about which world you're in.",
      "Causal decision theory: take both. The prediction is already made — your choice can't causally affect what's in the box. Taking both dominates. One of the deepest splits in philosophy of decision. Brilliant people have defended both positions for 60 years.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Decision Theory',
    hook: "The Allais Paradox proved that humans don't follow expected utility theory — and nobody could argue.",
    parts: [
      "Maurice Allais (1953) showed Nobel laureates violating expected utility theory. Choose: A) $1M guaranteed, or B) 89% chance of $1M, 10% chance of $5M, 1% chance of nothing. Most pick A. Then: C) 11% chance of $1M vs D) 10% chance of $5M. Most pick D.",
      "These choices are mathematically inconsistent under expected utility theory. The same people switched preferences depending on framing. Allais presented this at a Paris conference — Samuelson and Savage initially chose inconsistently themselves, then couldn't defend it. The foundations of rational choice cracked.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Decision Theory',
    hook: "Pascal's Wager: even a tiny chance of infinite reward means you should believe in God. Does the math work?",
    parts: [
      "Pascal's Wager (1670): if God exists and you believe, infinite reward. If God exists and you don't believe, infinite punishment. If God doesn't exist, small loss either way. Expected value of belief = infinity. Therefore: believe.",
      "Objections: Which God? There are thousands of religions with mutually exclusive infinite promises. Betting on the wrong one might mean infinite punishment regardless. Plus: can you choose to believe based on expected payoff? Genuine belief isn't a decision you can make by calculating. Pascal's Wager may be self-defeating.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Decision Theory',
    hook: "The St. Petersburg Paradox: a game with infinite expected value that nobody would pay more than $20 to play.",
    parts: [
      "Flip a coin repeatedly. Heads on flip 1: win $2. Flip 2: win $4. Flip 3: $8. The payout doubles each time. Expected value = 1/2×$2 + 1/4×$4 + 1/8×$8 + ... = $1 + $1 + $1 + ... = infinity.",
      "You should pay ANY finite amount to play. But nobody would pay $1,000. Bernoulli's fix (1738): people maximize expected UTILITY, not expected money — and utility of wealth grows logarithmically. This launched utility theory and planted the seeds for all of behavioral economics.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Decision Theory',
    hook: "Two envelopes, one has twice the money. Switch or stay? Mathematics says switch — forever.",
    parts: [
      "Two envelopes: one has twice the money of the other. You pick one and peek inside: $100. The other has either $50 or $200. Expected value of switching = (1/2)×$50 + (1/2)×$200 = $125 > $100. Switch.",
      "But after switching, the same logic applies — switch again! You should switch forever. The paradox: the calculation is wrong because you're using the observed value while treating the other amount as simultaneously $50 and $200 — but they can't both be true at once. Conditional probability has a razor edge.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Decision Theory',
    hook: "Buridan's Ass: a perfectly rational donkey starves to death equidistant between two identical haystacks.",
    parts: [
      "Buridan's Ass (14th century): a donkey is exactly halfway between two identical haystacks. Having no reason to prefer one over the other, a perfectly rational agent cannot choose. The donkey starves.",
      "This satirizes pure rationalism — if reason alone governs action, symmetric situations paralyze you. Real decisions often require arbitrary tie-breaking. Humans solve this with randomness, habit, and emotion. A truly rational agent might need a built-in randomization rule — which itself requires a prior choice.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Decision Theory',
    hook: "The Doomsday Argument: you are probably one of the last humans who will ever live.",
    parts: [
      "Brandon Carter's Doomsday Argument: treat yourself as a random sample from all humans who will ever live. ~100 billion humans have lived so far. If humanity survives for millions more years with trillions of descendants, you'd be in the earliest 0.00001% — extraordinarily unlikely.",
      "More probably, you're near the middle of human history, suggesting humanity ends relatively soon. Many serious philosophers and statisticians take this argument at face value. Counter-arguments exist but none is universally accepted. The math is simple; the horror is in what it implies.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Decision Theory',
    hook: "Precommitment: Ulysses had himself tied to the mast. It was the most rational thing he ever did.",
    parts: [
      "Ulysses wanted to hear the Sirens' song — lethal to anyone who could act on it. Solution: order his crew to tie him to the mast and ignore his commands until they passed. A rational agent deliberately constrained their own future rationality to achieve a better outcome.",
      "Precommitment is rational self-binding: pension auto-enrollment, Ulysses contracts in psychiatry, constitutions that are hard to amend. Your current self limits your future self's choices — because you know your future self will make worse decisions under certain conditions. Rationality sometimes means defeating your own future rationality.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Decision Theory',
    hook: "Kavka's Toxin: you can earn $1 million just by genuinely intending to drink poison tomorrow — no drinking required.",
    parts: [
      "Gregory Kavka's Toxin Puzzle (1983): a billionaire offers $1M tonight if you genuinely intend to drink a harmless-but-unpleasant toxin tomorrow morning. The money arrives before you drink. You're free not to drink after receiving it.",
      "Can you form the intention? If you're rational, you know you won't drink once the money is in your account — there's no reason to. But then you can't form a genuine intention now. Rational agents literally cannot commit to future irrationality — which costs them real money today.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Decision Theory',
    hook: "The Sure-Thing Principle: what seems like a logical axiom of rationality produces absurd results.",
    parts: [
      "Savage's Sure-Thing Principle: if you prefer X to Y knowing the coin landed heads, AND prefer X to Y knowing it landed tails, you should prefer X to Y before seeing the flip. Sounds obvious.",
      "But experiments show humans violate it constantly. In the Prisoner's Dilemma, many people cooperate if told their partner cooperated, cooperate if told their partner defected — but defect when they don't know. A logical certainty gets violated by uncertainty. Our brains aren't calculating expected values; they're doing something else entirely.",
    ],
  },
  // ── Philosophy of Mind ────────────────────────────────────────────────────
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Philosophy of Mind',
    hook: "Mary knows everything about color — but she's never seen red. What happens when the lights come on?",
    parts: [
      "Frank Jackson's Mary's Room (1982): Mary is a brilliant scientist who knows every physical fact about color — wavelengths, neural responses, everything. But she's lived her whole life in a black-and-white room. One day she sees red for the first time.",
      "Does she learn something new? If yes — then physical facts don't capture all facts. There's something extra: what it's like to see red. This is the \"qualia\" problem. If no — then our intuition that experience adds something is wrong. The debate cuts to the heart of consciousness and has no resolution.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Philosophy of Mind',
    hook: "Philosophical Zombies: a being physically identical to you, but with no inner experience. Is this even coherent?",
    parts: [
      "David Chalmers' Philosophical Zombie (1996): imagine a being molecule-for-molecule identical to you, behaving exactly as you do — but with no subjective experience. No pain \"feels\" like anything. No color looks like anything. Just darkness inside.",
      "If P-zombies are conceivable, then consciousness isn't determined by physical facts alone — there's an extra ingredient. This is the \"hard problem of consciousness.\" Daniel Dennett says zombies are inconceivable; Chalmers says they reveal something physical science cannot explain. Neither has convinced the other.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Philosophy of Mind',
    hook: "The Chinese Room: a man follows translation rules and speaks Chinese perfectly — but understands nothing.",
    parts: [
      "John Searle's Chinese Room (1980): a man sits in a room with a rulebook for manipulating Chinese symbols. Native speakers pass in Chinese; he passes back correct Chinese responses. From outside, he seems to understand Chinese. He understands none of it.",
      "Searle's point: syntax (symbol manipulation) is not semantics (meaning). A computer passing the Turing Test might be doing exactly this — no understanding, just symbol shuffling. Strong AI advocates counter: the system as a whole understands, even if no part does. The debate has shaped AI ethics for 40 years.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Philosophy of Mind',
    hook: "The Ship of Theseus has every plank replaced. Is it still the same ship?",
    parts: [
      "The Ship of Theseus: over time every plank is replaced as it rots. No original material remains. Is it still the same ship? Now: someone collects all the original planks and reassembles them. Which one is the Ship of Theseus?",
      "Hobbes added the reassembly problem to make it harder. The puzzle applies to you — most of your atoms are replaced over years. What makes you the same person who existed a decade ago? Memory? Psychological continuity? Physical continuity? There's no consensus. Parfit argued personal identity might not even be what matters.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Philosophy of Mind',
    hook: "Teleportation kills you every time — and nobody would notice, including you.",
    parts: [
      "If a teleporter disassembles you atom by atom and reassembles you elsewhere, are you the same person? Or did the original person die and a perfect copy step out? If it's a copy, every teleportation is murder and resurrection of a new person with false memories.",
      "Derek Parfit's conclusion: if psychological continuity is what matters, the copy is \"you\" in every meaningful sense. If physical continuity matters, you died. We have no way to tell from the inside. And that uncertainty may be permanently unresolvable.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Philosophy of Mind',
    hook: "What is it like to be a bat? Probably nothing like what you imagine — and that's the whole point.",
    parts: [
      "Thomas Nagel's 1974 paper: bats navigate via echolocation — a form of perception utterly foreign to us. We can know every physical fact about bat neurology. But can we know what it's LIKE to be a bat?",
      "Nagel argued no. Subjective experience has a perspective — \"what it's like\" — that objective science cannot capture. This is not mysticism; it's a structural observation about the limits of third-person description. The paper became the most cited philosophy paper of its era.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Philosophy of Mind',
    hook: "The Brain in a Vat: how do you know you're not one right now?",
    parts: [
      "Descartes' evil demon modernized: your brain is in a vat, connected to a computer simulating all your experiences. Every sensory input, every memory — all fabricated. How would you know? What evidence could distinguish this from \"real\" reality?",
      "Hilary Putnam argued the scenario is self-refuting: if you're a brain in a vat, the word \"vat\" in your language refers to simulated vats, not real ones — so \"I'm a brain in a vat\" is false even if you are one. The simulation hypothesis has the same structure, and the same problem.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Philosophy of Mind',
    hook: "Split-brain surgery severs the corpus callosum — and may create two people in one body.",
    parts: [
      "Corpus callosotomy (severing the connection between brain hemispheres) treats severe epilepsy. The result: two semi-independent minds. Left hand literally doesn't know what right hand is doing. One hemisphere can hold beliefs the other rejects.",
      "Roger Sperry won the Nobel Prize for studying these patients. The implications for personal identity are profound: if a single brain can house two minds, what makes you one unified self? Is \"you\" a story your brain tells after the fact? Many neuroscientists now think so.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Philosophy of Mind',
    hook: "Dennett's Multiple Drafts: your experience of \"now\" is a retrospective edit, not a live broadcast.",
    parts: [
      "Daniel Dennett's Multiple Drafts model: there is no single place in the brain where consciousness \"happens.\" Multiple parallel processes create competing drafts of experience. What feels like unified \"now\" is a narrative constructed after the fact.",
      "Evidence: visual processing takes ~200ms, but you perceive events as simultaneous. In experiments, the order you perceive events can be reversed depending on what happens AFTER them. Your sense of continuous experience is a convincing illusion — a post-hoc story your brain tells about itself.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Philosophy of Mind',
    hook: "The Turing Test was passed in 2014 — and almost nobody cared. Here's why it didn't matter.",
    parts: [
      "Alan Turing's 1950 imitation game: if a machine can converse indistinguishably from a human for 5 minutes, it should be considered intelligent. In 2014, a chatbot named \"Eugene Goostman\" fooled 33% of judges — enough to claim the test was passed.",
      "Reaction: largely dismissive. The test was criticized as measuring deception, not intelligence. A clever deflection script isn't understanding. Turing's deeper question — can machines think? — remains completely unanswered. We improved the benchmark without answering the question.",
    ],
  },
  // ── Probability Paradoxes ─────────────────────────────────────────────────
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Probability Paradoxes',
    hook: "Switch the door. You were wrong. Here's the math that drove mathematicians insane.",
    parts: [
      "The Monty Hall Problem: three doors — one car, two goats. You pick door 1. Monty (who knows what's behind each door) opens door 3 to reveal a goat. Should you switch to door 2?",
      "Yes. Switching wins 2/3 of the time. Staying wins 1/3. Your initial pick has 1/3 chance of being right. Monty's action concentrates the remaining 2/3 probability on the other closed door. When Marilyn vos Savant published this in 1990, thousands of PhDs wrote in to say she was wrong. She wasn't.",
      "The key: Monty doesn't open a door randomly — he always reveals a goat. His action is an informed intervention. That information changes the probability. Nearly everyone gets this wrong on first encounter. Including professional statisticians.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Probability Paradoxes',
    hook: "The Sleeping Beauty Problem: a coin flip, a sleep, and philosophers who can't agree on basic probability.",
    parts: [
      "Sleeping Beauty is put to sleep. A fair coin is flipped. Heads: she's woken once (Monday). Tails: she's woken twice (Monday and Tuesday), with a memory-erasing drug between. When she wakes, what probability should she assign to heads?",
      "Halfers say 1/2: the coin is fair, and waking up gives no new information about the flip. Thirders say 1/3: there are three equally likely awakening-states and only one is heads. Both positions have brilliant defenders. After 25 years of papers: no resolution.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Probability Paradoxes',
    hook: "Simpson's Paradox: a treatment works in every subgroup — and fails overall. This happens in real medicine.",
    parts: [
      "Simpson's Paradox: a trend appears in multiple groups of data but disappears (or reverses) when the groups are combined. A hospital shows Drug A outperforming Drug B for mild cases AND severe cases — but Drug B outperforms Drug A overall.",
      "This happens when groups have different sizes and are combined without weighting. Real examples: UC Berkeley admissions showed apparent gender bias that reversed when departments were examined individually. A kidney stone treatment study famously reversed. Never analyze aggregated data without checking subgroups.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Probability Paradoxes',
    hook: "The Birthday Paradox: in a group of 23 people, there's a 50% chance two share a birthday.",
    parts: [
      "The Birthday Problem: how many people do you need in a room before there's a >50% chance two share a birthday? Answer: 23. With 70 people, the probability exceeds 99.9%. Almost nobody guesses below 100 on first encounter.",
      "The math: you're counting PAIRS, not people. 23 people = 253 pairs. Each pair has a ~1/365 chance of matching. The probability that NO pair matches is roughly 50%. This underlies hash collision risks in cryptography. Systems fail because programmers trust their birthday-problem intuition.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Probability Paradoxes',
    hook: "The Boy or Girl Paradox: same setup, different information, completely different probability.",
    parts: [
      "Version 1: \"I have two children and at least one is a boy.\" P(both boys) = 1/3. Three equally likely cases: BG, GB, BB. Only one is BB.",
      "Version 2: \"I have two children and the OLDER one is a boy.\" P(both boys) = 1/2. Now only two cases: BB or BG. The answer changes based on HOW you learned there's a boy — not just what you learned. Same setup, different information, different probability. This trips up statisticians regularly.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Probability Paradoxes',
    hook: "The Prosecutor's Fallacy sent innocent people to prison — using correct statistics.",
    parts: [
      "The Prosecutor's Fallacy: confusing P(evidence | innocent) with P(innocent | evidence). In court: \"only 1 in a million people have this DNA profile — so there's a 1 in a million chance the defendant is innocent.\" Sounds compelling. It's wrong.",
      "The correct question is: given this evidence AND all other evidence, how probable is guilt? If you're testing a million people, one in a million means roughly one innocent match. Sally Clark was convicted of murdering her sons partly on this statistical error. She was innocent. The UK subsequently reviewed hundreds of cases.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Probability Paradoxes',
    hook: "Gambler's Fallacy: after 10 heads in a row, tails is 'due.' The coin has no memory.",
    parts: [
      "The Gambler's Fallacy: believing past random events affect future independent ones. After 10 coin flips all landing heads, people strongly expect tails — because the sequence \"feels\" unbalanced. The coin doesn't feel anything. Each flip is 50/50 regardless of history.",
      "The inverse — Hot Hand Fallacy — is believing a streak will continue. Both are wrong for independent events. But for humans (free throw shooting, creative output), streaks CAN be real. Distinguishing the cases requires the statistics most people never learn.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Probability Paradoxes',
    hook: "Bertrand's Box Paradox: you draw a gold coin from a box. Probability the other coin is also gold? Not 50%.",
    parts: [
      "Three boxes: GG (two gold), GS (one gold, one silver), SS (two silver). You randomly pick a box and draw a coin — it's gold. What's the probability the other coin in that box is also gold?",
      "Intuition says 1/2: you're either in GG or GS, 50-50. Wrong: 2/3. There are three gold coins total — two in GG, one in GS. Two of those three came from the GG box. Conditional probability is deeply counterintuitive. Bertrand published this in 1889; people still get it wrong.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Probability Paradoxes',
    hook: "Base Rate Neglect: a disease affects 1 in 1000 people. A 99%-accurate test says you have it. You probably don't.",
    parts: [
      "A disease affects 1 in 1,000 people. A test is 99% accurate (1% false positive rate). You test positive. What's the probability you actually have the disease?",
      "Bayes' Theorem: test 100,000 people. 100 have the disease; 99 test positive. 99,900 don't; 999 test positive (false positives). Total positives: 1,098. Of those, 99 are truly sick — about 9% chance you're actually ill. A 99%-accurate positive is wrong 91% of the time. Studies show most doctors get this wrong without explicit training.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Probability Paradoxes',
    hook: "Hempel's Ravens: observing a red apple is logical evidence that all ravens are black.",
    parts: [
      "Carl Hempel's Raven Paradox (1945): \"All ravens are black\" is logically equivalent to \"All non-black things are non-ravens.\" So observing any non-black non-raven — a red apple, a white shoe — is technically evidence that all ravens are black.",
      "This isn't a trick. It follows from the logic of confirmation and contraposition. But observing red apples feels completely irrelevant to raven color. Either our logic of confirmation is wrong, or relevance intuitions mislead us. Philosophers took both positions. The paradox shaped modern philosophy of science.",
    ],
  },
  // ── Infinity & Math ───────────────────────────────────────────────────────
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Infinity & Math',
    hook: "Banach-Tarski: you can cut a sphere into a finite number of pieces and reassemble two identical spheres.",
    parts: [
      "The Banach-Tarski Paradox (1924): using the Axiom of Choice, a solid ball can be decomposed into a finite number of pieces and reassembled — using only rotations and translations — into two balls identical in size to the original. Doubling matter from nothing.",
      "This is a genuine mathematical theorem. The \"pieces\" are non-measurable sets that can't exist in physical space, but are perfectly valid mathematical objects. The paradox shows that infinity is so strange it breaks our intuitions about volume, matter, and what \"cutting\" means.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Infinity & Math',
    hook: "Cantor proved some infinities are bigger than others — and mathematicians tried to have him committed.",
    parts: [
      "Georg Cantor (1874): the infinity of real numbers is strictly larger than the infinity of natural numbers. He proved it with the diagonal argument: any supposed list of all real numbers can be used to construct a real number not on the list, by changing the nth digit of the nth entry.",
      "Cantor's peers attacked him viciously. Poincaré called his work a \"disease.\" Cantor suffered severe depression and died in a psychiatric institution. His work is now foundational. There are infinitely many different sizes of infinity. The real numbers are at least ℵ₁ — and Gödel proved we may never know exactly which.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Infinity & Math',
    hook: "Hilbert's Hotel is full — but there's always room for one more. Or a million more. Or infinitely more.",
    parts: [
      "Hilbert's Hotel: a hotel with infinitely many rooms, all occupied. New guest arrives. Solution: move guest in room 1 to room 2, room 2 to room 3, and so on. Room 1 is now free. The hotel is still full AND has a vacancy.",
      "An infinite bus with infinite passengers arrives. Solution: move each current guest to double their room number. All odd-numbered rooms empty out — infinite vacancies for infinite guests. Infinity + 1 = Infinity. Infinity × 2 = Infinity. This isn't wordplay; it's how cardinal arithmetic actually works.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Infinity & Math',
    hook: "0.999... = 1. This is not approximately true. It is exactly, provably true — and it drives people insane.",
    parts: [
      "0.999... (infinitely repeating 9s) is exactly equal to 1. Proof 1: 1/3 = 0.333..., multiply both sides by 3: 1 = 0.999... Proof 2: x = 0.999..., then 10x = 9.999..., so 10x - x = 9, giving 9x = 9, therefore x = 1.",
      "The intuitive objection: \"there must be a tiny gap.\" There is no gap. In the real number system, two numbers are equal if their difference is zero. The difference is 0.000...001 with infinite zeros — which is 0. The difficulty is that our intuition treats infinity as a large finite number. It isn't.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Infinity & Math',
    hook: "Thomson's Lamp: switch it on and off infinitely many times in 2 minutes. Is it on or off?",
    parts: [
      "Thomson's Lamp (1954): a lamp is switched on after 1 minute, off after 1/2 minute more, on after 1/4 minute more — each interval half the previous. After exactly 2 minutes, infinite switches have occurred. Is the lamp on or off?",
      "Mathematics says the series converges: the task is completed in finite time. But the final state is undefined — there is no \"last\" switch. The lamp is neither on nor off in any consistent sense. This shows that infinite tasks completing in finite time don't always produce well-defined endpoints, even in pure mathematics.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Infinity & Math',
    hook: "Gabriel's Horn: a shape with finite volume but infinite surface area. You can fill it with paint but not paint it.",
    parts: [
      "Gabriel's Horn (Torricelli, 1641): rotate y = 1/x around the x-axis for x >= 1. Volume = pi (finite). Surface area = infinite. So you could fill the interior with a finite amount of paint — but you'd need infinite paint to coat the interior surface.",
      "This seems contradictory: if you fill it with paint, doesn't the paint touch the surface? Yes — but the coat approaches zero thickness. In mathematics, an infinitely thin coat on an infinite surface can have finite volume. \"Painting\" requires a minimum coat thickness; filling doesn't. Torricelli called it a \"monstrous shape.\"",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Infinity & Math',
    hook: "The Continuum Hypothesis: a question so hard, math itself can't answer it — in either direction.",
    parts: [
      "Is there an infinity between the counting numbers and the real numbers? Cantor called this the Continuum Hypothesis and couldn't prove it. Gödel proved in 1940 you can't disprove it using standard axioms. Cohen proved in 1963 you can't prove it either.",
      "The Continuum Hypothesis is formally independent of ZFC set theory — the foundations of mathematics. It's not just unproven; it's unprovable either way from our current axioms. We must either add new axioms or accept that some mathematical questions have no answer. This stunned the mathematical world.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Infinity & Math',
    hook: "Skolem's Paradox: a model of set theory where every set is countable — including the 'uncountable' ones.",
    parts: [
      "Thoralf Skolem (1922): the Löwenheim-Skolem theorem guarantees that any consistent set of first-order axioms has a countable model. But ZFC set theory proves the existence of uncountable sets. So there's a model of ZFC where \"uncountable\" sets are actually countable from outside the model.",
      "This isn't a contradiction — countability is relative to what functions are available in your model. But it reveals that mathematical truth is model-relative. What seems like an absolute fact (uncountability) depends on which mathematical universe you're working in. Foundations are stranger than they appear.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Infinity & Math',
    hook: "Grandi's Series: 1 − 1 + 1 − 1 + ... = 1/2. A sum that doesn't converge but still has a \"value.\"",
    parts: [
      "Grandi's Series: 1 - 1 + 1 - 1 + ... Stop at an odd term: 1. Stop at an even term: 0. The series doesn't converge in the standard sense. But Cesàro summation assigns it the value 1/2 — an average of partial sums that is consistent across different summation methods.",
      "Euler confidently used 1/2 for this series. Modern analysis says it diverges. But regularized sums appear naturally in quantum field theory — the Casimir effect (measured in labs) uses techniques where 1 + 2 + 3 + ... = -1/12. Mathematical \"nonsense\" that predicts real physical results.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Infinity & Math',
    hook: "Achilles and the Tortoise: the fastest runner can never catch the slowest — here's the ancient proof.",
    parts: [
      "Zeno's most famous paradox: Achilles gives the tortoise a 100m head start. By the time Achilles reaches where the tortoise was, the tortoise has moved ahead. By the time he reaches that spot, the tortoise has moved again. Always a gap remains.",
      "The mathematical resolution: the infinite series 100 + 10 + 1 + 0.1 + ... converges to a finite number. Achilles catches up at 111.1... meters. But Zeno's deeper question — how can completed infinities exist in physical time? — is still debated in philosophy of physics. Does space actually have infinitely many points?",
    ],
  },
  // ── Political Paradoxes ───────────────────────────────────────────────────
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Political Paradoxes',
    hook: "Arrow's Impossibility Theorem: no voting system can be fair. Mathematically. Provably. Ever.",
    parts: [
      "Kenneth Arrow (1951, Nobel Prize 1972): any ranked voting system with 3+ options either violates one of these conditions: unanimity (if everyone prefers A to B, A wins), independence of irrelevant alternatives (adding a third option shouldn't flip A vs B), or non-dictatorship (one person doesn't always decide).",
      "You cannot have all three. Every voting system — plurality, ranked choice, Borda count — sacrifices at least one. \"The will of the people\" is not a coherent mathematical concept. Electoral systems don't discover preferences; they impose a method for constructing a winner from irreconcilable inputs.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Political Paradoxes',
    hook: "Condorcet's Paradox: voters A, B, C create a preference cycle where everyone beats everyone else.",
    parts: [
      "Three voters: Voter 1 prefers A > B > C. Voter 2 prefers B > C > A. Voter 3 prefers C > A > B. Majority prefers A to B (voters 1, 3). Majority prefers B to C (voters 1, 2). Majority prefers C to A (voters 2, 3). A beats B, B beats C, C beats A. No majority winner exists.",
      "Condorcet's Paradox (1785): majority preferences can be cyclical, like rock-paper-scissors. The order items are voted on determines the outcome. Whoever controls the agenda controls the result. This is used strategically in legislatures constantly — and most voters never realize it.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Political Paradoxes',
    hook: "The Paradox of Tolerance: a tolerant society must be intolerant of intolerance, or it will be destroyed.",
    parts: [
      "Karl Popper (1945): unlimited tolerance must lead to the disappearance of tolerance. If we extend unlimited tolerance even to those who are intolerant, and we are not prepared to defend a tolerant society against the onslaught of the intolerant, the tolerant will be destroyed.",
      "Popper said to first try reason. But when rational argument fails and a movement rejects dialogue, suppressing it becomes necessary to preserve tolerance itself. The paradox has no clean solution: defining \"intolerance\" to suppress requires judgment calls that can themselves become oppressive.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Political Paradoxes',
    hook: "The Paradox of Democracy: voters can rationally choose to eliminate democracy itself.",
    parts: [
      "Democratic paradox: if the majority votes to abolish democracy, that's a democratic decision. Should it be honored? Honoring it destroys democracy. Refusing to honor it also undermines democracy — a majority decision was overturned.",
      "Weimar Germany elected the Nazis. Hamas won Palestinian elections in 2006. Venezuela democratically dismantled its democratic institutions. Constitutions try to protect against this with supermajority requirements and unamendable rights — but those protections can themselves be amended. There's no permanent fix.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Political Paradoxes',
    hook: "The Voter's Paradox: why does any rational person vote? The math says they shouldn't.",
    parts: [
      "The probability that a single vote determines a US presidential election is approximately 1 in 60 million. The cost of voting (time, effort) is real. Expected benefit = probability of being decisive × policy value. For any realistic policy value, the math says: don't vote.",
      "If everyone reasoned this way, nobody would vote and democracy collapses. The paradox reveals a gap between individual rationality and collective rationality. Explanations: expressive value, civic duty, overestimating influence. None fully resolves the math. And yet democracies persist — which is itself puzzling.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Political Paradoxes',
    hook: "Sen's Liberal Paradox: respecting individual freedoms can prevent the socially preferred outcome from being chosen.",
    parts: [
      "Amartya Sen's Liberal Paradox (1970): even with just two people, if each has the right to make certain personal choices, majority voting can become inconsistent. Respecting those personal choices makes the social choice cycle.",
      "Sen proved no social decision process can simultaneously be: minimally liberal (individuals decide on personal matters), Pareto optimal (if everyone prefers X, choose X), and well-defined. Liberalism and majority rule are in formal tension. This won Sen a Nobel Prize and has generated 50 years of debate.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Political Paradoxes',
    hook: "Plato's warning: the people who most want power are least fit to hold it.",
    parts: [
      "In the Republic, Plato argued democracy is self-defeating: it gives equal voice to those without wisdom, flattering demagogues rise by appealing to desires rather than reason, and the pursuit of freedom ends in slavery to passion.",
      "The Platonic critique: those genuinely competent at governance are usually uninterested in the performance of politics. Those who crave power are those for whom power is an end, not a means. \"The penalty that good men pay for indifference to public affairs is to be ruled by evil men.\" Still unresolved.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Political Paradoxes',
    hook: "Gerrymandering's paradox: the party that wins more votes can lose all the seats.",
    parts: [
      "In winner-takes-all districts, a party can win every district by a 51-49 margin and take all seats, while the other party wins nothing despite 49% of votes. Or: pack opponents into a few districts they win 90-10, while winning other districts 52-48.",
      "In the 2012 US House elections, Democrats won more total votes than Republicans nationwide — and won fewer seats. Geographic concentration of voters, not just gerrymandering, creates this effect. The mathematical structure of representation systematically disconnects vote share from power.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Political Paradoxes',
    hook: "The Paradox of the Heap: when does taxation become oppression? Remove one dollar at a time.",
    parts: [
      "Sorites Paradox in politics: no single dollar of taxation is oppressive. But if adding one dollar is never the dollar that makes it oppressive, you can tax 100% and never cross the line. Where does light taxation end and tyranny begin?",
      "Every political boundary faces this: when does protest become riot? When does surveillance become totalitarianism? When does free speech become incitement? The vagueness isn't accidental — these are genuine cases where sharp lines don't exist in reality, and law must impose them artificially.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Political Paradoxes',
    hook: "The Ship of State has every policy replaced. Is it still the same government?",
    parts: [
      "A political Ship of Theseus: if every law, institution, norm, and person in a government is gradually replaced — while the formal structure persists — is it the same government? Post-WWII Japan kept the emperor but transformed every institution. Continuation or new state?",
      "This matters legally: for international treaties, debts, war crimes, constitutional continuity. Russia claimed to be the USSR's legal successor; the Baltic states claimed they were never properly part of it. Identity of states is a practical question with real consequences, not just philosophy.",
    ],
  },
  // ── Economics Paradoxes ───────────────────────────────────────────────────
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Economics Paradoxes',
    hook: "The Diamond-Water Paradox: water is essential to life and nearly free. Diamonds are trivial and pricey.",
    parts: [
      "Adam Smith's Paradox of Value (1776): things with the greatest use-value (water) have little exchange-value. Things with little use-value (diamonds) have enormous exchange-value. Classical economics couldn't explain this for a century.",
      "The Marginalist revolution (Jevons, Menger, Walras, 1870s): value is determined by marginal utility — the value of one MORE unit. Water is so abundant that an extra glass adds little value. Diamonds are so scarce that one more adds great value. Total utility doesn't set price; marginal utility does.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Economics Paradoxes',
    hook: "The Paradox of Thrift: if everyone saves money during a recession, everyone gets poorer.",
    parts: [
      "Keynes' Paradox of Thrift (1936): prudent for an individual to save during hard times. But if everyone saves simultaneously, spending falls, businesses earn less, unemployment rises, and everyone ends up with less savings anyway.",
      "This is a fallacy of composition — individually rational behavior produces collectively irrational outcomes. National income accounting shows saving equals investment only at equilibrium; forced economy-wide saving can reduce the income that generates savings. It justified deficit spending as stimulus and remains controversial.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Economics Paradoxes',
    hook: "Giffen Goods: when prices rise, people buy MORE. The demand curve runs the wrong way.",
    parts: [
      "In standard economics, higher price means less demand. Giffen goods break this. In 19th-century Ireland, as potato prices rose, the poor bought MORE potatoes. Why: potatoes were so cheap and filling that poor families couldn't afford much else. When prices rose, they could afford even less meat — and bought more potatoes to compensate.",
      "Giffen goods require: inferior good, significant share of budget, no close substitutes. Rare in practice — Jensen and Miller (2007) documented genuine Giffen behavior with rice and wheat in rural China. The demand curve bending backward is real, but uncommon enough that standard demand curves usually hold.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Economics Paradoxes',
    hook: "The Market for Lemons: why used car markets are destroyed by information asymmetry.",
    parts: [
      "George Akerlof (1970, Nobel Prize): sellers know whether their car is a lemon; buyers don't. Buyers expect a mix, so they offer an average price. Owners of good cars won't sell at average price — they withdraw. The market fills with lemons. Buyers lower their price. More good cars leave. Market collapses.",
      "This is adverse selection — bad products drive out good. It explains why used car markets are dysfunctional, why health insurance markets need mandates (sick people buy insurance, healthy people drop out, premiums rise, more healthy people drop out), and why credit markets freeze in crises.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Economics Paradoxes',
    hook: "The Cobra Effect: paying to eliminate cobras created a cobra farm.",
    parts: [
      "British colonial India: the government offered a bounty for dead cobras to reduce the population. Entrepreneurs bred cobras to collect bounties. When the program was canceled, breeders released their now-worthless stock. The cobra population ended up LARGER than before.",
      "The Cobra Effect — an incentive that causes the opposite of its intended result. Soviet nail factories paid by weight produced enormous useless nails. Paid by quantity: millions of tiny useless nails. British crime statistics: police reclassified crimes to hit targets. Measuring the wrong thing destroys the right thing.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Economics Paradoxes',
    hook: "Jevons Paradox: making engines more efficient caused England to burn MORE coal, not less.",
    parts: [
      "William Stanley Jevons (1865): steam engines became more efficient. Prediction: England would use less coal. Actual result: coal consumption soared. More efficient engines made coal-powered processes cheaper and more competitive, causing massive expansion in their use.",
      "The Jevons Paradox haunts energy policy today. More fuel-efficient cars cause people to drive more. More efficient LEDs cause people to install more lights. Efficiency gains are partially or fully offset by increased consumption. Technical efficiency alone cannot reduce resource use — it must be paired with price or regulatory constraints.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Economics Paradoxes',
    hook: "The Paradox of Plenty: countries rich in natural resources tend to be poorer and less free.",
    parts: [
      "The Resource Curse: oil-rich nations like Venezuela, Nigeria, and Angola are statistically less economically developed, more authoritarian, and more conflict-prone than resource-poor nations. Norway is the exception; Saudi Arabia, Congo, Libya illustrate the rule.",
      "Mechanisms: resource revenues flow to governments, not markets, creating patronage states. Currency appreciation destroys other industries (Dutch Disease). Elites fight over resource rents rather than building productive institutions. The curse isn't inevitable — Botswana (diamonds) and Norway (oil) escaped it through institutional quality.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Economics Paradoxes',
    hook: "Goodhart's Law: once a measure becomes a target, it ceases to be a good measure.",
    parts: [
      "Charles Goodhart (1975): any observed statistical regularity will tend to collapse once pressure is placed upon it for control purposes. When you make a metric a goal, people optimize the metric — not the underlying thing the metric was measuring.",
      "Wells Fargo: measured branch performance by accounts opened. Employees opened millions of fake accounts. Soviet factories measured by output: output exploded, quality collapsed. US schools measured by test scores: schools taught to the test. The map becomes more important than the territory — and the territory suffers.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Economics Paradoxes',
    hook: "The Ultimatum Game: rational agents should accept a penny. Real humans reject $40.",
    parts: [
      "Ultimatum Game: player 1 gets $100 to split with player 2. Player 2 can accept or reject; rejection means both get nothing. Game theory: player 1 should offer the minimum, player 2 should accept (a penny is better than nothing).",
      "Reality: offers below 20-30% are routinely rejected across cultures. People would rather get nothing than accept what feels unfair — paying real money to punish a stranger. This is universal, though the threshold varies. Homo economicus doesn't exist. Fairness is a real preference that overrides material self-interest.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Economics Paradoxes',
    hook: "The Price of Zero: making something free causes demand to explode beyond all rational predictions.",
    parts: [
      "Dan Ariely's research: people dramatically overvalue free things beyond what rational calculation predicts. Free shipping from Amazon caused far more purchases than $1 shipping. A free Hershey's Kiss was chosen over a premium Lindt truffle for 1 cent.",
      "Zero is not just a very low price — it's a qualitatively different signal that eliminates the psychological pain of paying. Loss aversion means every purchase hurts a little. Free eliminates that hurt entirely. Advertisers, freemium apps, and drug dealers all exploit the irrational power of zero.",
    ],
  },
  // ── Thought Experiments ───────────────────────────────────────────────────
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Thought Experiments',
    hook: "Schrödinger's Cat is simultaneously alive and dead — until you look.",
    parts: [
      "Erwin Schrödinger (1935) designed this to mock the Copenhagen Interpretation. A cat in a box with a quantum device that has 50% chance of triggering poison. Until observed, quantum theory says the cat is in a superposition of alive and dead.",
      "Schrödinger thought this was absurd — proof that quantum mechanics couldn't apply to macroscopic objects. Instead, the thought experiment became the icon of quantum weirdness. The measurement problem — why observation collapses quantum states — remains unsolved. Every interpretation of quantum mechanics handles the cat differently.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Thought Experiments',
    hook: "Maxwell's Demon can violate the Second Law of Thermodynamics — using only information.",
    parts: [
      "James Clerk Maxwell (1867): a tiny demon guards a door between two chambers of gas. It lets fast molecules pass one way and slow molecules the other — sorting hot from cold without doing work. Entropy decreases. The Second Law is violated.",
      "Resolution (Landauer, 1961): the demon must store information about each molecule. When its memory fills and it must erase information, that erasure is irreversible and generates heat — restoring entropy. Information IS physical. Erasing one bit dissipates kT ln2 of energy. This is the deepest link between information theory and thermodynamics.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Thought Experiments',
    hook: "The Grandfather Paradox: travel back in time and kill your grandfather. Now what?",
    parts: [
      "Classic time travel paradox: if you go back and kill your grandfather before your parent is conceived, you were never born. But if you were never born, you couldn't go back in time. If he lived, you were born. Infinite loop.",
      "Solutions proposed by physicists: Novikov Self-Consistency — time travel is possible but only consistent timelines can occur (you fail to kill him, always). Many Worlds — you create a branch timeline, original unaffected. Chronology Protection Conjecture (Hawking) — physics itself prevents time travel to avoid paradoxes. No consensus.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Thought Experiments',
    hook: "Laplace's Demon: a perfect intellect knows every particle and predicts everything forever.",
    parts: [
      "Laplace's Demon (1814): \"An intellect which at a certain moment would know all forces that set nature in motion, and all positions of all items, could calculate the complete past and future of the universe.\" Determinism made explicit.",
      "Killed by three things: quantum mechanics (Heisenberg uncertainty makes knowing all positions impossible in principle), chaos theory (arbitrarily small errors grow exponentially), and Gödel/computability (a demon simulating the universe would need to BE the universe). Determinism might be true and complete prediction still impossible.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Thought Experiments',
    hook: "Leibniz's Question: why is there something rather than nothing?",
    parts: [
      "Gottfried Wilhelm Leibniz asked what many consider the deepest question: why does anything exist? Nothing seems simpler than nothing. If the universe requires an explanation, that explanation also requires one — infinite regress.",
      "Proposed answers: God (but then why does God exist?), brute fact (existence just is), necessity (some kind of existence is logically inevitable), the universe created itself from a quantum vacuum. Stephen Hawking: \"What breathes fire into the equations?\" Nobody knows. The question may be unanswerable — or may be incoherent.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Thought Experiments',
    hook: "The Utility Monster: a being that gets so much happiness from everything that you should give it everything.",
    parts: [
      "Robert Nozick's Utility Monster (1974): imagine a being that gets 1,000 times more utility from everything than any normal person. Under simple utilitarianism (maximize total utility), this monster deserves all resources — and everyone else should starve to feed it.",
      "This is a reductio ad absurdum against naive utilitarian aggregation. The conclusion is grotesque. So either: aggregate utility isn't what matters morally, distribution matters (egalitarianism), or rights exist that can't be traded for aggregate welfare. Nozick used this to argue for libertarian rights-based ethics.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Thought Experiments',
    hook: "The Simulation Argument: at least one of three disturbing things must be true about civilization.",
    parts: [
      "Nick Bostrom (2003): at least one of these is true: (1) virtually all civilizations go extinct before reaching technological maturity, (2) virtually no mature civilizations run ancestor simulations, (3) we are almost certainly living in a computer simulation.",
      "The logic: if civilizations survive and run ancestor simulations, simulated beings vastly outnumber real beings. Randomly picking one conscious being, you're overwhelmingly likely to be simulated. Either something prevents civilizations from reaching that point, they choose not to simulate, or we're in a simulation. Pick your horror.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Thought Experiments',
    hook: "The Fermi Paradox: given billions of stars, where is everybody?",
    parts: [
      "Enrico Fermi (1950), at lunch: the universe is 13.8 billion years old, has hundreds of billions of stars, and is saturated with potentially habitable planets. If life arises commonly, civilizations should be everywhere — some millions of years ahead of us. So where are they?",
      "Proposed answers: The Great Filter (extinction is common — and may be ahead of us), rare Earth (complex life is extraordinarily unlikely), Zoo Hypothesis (they're hiding), Dark Forest (advanced civilizations hide from each other out of fear). The silence is one of the most unnerving facts in science.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Thought Experiments',
    hook: "Rawls' Veil of Ignorance: design a just society not knowing who you'll be in it.",
    parts: [
      "John Rawls' Original Position (1971): imagine designing society from behind a \"veil of ignorance\" — you don't know if you'll be born rich or poor, talented or average, healthy or disabled, majority or minority. What principles would you choose?",
      "Rawls argued you'd choose: basic liberties for everyone, fair equality of opportunity, and the Difference Principle — inequalities are only justified if they benefit the least advantaged members. Behind the veil, you'd hedge against ending up at the bottom. This became the 20th century's most influential argument for egalitarianism.",
    ],
  },
  {
    subject: 'Paradoxes & Dilemmas',
    category: 'Thought Experiments',
    hook: "Theseus, a teleporter, and a nation-state walk into a bar. None of them survive the identity problem.",
    parts: [
      "Personal identity, political identity, and object identity all face the same puzzle: what constitutes sameness over time when components change? A person whose neurons gradually replaced by silicon chips — at what point, if any, do they stop being the original person?",
      "Derek Parfit's answer: personal identity may simply not be what matters. What matters is psychological continuity — memories, personality, beliefs carried forward. Whether that constitutes \"the same person\" is a verbal question. The real question is whether what you value persists. That reframe dissolves the paradox — or sidesteps it entirely.",
    ],
  },
];
