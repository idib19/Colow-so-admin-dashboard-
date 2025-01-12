'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { transferUnits } from '@/lib/master';


interface LoadUnitsDTO {
  receiverId: string;
  amount: number;
}


export default function LoadUnitsPage() {
  const [loading, setLoading] = useState(false);

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
      
      const response = await transferUnits(data, token);
      
      if (response.status === 200) {
        toast.success('Units loaded successfully');
      } else {
        toast.error('Failed to load units');
      }

    } catch (error) {
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
    </div>
  );
}