'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DailyPrompt } from '@/components/daily-prompt'
import useLocalStorage from '@/hooks/use-local-storage'
import { BookText, BrainCircuit } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function Dashboard() {
  const [journalEntries] = useLocalStorage<string[]>('journal-entries', [])
  const [ideas] = useLocalStorage<{ id: string; title: string; content: string }[]>('brainstorm-ideas', [])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome to PassionBloom</h1>
        <p className="text-muted-foreground">
          Your personal space for self-discovery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DailyPrompt />
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Journal Entries</CardTitle>
              <BookText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isClient ? (
                <div className="text-2xl font-bold">{journalEntries.length}</div>
              ) : (
                <Skeleton className="h-8 w-12" />
              )}
              <p className="text-xs text-muted-foreground">
                Total thoughts and reflections captured.
              </p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Brainstormed Ideas</CardTitle>
              <BrainCircuit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isClient ? (
                <div className="text-2xl font-bold">{ideas.length}</div>
               ) : (
                <Skeleton className="h-8 w-12" />
              )}
              <p className="text-xs text-muted-foreground">
                Potential passions you're exploring.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
