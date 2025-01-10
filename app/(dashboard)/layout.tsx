'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // DEVELOPMENT: Comment out authentication check
    // TODO: Uncomment for production
    /*
    if (!isLoading && !user && pathname !== '/login') {
      router.push('/login');
    }
    */
  }, [user, isLoading, router, pathname]);

  // DEVELOPMENT: Remove loading check
  // TODO: Restore for production
  /*
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }
  */

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}