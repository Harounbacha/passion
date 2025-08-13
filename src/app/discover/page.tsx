
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import useLocalStorage from '@/hooks/use-local-storage'
import { Loader2, Sparkles, PlusCircle } from 'lucide-react'
import { aiPassionFinder, type AiPassionFinderOutput } from '@/ai/flows/ai-passion-finder'
import { useToast } from '@/hooks/use-toast'
import { Skeleton } from '@/components/ui/skeleton'

type JournalEntry = {
  id: string
  content: string
}

type Idea = {
  id: string;
  title: string;
  content: string;
};

export default function DiscoverPage() {
  const [journalEntries] = useLocalStorage<JournalEntry[]>('journal-entries-v2', [])
  const [ideas, setIdeas] = useLocalStorage<Idea[]>('brainstorm-ideas', []);
  const [isLoading, setIsLoading] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AiPassionFinderOutput | null>(null)
  const { toast } = useToast()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleAnalyze = async () => {
    if (journalEntries.length === 0) {
      toast({
        title: 'No Entries Found',
        description: 'Please write at least one journal entry before analyzing.',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)
    setAnalysisResult(null)
    try {
      const allEntries = journalEntries.map(entry => entry.content).join('\n\n---\n\n')
      const result = await aiPassionFinder({ journalEntries: allEntries })
      setAnalysisResult(result)
    } catch (error) {
      console.error('Error analyzing passions:', error)
      toast({
        title: 'Analysis Failed',
        description: 'Something went wrong. Please try again later.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddToBrainstorm = (title: string, description: string) => {
    const newIdea: Idea = {
      id: new Date().toISOString(),
      title,
      content: description,
    };
    setIdeas([newIdea, ...ideas]);
    toast({
      title: 'Added to Brainstorm!',
      description: `"${title}" is now on your board.`,
    });
  };

  return (
    <div className="flex flex-col items-center text-center gap-8">
      <div className="max-w-2xl">
        <Sparkles className="mx-auto h-12 w-12 text-accent-foreground" />
        <h1 className="text-4xl font-bold font-headline mt-4">Discover Your Passion</h1>
        <p className="text-muted-foreground mt-2">
          Our AI can help you find recurring themes and interests in your journal entries to suggest potential passions for you to explore.
        </p>
      </div>

      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          <Button onClick={handleAnalyze} disabled={isLoading || !isClient} size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze My Journal'
            )}
          </Button>
          {isClient ? (
            <p className="text-xs text-muted-foreground mt-2">
              You have {journalEntries.length} {journalEntries.length === 1 ? 'entry' : 'entries'} to analyze.
            </p>
          ) : (
            <Skeleton className="h-4 w-1/2 mx-auto mt-2" />
          )}
        </CardContent>
      </Card>

      {analysisResult && (
        <Card className="w-full max-w-2xl text-left animate-in fade-in duration-500">
          <CardHeader>
            <CardTitle>Suggested Passion Areas</CardTitle>
            <CardDescription>Based on your journal, here are some areas you might be passionate about. Click one to add it to your Brainstorming Board!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {analysisResult.passionAreas.map((area, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-background hover:bg-muted/50 transition-colors">
                <div>
                  <h3 className="font-semibold">{area.title}</h3>
                  <p className="text-sm text-muted-foreground">{area.description}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleAddToBrainstorm(area.title, area.description)} aria-label={`Add ${area.title} to brainstorm board`}>
                  <PlusCircle className="h-5 w-5 text-primary" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
