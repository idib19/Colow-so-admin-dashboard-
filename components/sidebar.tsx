'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Settings,
  History,
  User,
  Wallet,
} from 'lucide-react';

const navigation = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { 
    label: 'Masters',
    path: '/masters',
    icon: Users,
    subItems: [
      { label: 'All Masters', path: '/masters/list', icon: Users },
      { label: 'Create Master', path: '/masters/create', icon: UserPlus },
      { label: 'Load Units', path: '/masters/units', icon: Wallet }
    ]
  },
  { 
    label: 'Users',
    path: '/users',
    icon: User,
    subItems: [
      { label: 'All Users', path: '/users/list', icon: Users },
      { label: 'Create User', path: '/users/create', icon: UserPlus }
    ]
  },
  { label: 'Settings', path: '/settings', icon: Settings },
  { label: 'Audit Logs', path: '/audit', icon: History }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-card">
      <nav className="p-4 space-y-2">
        {navigation.map((item) => (
          <div key={item.path}>
            <Link
              href={item.path}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                pathname === item.path
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
            {item.subItems?.map((subItem) => (
              <Link
                key={subItem.path}
                href={subItem.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ml-6',
                  pathname === subItem.path
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent'
                )}
              >
                <subItem.icon className="h-4 w-4" />
                {subItem.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}