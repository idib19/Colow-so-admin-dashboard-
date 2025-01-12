// This file will contain logic for creating a master entity
import { CreateMasterDTO } from '@/dtos/dto';
import { MasterResponseDTO } from '@/dtos/dto';
import { CreateTransferDTO } from '@/dtos/dto';
import { jwtDecode } from "jwt-decode";

const API_URL = process.env.API_URL;

interface TokenPayload {
  id: string;
  role: string;
  entityId: string;
  iat: number;
  exp: number;
}

function decodeToken(token: string): { id: string } {
  return jwtDecode<TokenPayload>(token);
}

export async function createMaster(data: CreateMasterDTO, token: string): Promise<MasterResponseDTO> {
  // PRODUCTION: Real API call to create a master
  const response = await fetch(`${API_URL}/colowso/create-master`, {
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
  const response = await fetch(`${API_URL}/colowso/masters`, {
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

export async function transferUnits(data: any, token: string): Promise<any> {
  const { id } = decodeToken(token);
  const { receiverId, amount } = data;

  if (!id || !receiverId || !amount) {
    throw new Error('Invalid token');
  }

  const response = await fetch(`${API_URL}/colowso/load-master`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify({ ...data, issuerId: id, type: 1 } as CreateTransferDTO),
  });

  if (!response.ok) {
    throw new Error('Transfer units failed');
  }

  return response;
}