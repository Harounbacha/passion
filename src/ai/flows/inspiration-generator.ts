
'use server';

/**
 * @fileOverview Generates a dynamic list of inspirational content.
 *
 * - generateInspiration - A function that returns a list of inspirational articles.
 */

import {ai} from '@/ai/genkit';
import {
  InspirationOutput,
  InspirationOutputSchema,
} from '@/ai/schemas/inspiration-schema';

export async function generateInspiration(): Promise<InspirationOutput> {
  return inspirationGeneratorFlow();
}

const prompt = ai.definePrompt({
  name: 'inspirationGeneratorPrompt',
  output: {schema: InspirationOutputSchema},
  prompt: `You are an AI assistant that curates inspirational content for users trying to discover their passion. Your tone should be exciting, encouraging, and a little playful.

Generate a list of 3 fresh, unique, and inspiring articles, blog posts, or book summaries related to topics like self-discovery, finding your passion, starting side projects, creativity, and personal growth. Ensure the list is diverse and covers different angles of the main topic. The titles should be specific and sound like real, fun articles you would find online.

For each item, provide:
- A compelling and realistic-sounding title.
- An engaging and detailed excerpt that is 4-5 sentences long.
- A URL that links to the journal page with the title as a prompt. The format must be '/journal?prompt=ARTICLE_TITLE_HERE' where ARTICLE_TITLE_HERE is the URL-encoded version of the title.

Do not repeat content you've generated before. Make it fun and varied!`,
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
