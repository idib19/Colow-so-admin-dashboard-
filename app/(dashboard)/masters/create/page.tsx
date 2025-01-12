'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { createMaster } from '@/lib/master';
interface MasterRegistrationDTO {
  country: string;
}

export default function CreateMasterPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Authentication token not found');
      return;
    }
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data: MasterRegistrationDTO = {
      country: formData.get('country') as string,
    };

    try {
      // TODO: Implement API call
      const response = await createMaster(data, token );
      console.log("try to post with data", data);
      console.log('Master created successfully:', response);
      toast.success('Master created successfully in ' + response.country);
    } catch (error) {
      toast.error('Failed to create master');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Create Master</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Master Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input 
                id="country" 
                name="country" 
                placeholder="Enter country"
                required 
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline">Cancel</Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Master'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}