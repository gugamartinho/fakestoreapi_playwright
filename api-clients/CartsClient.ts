import { APIRequestContext } from '@playwright/test';
import { ApiClient } from './ApiClient';

export class CartsClient extends ApiClient {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async getAllCarts() {
    return this.get('/carts');
  }

  async getCartById(id: number) {
    return this.get(`/carts/${id}`);
  }

  async getCartsByUserId(userId: number) {
    return this.get(`/carts/user/${userId}`);
  }

  async createCart(cartData: {
    userId: number;
    date: string;
    products: Array<{ productId: number; quantity: number }>;
  }) {
    return this.post('/carts', cartData);
  }

  async updateCart(id: number, cartData: object) {
    return this.put(`/carts/${id}`, cartData);
  }

  async deleteCart(id: number) {
    return this.delete(`/carts/${id}`);
  }
}
