'use server';

/**
 * @fileOverview A passion suggestion AI agent based on user journal entries.
 *
 * - aiPassionFinder - A function that handles the passion suggestion process.
 * - AiPassionFinderInput - The input type for the aiPassionFinder function.
 * - AiPassionFinderOutput - The return type for the aiPassionFinder function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiPassionFinderInputSchema = z.object({
  journalEntries: z
    .string()
    .describe('The users journal entries, which will be used to determine a potential passion.'),
});
export type AiPassionFinderInput = z.infer<typeof AiPassionFinderInputSchema>;

const AiPassionFinderOutputSchema = z.object({
  passionAreas: z
    .array(
      z.object({
        title: z.string().describe('A concise name for the passion area, like "Creative Writing" or "Hiking".'),
        description: z
          .string()
          .describe('A brief, one-sentence explanation of why this passion was suggested based on the journal entries.'),
      })
    )
    .describe('A list of suggested passion areas, each with a title and a short description.'),
});
export type AiPassionFinderOutput = z.infer<typeof AiPassionFinderOutputSchema>;

export async function aiPassionFinder(input: AiPassionFinderInput): Promise<AiPassionFinderOutput> {
  return aiPassionFinderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPassionFinderPrompt',
  input: {schema: AiPassionFinderInputSchema},
  output: {schema: AiPassionFinderOutputSchema},
  prompt: `You are an AI assistant designed to analyze a user's journal entries and suggest potential passion areas.

Analyze the following journal entries and suggest a list of 5-7 potential passion areas based on recurring themes, interests, and reflections. For each passion, provide a short title and a one-sentence description explaining the suggestion.

Journal Entries: {{{journalEntries}}}

Based on the above journal entries, suggest some passion areas for the user to explore.
`,
});

const aiPassionFinderFlow = ai.defineFlow(
  {
    name: 'aiPassionFinderFlow',
    inputSchema: AiPassionFinderInputSchema,
    outputSchema: AiPassionFinderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
