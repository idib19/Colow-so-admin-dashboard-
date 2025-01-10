'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

export default function UsersListPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Users</h2>
        <Button>
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Users</CardTitle>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                placeholder="Search users..."
                className="pl-8"
              />
              <Search className="h-4 w-4 absolute ml-2 text-muted-foreground" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground">
            User list table implementation coming soon...
          </div>
        </CardContent>
      </Card>
    </div>
  );
}