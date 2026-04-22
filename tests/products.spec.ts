import { test, expect } from '../fixtures';
import { Product } from '../types/api.types';

test.describe('Products API', () => {

  test.describe('GET /products', () => {
    test('should return 200 and list of all products', async ({ productsClient }) => {
      const response = await productsClient.getAllProducts();
      expect(response.status()).toBe(200);

      const products: Product[] = await response.json();
      expect(products.length).toBeGreaterThan(0);
      expect(products[0]).toHaveProperty('id');
      expect(products[0]).toHaveProperty('title');
      expect(products[0]).toHaveProperty('price');
      expect(products[0]).toHaveProperty('category');
    });

    test('should return products with valid price format', async ({ productsClient }) => {
      const response = await productsClient.getAllProducts();
      const products: Product[] = await response.json();

      products.forEach(product => {
        expect(typeof product.price).toBe('number');
        expect(product.price).toBeGreaterThan(0);
      });
    });

    test('should return products with rating object', async ({ productsClient }) => {
      const response = await productsClient.getAllProducts();
      const products: Product[] = await response.json();

      products.forEach(product => {
        expect(product.rating).toHaveProperty('rate');
        expect(product.rating).toHaveProperty('count');
        expect(product.rating.rate).toBeGreaterThanOrEqual(0);
        expect(product.rating.rate).toBeLessThanOrEqual(5);
      });
    });
  });

  test.describe('GET /products/:id', () => {
    test('should return 200 and single product data', async ({ productsClient }) => {
      const response = await productsClient.getProductById(1);
      expect(response.status()).toBe(200);

      const product: Product = await response.json();
      expect(product.id).toBe(1);
      expect(product.title).toBeTruthy();
      expect(product.price).toBeGreaterThan(0);
    });

    test('should have all required fields', async ({ productsClient }) => {
      const response = await productsClient.getProductById(1);
      const product: Product = await response.json();

      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('title');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('description');
      expect(product).toHaveProperty('category');
      expect(product).toHaveProperty('image');
      expect(product).toHaveProperty('rating');
    });
  });

  test.describe('GET /products/categories', () => {
    test('should return 200 and list of categories', async ({ productsClient }) => {
      const response = await productsClient.getAllCategories();
      expect(response.status()).toBe(200);

      const categories: string[] = await response.json();
      expect(categories.length).toBeGreaterThan(0);
      expect(typeof categories[0]).toBe('string');
    });

    test('should return known categories', async ({ productsClient }) => {
      const response = await productsClient.getAllCategories();
      const categories: string[] = await response.json();

      expect(categories).toContain('electronics');
      expect(categories).toContain('jewelery');
      expect(categories).toContain('men\'s clothing');
      expect(categories).toContain('women\'s clothing');
    });
  });

  test.describe('GET /products/category/:category', () => {
    test('should return products for electronics category', async ({ productsClient }) => {
      const response = await productsClient.getProductsByCategory('electronics');
      expect(response.status()).toBe(200);

      const products: Product[] = await response.json();
      expect(products.length).toBeGreaterThan(0);
      products.forEach(product => {
        expect(product.category).toBe('electronics');
      });
    });

    test('should return empty array for non-existent category', async ({ productsClient }) => {
      const response = await productsClient.getProductsByCategory('nonexistent');
      expect(response.status()).toBe(200);

      const products: Product[] = await response.json();
      expect(products.length).toBe(0);
    });

    test('should return products for all known categories', async ({ productsClient }) => {
      const categories = ['electronics', 'jewelery', 'men\'s clothing', 'women\'s clothing'];

      for (const category of categories) {
        const response = await productsClient.getProductsByCategory(category);
        expect(response.status()).toBe(200);

        const products: Product[] = await response.json();
        expect(products.length).toBeGreaterThan(0);
      }
    });
  });

    test('should respect limit parameter', async ({ productsClient }) => {
      const response = await productsClient.getProductsSorted('asc', 5);
      expect(response.status()).toBe(200);

      const products: Product[] = await response.json();
      expect(products.length).toBeLessThanOrEqual(5);
    });
  });