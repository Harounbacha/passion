'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import useLocalStorage from '@/hooks/use-local-storage'
import { Plus, X } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

type Idea = {
  id: string
  title: string
  content: string
}

export default function BrainstormPage() {
  const [ideas, setIdeas] = useLocalStorage<Idea[]>('brainstorm-ideas', [])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const { toast } = useToast()

  const handleAddIdea = () => {
    if (!newTitle.trim()) {
      toast({ title: 'Title is required', variant: 'destructive' })
      return
    }
    const newIdea: Idea = {
      id: new Date().toISOString(),
      title: newTitle,
      content: newContent,
    }
    setIdeas([newIdea, ...ideas])
    setNewTitle('')
    setNewContent('')
    setIsDialogOpen(false)
    toast({ title: 'Idea Added!', description: 'Your new idea is on the board.' })
  }

  const handleDeleteIdea = (id: string) => {
    setIdeas(ideas.filter((idea) => idea.id !== id))
    toast({ title: 'Idea Removed' })
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold font-headline">Brainstorming Board</h1>
          <p className="text-muted-foreground">A place to visually explore your potential passion areas.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="mr-2 h-4 w-4" />
              Add Idea
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add a New Idea</DialogTitle>
              <DialogDescription>What new passion are you exploring? Add it to your board.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input id="title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="content" className="text-right pt-2">
                  Notes
                </Label>
                <Textarea id="content" value={newContent} onChange={(e) => setNewContent(e.target.value)} className="col-span-3" rows={4} />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddIdea} className="bg-primary hover:bg-primary/90 text-primary-foreground">Save Idea</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {ideas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <Card key={idea.id} className="relative group">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleDeleteIdea(idea.id)}
              >
                <X className="h-4 w-4" />
              </Button>
              <CardHeader>
                <CardTitle>{idea.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{idea.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-semibold">Your board is empty</h2>
          <p className="text-muted-foreground mt-2">Click "Add Idea" to start brainstorming!</p>
        </div>
      )}
    </div>
  )
}
