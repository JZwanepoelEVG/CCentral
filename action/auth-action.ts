"use server";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Temporary implementation that simulates user registration
export async function addUser(data: RegisterData) {
  try {
    // TODO: Replace with real API call when backend is ready
    // Example POST request:
    // await fetch('/api/register', { method: 'POST', body: JSON.stringify(data), headers: {"Content-Type": "application/json"} })
    return { status: 'success', message: 'User registered successfully', data };
  } catch (error) {
    console.error('addUser error', error);
    return { status: 'error', message: 'Failed to register user' };
  }
}
