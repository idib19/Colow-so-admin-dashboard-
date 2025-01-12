'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from 'sonner';
import { getMasters } from '@/lib/master';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';

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

export default function MastersListPage() {
  const router = useRouter();
  const [masters, setMasters] = useState<Master[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Master;
    direction: 'asc' | 'desc';
  }>({ key: 'createdAt', direction: 'desc' });

  useAuth();

  const fetchMasters = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Authentication token not found');
        router.push('/login');
        return;
      }
      
      const response = await getMasters(token);

      // No need to check response status here as it's handled in getMasters
      setMasters(response);
      
    } catch (error) {
      console.error('API error:', error);
      toast.error('An Api error occurred ' , {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
      
      // If the error is due to token issues, redirect to login
      if (error instanceof Error && error.message.includes('Token expired or invalid')) {
        localStorage.removeItem('token');
        router.push('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMasters();
  }, []);

  const handleSort = (key: keyof Master) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === 'asc'
          ? 'desc'
          : 'asc',
    });
  };

  const sortedMasters = [...masters].sort((a, b) => {
    if (sortConfig.key === 'balance' || sortConfig.key === 'totalCommission') {
      return sortConfig.direction === 'asc'
        ? a[sortConfig.key] - b[sortConfig.key]
        : b[sortConfig.key] - a[sortConfig.key];
    }
    
    return sortConfig.direction === 'asc'
      ? String(a[sortConfig.key]).localeCompare(String(b[sortConfig.key]))
      : String(b[sortConfig.key]).localeCompare(String(a[sortConfig.key]));
  });

  const filteredMasters = sortedMasters.filter(master =>
    master.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    master._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Masters</h2>
        <Button>
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Masters</CardTitle>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-2.5 top-3 text-muted-foreground" />
                <Input
                  placeholder="Search masters..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button onClick={() => fetchMasters()} variant="outline">
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead onClick={() => handleSort('country')} className="cursor-pointer">
                      Country <ArrowUpDown className="ml-1 h-4 w-4 inline" />
                    </TableHead>
                    <TableHead onClick={() => handleSort('balance')} className="cursor-pointer text-right">
                      Balance <ArrowUpDown className="ml-1 h-4 w-4 inline" />
                    </TableHead>
                    <TableHead className="text-right">Partners</TableHead>
                    <TableHead onClick={() => handleSort('totalCommission')} className="cursor-pointer text-right">
                      Commission <ArrowUpDown className="ml-1 h-4 w-4 inline" />
                    </TableHead>
                    <TableHead onClick={() => handleSort('createdAt')} className="cursor-pointer">
                      Created At <ArrowUpDown className="ml-1 h-4 w-4 inline" />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMasters.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        No masters found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMasters.map((master) => (
                      <TableRow key={master._id}>
                        <TableCell className="font-medium">{master.country}</TableCell>
                        <TableCell className="text-right">{master.balance.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{master.partnersList.length}</TableCell>
                        <TableCell className="text-right">{master.totalCommission.toLocaleString()}</TableCell>
                        <TableCell>
                          {new Date(master.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}