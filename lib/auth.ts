// This file contains both development and production authentication logic
// DEVELOPMENT: Uses hardcoded credentials
// PRODUCTION: Uses actual API endpoints

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    name: string;
    email: string;
    role: string;
    entityId: string;
  };
}

// DEVELOPMENT: Hardcoded test credentials
const TEST_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
  userData: {
    id: 'test-id-1',
    username: 'admin',
    name: 'Test Admin',
    email: 'admin@test.com',
    role: 'admin-colowso',
    entityId: 'entity-1'
  }
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function login(username: string, password: string): Promise<LoginResponse> {
  // DEVELOPMENT: Use hardcoded credentials check
  // TODO: Remove this condition and use only the API call for production
  /*
  if (process.env.NODE_ENV === 'development') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (username === TEST_CREDENTIALS.username && password === TEST_CREDENTIALS.password) {
      return {
        token: 'test-jwt-token',
        user: TEST_CREDENTIALS.userData
      };
    }
    throw new Error('Invalid credentials');
  }
*/
  // PRODUCTION: Real API call
  // Uncomment and use this code for production

  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();

}