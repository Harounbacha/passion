'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import {
  LayoutDashboard,
  BookText,
  Sparkles,
  BrainCircuit,
  Lightbulb,
  Flower2,
} from 'lucide-react'

const menuItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/journal', label: 'My Journal', icon: BookText },
  { href: '/discover', label: 'Discover', icon: Sparkles },
  { href: '/brainstorm', label: 'Brainstorm', icon: BrainCircuit },
  { href: '/inspiration', label: 'Inspiration', icon: Lightbulb },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <>
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="p-2 bg-primary rounded-lg">
            <Flower2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-semibold font-headline">PassionBloom</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                className="justify-start text-base h-12"
                tooltip={{children: item.label}}
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  )
}
