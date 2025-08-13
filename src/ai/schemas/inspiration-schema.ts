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
  excerpt: z
    .string()
    .describe(
      'A short, engaging excerpt of the content, about 4-5 sentences long.'
    ),
  url: z
    .string()
    .describe(
      "A URL that links to the journal page with the title as a prompt."
    ),
});

export const InspirationOutputSchema = z.object({
  inspirationFeed: z.array(InspirationItemSchema),
});

export type InspirationOutput = z.infer<typeof InspirationOutputSchema>;
