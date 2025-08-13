
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import {generateInspiration} from '@/ai/flows/inspiration-generator';
import type {InspirationOutput} from '@/ai/schemas/inspiration-schema';
import {useEffect, useState} from 'react';
import {Skeleton} from '@/components/ui/skeleton';

function InspirationSkeleton() {
  return (
    <Card className="flex flex-col w-full">
      <CardHeader>
        <Skeleton className="aspect-video relative rounded-t-lg -mt-6 -mx-6 mb-4" />
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent className="flex-grow">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6 mt-2" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-4 w-1/3" />
      </CardFooter>
    </Card>
  );
}

export default function InspirationPage() {
  const [data, setData] = useState<InspirationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const inspiration = await generateInspiration();
        setData(inspiration);
      } catch (error) {
        console.error('Failed to fetch inspiration:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Inspiration Feed</h1>
        <p className="text-muted-foreground">
          Curated stories, articles, and resources to fuel your journey.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && (
          <>
            <InspirationSkeleton />
            <InspirationSkeleton />
            <InspirationSkeleton />
            <InspirationSkeleton />
            <InspirationSkeleton />
            <InspirationSkeleton />
          </>
        )}
        {data?.inspirationFeed.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex"
          >
            <Card className="flex flex-col hover:border-primary/50 transition-colors w-full">
              <CardHeader>
                <div className="aspect-video relative rounded-t-lg overflow-hidden -mt-6 -mx-6 mb-4">
                  <Image
                    src={`https://placehold.co/600x400.png`}
                    alt={item.title}
                    fill
                    className="object-cover"
                    data-ai-hint={item.aiHint}
                  />
                </div>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{item.excerpt}</CardDescription>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">
                  Source: {item.source}
                </p>
              </CardFooter>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
