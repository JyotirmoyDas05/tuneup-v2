const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    // Check if the response indicates a failure
    if (!data.success) {
      throw new AuthError(data.message || 'Invalid email or password');
    }

    // Store auth data in localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    return data;
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    throw new AuthError('Failed to connect to the server. Please try again later.');
  }
};

export const registerUser = async (username: string, email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new AuthError(data.message || 'Failed to register');
    }

    // Store auth data in localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    return data;
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    throw new AuthError('Failed to connect to the server. Please try again later.');
  }
};