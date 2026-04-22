import { APIRequestContext } from '@playwright/test';
import { ApiClient } from './ApiClient';

export class ProductsClient extends ApiClient {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async getAllProducts() {
    return this.get('/products');
  }

  async getProductById(id: number) {
    return this.get(`/products/${id}`);
  }

  async getProductsByCategory(category: string) {
    return this.get(`/products/category/${category}`);
  }

  async getAllCategories() {
    return this.get('/products/categories');
  }

  async getProductsSorted(sort: 'asc' | 'desc', limit?: number) {
    const params = new URLSearchParams();
    params.append('sort', sort);
    if (limit) params.append('limit', limit.toString());
    return this.get(`/products?${params.toString()}`);
  }
}
