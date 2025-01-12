// This file will contain logic for creating a master entity
import { CreateMasterDTO } from '@/dtos/dto';
import { MasterResponseDTO } from '@/dtos/dto';

export async function createMaster(data: CreateMasterDTO, token: string): Promise<MasterResponseDTO> {
  // PRODUCTION: Real API call to create a master
  const response = await fetch('http://localhost:3000/api/colowso/create-master', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Create master failed');
  }

  return response.json();
}

export async function getMasters(token: string): Promise<any> {
  const response = await fetch('http://localhost:3000/api/colowso/masters', {
    headers: { 'Authorization': `Bearer ${token}` },
  });

  if (response.status === 401 || response.status === 403) {
    throw new Error('Token expired or invalid');
  }

  if (!response.ok) {
    throw new Error('Failed to fetch masters');
  }

  return response.json() as Promise<any>;
}
