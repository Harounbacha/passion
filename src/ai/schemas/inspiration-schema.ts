/**
 * @fileOverview Schemas for the inspiration generator.
 *
 * - InspirationItemSchema - The schema for a single inspiration item.
 * - InspirationOutputSchema - The schema for the list of inspiration items.
 * - InspirationOutput - The TS type for the list of inspiration items.
 */

import {z} from 'zod';

export const InspirationItemSchema = z.object({
  title: z.string().describe('The compelling title of the article or resource.'),
  source: z
    .string()
    .describe(
      'The name of the source, like a magazine, blog, or website (e.g., "Medium", "Forge", "Psychology Today").'
    ),
  excerpt: z
    .string()
    .describe('A short, one-sentence summary or excerpt of the content.'),
  url: z.string().describe("A placeholder URL, which should always be '#'."),
  aiHint: z
    .string()
    .describe(
      'One or two keywords for a relevant background image (e.g., "creative workspace", "zen garden").'
    ),
});

export const InspirationOutputSchema = z.object({
  inspirationFeed: z.array(InspirationItemSchema),
});

export type InspirationOutput = z.infer<typeof InspirationOutputSchema>;
