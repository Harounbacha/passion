'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useState, useCallback } from 'react'
import { ArrowRight, RefreshCw, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const prompts = [
  "What activity makes you lose track of time?",
  "If you had a free afternoon, what would you do for fun?",
  "What topic could you read about for hours?",
  "What did you love to do as a child?",
  "What problem in the world do you wish you could solve?",
  "What do people usually ask you for help with?",
  "What are you curious about right now?",
  "If you didn't have to worry about money, what would you do every day?",
  "What's something you've always wanted to learn?",
  "When do you feel most creative or inspired?"
]

export function DailyPrompt() {
  const [prompt, setPrompt] = useState('')

  const getNewPrompt = useCallback(() => {
    const newPrompt = prompts[Math.floor(Math.random() * prompts.length)]
    setPrompt(newPrompt)
  }, [])

  useEffect(() => {
    getNewPrompt()
  }, [getNewPrompt])

  return (
    <Card className="bg-primary/10 border-primary/20 flex flex-col justify-between">
      <div>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Daily Reflection
          </CardTitle>
          <CardDescription>A prompt to spark your thoughts.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-medium font-headline text-foreground">
            {prompt || "Loading your daily prompt..."}
          </p>
        </CardContent>
      </div>
      <CardFooter className="flex justify-end gap-2">
          <Button variant="ghost" size="icon" onClick={getNewPrompt} aria-label="Get new prompt">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button asChild variant="outline">
            <Link href={`/journal?prompt=${encodeURIComponent(prompt)}`}>
              Go to Journal
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
      </CardFooter>
    </Card>
  )
}
