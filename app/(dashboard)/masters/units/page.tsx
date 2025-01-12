'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { transferUnits, getMasters } from '@/lib/master';

interface LoadUnitsDTO {
  receiverId: string;
  amount: number;
}

interface Master {
  _id: string;
  country: string;
  balance: number;
  partnersList: string[];
  assignedUserId?: string;
  totalCommission: number;
  createdAt: string;
  updatedAt: string;
}

export default function LoadUnitsPage() {
  const [loading, setLoading] = useState(false);
  const [masters, setMasters] = useState<Master[]>([]);

  useEffect(() => {
    const fetchMasters = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Authentication token not found');
          return;
        }
        
        const response = await getMasters(token);
        setMasters(response);
      } catch (error) {
        toast.error('Failed to fetch masters');
      }
    };

    fetchMasters();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const data: LoadUnitsDTO = {
      receiverId: formData.get('masterId') as string,
      amount: Number(formData.get('amount'))
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Authentication token not found');
        return;
      }
      
      await transferUnits(data, token);
      toast.success('Units loaded successfully');

    } catch (error) {
      console.error('Error loading units:', error);
      toast.error('Failed to load units');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Load Units</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Load Virtual Units</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="masterId">Master ID</Label>
                <Input 
                  id="masterId" 
                  name="masterId" 
                  placeholder="Enter master ID"
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input 
                  id="amount" 
                  name="amount" 
                  type="number"
                  min="0"
                  step="1"
                  placeholder="Enter amount of units"
                  required 
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline">Cancel</Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Loading Units...' : 'Load Units'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Masters List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="min-w-full divide-y divide-gray-200 bg-gray-50">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Master ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {masters.map((master) => (
                  <tr key={master._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {master._id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {master.country}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {master.balance.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}