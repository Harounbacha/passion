'use client'

import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { usePathname } from 'next/navigation'

const getTitle = (path: string) => {
  if (path === '/') return 'Dashboard'
  if (path.startsWith('/journal')) return 'My Journal'
  if (path.startsWith('/discover')) return 'Discover Your Passion'
  if (path.startsWith('/brainstorm')) return 'Brainstorming Board'
  if (path.startsWith('/inspiration')) return 'Inspiration Feed'
  return 'PassionBloom'
}

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <Sidebar>
        <AppSidebar />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-6 sticky top-0 z-10">
          <SidebarTrigger className="md:hidden"/>
          <h1 className="text-xl font-semibold font-headline">{getTitle(pathname)}</h1>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
