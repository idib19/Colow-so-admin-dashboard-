'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Users Overview</h2>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Users Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This page is under development. Please use the sidebar navigation to access:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
            <li>All Users - View and manage user accounts</li>
            <li>Create User - Register new user accounts</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
} 