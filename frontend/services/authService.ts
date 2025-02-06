import { AxiosResponse } from 'axios';
import apiClient from './apiClient';

interface LoginParams {
  username: string;
  password: string;
  token: string;
}

export async function login({ username, password, token }: LoginParams): Promise<AxiosResponse<any>> {
  const body = new URLSearchParams();
  body.append('username', username);
  body.append('password', password);

  return apiClient.post(`/api/auth/login?token=${encodeURIComponent(token)}`, body, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

export async function logout(): Promise<AxiosResponse<any>> {
  return apiClient.post('/api/auth/logout');
}

export async function getMe(): Promise<AxiosResponse<any>> {
  return apiClient.get('/api/users/me');
}
