// import { http } from '@/utils/config';
// import { User } from 'next-auth';
// import { AdapterUser } from 'next-auth/adapters';

// export async function loginUser(
//   provider: string | undefined,
//   token: string | undefined,
//   user: User | AdapterUser
// ): Promise<boolean> {
//   try {

//     const response = await http.post(`/auth/login/${provider}/`, {
//       token: token
//     });

//     user.access = response.data.access;
//     user.userId = response.data.userId;
//     console.log('Successfully logged in:', response.data);
//     return true;
//   } catch (error: any) {
//     console.error('Error during login:', error.message);
//     return false;
//   }
// }

const API_BASE_URL = 'http://localhost:8000';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

class AuthService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('access_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  async login(loginData: LoginData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/users/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Login failed');
    }

    const data = await response.json();
    this.setTokens(data.access, data.refresh);
    return data;
  }

  async register(registerData: RegisterData): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    });

    if (!response.ok) {
      const error = await response.json();
      const errorMessage = error.username?.[0] || error.email?.[0] || error.detail || 'Registration failed';
      throw new Error(errorMessage);
    }

    return await response.json();
  }

  async refreshToken(): Promise<AuthResponse> {
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(`${API_BASE_URL}/users/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      this.logout();
      throw new Error('Token refresh failed');
    }

    const data = await response.json();
    this.setTokens(data.access, data.refresh);
    return data;
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/me/`, {
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        return null;
      }

      return await response.json();
    } catch (error) {
      return null;
    }
  }

  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}

export const authService = new AuthService();
