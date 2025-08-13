
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {generateInspiration} from '@/ai/flows/inspiration-generator';
import type {InspirationOutput} from '@/ai/schemas/inspiration-schema';
import {useEffect, useState, useCallback} from 'react';
import {Skeleton} from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import Link from 'next/link';

function InspirationSkeleton() {
  return (
    <Card className="flex flex-col w-full">
      <CardHeader>
        <Skeleton className="h-7 w-3/4" />
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
    </Card>
  );
}

export default function InspirationPage() {
  const [data, setData] = useState<InspirationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const inspiration = await generateInspiration();
      setData(inspiration);
    } catch (error) {
      console.error('Failed to fetch inspiration:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-headline">Inspiration Feed</h1>
          <p className="text-muted-foreground">
            Curated stories, articles, and resources to fuel your journey.
          </p>
        </div>
        <Button onClick={fetchData} variant="outline" size="icon" disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-8">
        {isLoading && (
          <>
            <InspirationSkeleton />
            <InspirationSkeleton />
            <InspirationSkeleton />
          </>
        )}
        {!isLoading && data?.inspirationFeed.map((item, index) => (
          <Link
            key={index}
            href={item.url}
            className="flex"
          >
            <Card className="flex flex-col hover:border-primary/50 transition-colors w-full">
              <CardHeader>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-lg">{item.excerpt}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
