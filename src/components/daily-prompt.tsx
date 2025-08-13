'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'

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

  useEffect(() => {
    setPrompt(prompts[Math.floor(Math.random() * prompts.length)])
  }, [])

  return (
    <Card className="bg-primary/10 border-primary/20 flex flex-col justify-center">
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
    </Card>
  )
}
