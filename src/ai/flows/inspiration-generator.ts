'use server';

/**
 * @fileOverview Generates a dynamic list of inspirational content.
 *
 * - generateInspiration - A function that returns a list of inspirational articles.
 * - InspirationItemSchema - The schema for a single inspiration item.
 * - InspirationOutputSchema - The schema for the list of inspiration items.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

export const InspirationItemSchema = z.object({
  title: z.string().describe('The compelling title of the article or resource.'),
  source: z.string().describe('The name of the source, like a magazine, blog, or website (e.g., "Medium", "Forge", "Psychology Today").'),
  excerpt: z.string().describe('A short, one-sentence summary or excerpt of the content.'),
  url: z.string().url().describe("A placeholder URL, which should always be '#'."),
  aiHint: z.string().describe('One or two keywords for a relevant background image (e.g., "creative workspace", "zen garden").'),
});

export const InspirationOutputSchema = z.object({
  inspirationFeed: z.array(InspirationItemSchema),
});

export type InspirationOutput = z.infer<typeof InspirationOutputSchema>;

export async function generateInspiration(): Promise<InspirationOutput> {
  return inspirationGeneratorFlow();
}

const prompt = ai.definePrompt({
  name: 'inspirationGeneratorPrompt',
  output: {schema: InspirationOutputSchema},
  prompt: `You are an AI assistant that curates inspirational content for users trying to discover their passion.

Generate a list of 6 fresh, unique, and inspiring articles, blog posts, or book summaries related to topics like self-discovery, finding your passion, starting side projects, creativity, and personal growth.

For each item, provide:
- A compelling and realistic-sounding title.
- A plausible source (e.g., a well-known blog, magazine, or book summary).
- A short, engaging excerpt (one sentence).
- A placeholder URL of '#'.
- An aiHint of one or two keywords for a relevant background image.

Do not repeat content you've generated before. Ensure the list is diverse and covers different angles of the main topic.`,
});

const inspirationGeneratorFlow = ai.defineFlow(
  {
    name: 'inspirationGeneratorFlow',
    outputSchema: InspirationOutputSchema,
  },
  async () => {
    const {output} = await prompt({});
    return output!;
  }
);
