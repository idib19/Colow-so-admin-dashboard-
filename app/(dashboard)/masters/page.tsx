'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MastersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Masters Overview</h2>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Masters Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This page is under development. Please use the sidebar navigation to access:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
            <li>All Masters - View and manage master accounts</li>
            <li>Create Master - Register new master accounts</li>
            <li>Load Units - Manage unit transfers</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
} 