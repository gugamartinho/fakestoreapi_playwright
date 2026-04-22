import { APIRequestContext } from '@playwright/test';
import { ApiClient } from './ApiClient';

export class UsersClient extends ApiClient {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async getAllUsers() {
    return this.get('/users');
  }

  async getUserById(id: number) {
    return this.get(`/users/${id}`);
  }

  async createUser(userData: {
    email: string;
    username: string;
    password: string;
    name: { firstname: string; lastname: string };
    address: any;
    phone: string;
  }) {
    return this.post('/users', userData);
  }

  async updateUser(id: number, userData: object) {
    return this.put(`/users/${id}`, userData);
  }

  async deleteUser(id: number) {
    return this.delete(`/users/${id}`);
  }

  async login(username: string, password: string) {
    return this.post('/auth/login', { username, password });
  }
}
