import { MasterUserRegistrationDTO } from '@/dtos/dto';


export async function getAllUsers(token: string): Promise<any> {
  const response = await fetch('http://localhost:3000/api/auth/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to get all users');
  }

  return response;
}

export async function createMasterUser(data: MasterUserRegistrationDTO, token: string): Promise<any> {
  const response = await fetch('http://localhost:3000/api/auth/register/master', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Failed to create master user');
  }

  return response;
}