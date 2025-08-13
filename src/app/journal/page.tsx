
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import useLocalStorage from '@/hooks/use-local-storage'
import { useToast } from '@/hooks/use-toast'
import { Skeleton } from '@/components/ui/skeleton'

export default function JournalPage() {
  const [entries, setEntries] = useLocalStorage<string[]>('journal-entries', [])
  const [newEntry, setNewEntry] = useState('')
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const prompt = searchParams.get('prompt')
    if (prompt) {
      setNewEntry(prompt + '\n\n')
    }
  }, [searchParams])

  const handleSaveEntry = () => {
    if (newEntry.trim() === '') {
      toast({
        title: 'Empty Entry',
        description: 'Please write something before saving.',
        variant: 'destructive',
      })
      return
    }
    setEntries([newEntry, ...entries])
    setNewEntry('')
    toast({
      title: 'Entry Saved!',
      description: 'Your thoughts have been recorded.',
    })
  }

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>New Journal Entry</CardTitle>
          <CardDescription>What's on your mind today? Reflect on your interests, ideas, and observations.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Textarea
            placeholder="Today I felt really energized when..."
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            rows={6}
            className="bg-background"
          />
          <Button onClick={handleSaveEntry} className="self-start bg-primary hover:bg-primary/90 text-primary-foreground">
            Save Entry
          </Button>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold font-headline">Past Entries</h2>
        {!isClient ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             <Skeleton className="h-24" />
             <Skeleton className="h-24" />
             <Skeleton className="h-24" />
           </div>
        ) : entries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {entries.map((entry, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <p className="whitespace-pre-wrap">{entry}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">You haven't written any entries yet. Start by adding one above!</p>
        )}
      </div>
    </div>
  )
}
