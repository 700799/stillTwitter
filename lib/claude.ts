import Anthropic from '@anthropic-ai/sdk';
import type { OptimizeResult } from '../types';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function optimizeTweet(
  hook: string,
  parts: string[],
  subject: string,
  category: string,
  isThread: boolean,
  partCount: number
): Promise<OptimizeResult> {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 512,
    system: [
      {
        type: 'text',
        text: 'You are a Twitter/X engagement expert. Analyze tweet content and return a JSON object with improvement suggestions. Respond ONLY with valid JSON — no markdown, no code fences, no extra text.',
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages: [
      {
        role: 'user',
        content: `Analyze this Twitter/X content for engagement and provide suggestions.

Subject: ${subject}
Category: ${category}
Hook: ${hook}
Content: ${parts.join('\n\n---\n\n')}
${isThread ? `This is a ${partCount}-part thread.` : 'Single tweet.'}

Return this JSON object (no markdown, just raw JSON):
{
  "score": <integer 1-10>,
  "score_reason": "<one sentence explaining the score>",
  "rewritten_hook": "<improved hook under 120 chars>",
  "hashtags": ["#Tag1", "#Tag2", "#Tag3"],
  "best_time": "<e.g. Tue–Thu, 9–11 AM EST>",
  "tip": "<one specific, actionable improvement>"
}`,
      },
    ],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text.trim() : '{}';
  return JSON.parse(text) as OptimizeResult;
}
