'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Users, UserCheck, UserPlus } from 'lucide-react';

const stats = [
  {
    title: 'Total Masters',
    value: '24',
    icon: Users,
    trend: '+12%',
  },
  {
    title: 'Active Masters',
    value: '21',
    icon: UserCheck,
    trend: '+18%',
  },
  {
    title: 'Total Partners',
    value: '156',
    icon: UserPlus,
    trend: '+24%',
  },
  {
    title: 'Recent Registrations',
    value: '8',
    icon: Activity,
    trend: '+4%',
  },
];

const recentActivity = [
  { id: 1, action: 'New master registered', user: 'John Doe', time: '2 hours ago' },
  { id: 2, action: 'Partner status updated', user: 'Jane Smith', time: '3 hours ago' },
  { id: 3, action: 'System maintenance', user: 'System', time: '5 hours ago' },
  { id: 4, action: 'New partner added', user: 'Mike Johnson', time: '6 hours ago' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.trend} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">by {activity.user}</p>
                </div>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}