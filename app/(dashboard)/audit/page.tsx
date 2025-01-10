'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AuditLogPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Audit Logs</h2>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Audit logs coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}