import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

const inspirationFeed = [
  {
    title: 'How to Find Your Passion: 20 Questions to Ask Yourself',
    source: 'The Muse',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'thinking person',
    excerpt: 'Finding your passion isn’t about some grand, singular discovery. It’s about exploring your interests and seeing what sticks.',
    url: '#',
  },
  {
    title: 'The Art of the Side Project: A Guide to Getting Started',
    source: 'Medium',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'creative workspace',
    excerpt: 'Side projects are a fantastic way to learn new skills, build your portfolio, and maybe even turn a passion into a profession.',
    url: '#',
  },
  {
    title: 'Why You Should Have a "Portfolio of Passions," Not a Single Calling',
    source: 'Forge',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'hobby collection',
    excerpt: 'Embracing multiple interests can lead to a more fulfilling and resilient life. Don’t feel pressured to choose just one thing.',
    url: '#',
  },
  {
    title: 'Ikigai: The Japanese Secret to a Long and Happy Life',
    source: 'Book Summary',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'zen garden',
    excerpt: 'Discover the intersection of what you love, what you’re good at, what the world needs, and what you can be paid for.',
    url: '#',
  },
  {
    title: 'Learning to Love the Process, Not Just the Outcome',
    source: 'Psychology Today',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'pottery making',
    excerpt: 'True passion often lies in the day-to-day engagement with an activity, not just in achieving the final goal.',
    url: '#',
  },
  {
    title: 'The Power of "Beginner\'s Mind" in Unlocking Creativity',
    source: 'Mindful.org',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'curious child',
    excerpt: 'Approaching new interests with openness and curiosity, free from the burden of expertise, can unlock surprising passions.',
    url: '#',
  }
]

export default function InspirationPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Inspiration Feed</h1>
        <p className="text-muted-foreground">Curated stories, articles, and resources to fuel your journey.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inspirationFeed.map((item, index) => (
          <Link key={index} href={item.url} target="_blank" rel="noopener noreferrer" className="flex">
            <Card className="flex flex-col hover:border-primary/50 transition-colors w-full">
              <CardHeader>
                <div className="aspect-video relative rounded-t-lg overflow-hidden -mt-6 -mx-6 mb-4">
                  <Image src={item.image} alt={item.title} fill className="object-cover" data-ai-hint={item.aiHint}/>
                </div>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{item.excerpt}</CardDescription>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">Source: {item.source}</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
