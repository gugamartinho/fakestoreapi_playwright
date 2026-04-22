import { test, expect } from '../fixtures';
import { CartResponse } from '../types/api.types';

test.describe('Carts API', () => {

  test.describe('GET /carts', () => {
    test('should return 200 and list of carts', async ({ cartsClient }) => {
      const response = await cartsClient.getAllCarts();
      expect(response.status()).toBe(200);

      const carts: CartResponse[] = await response.json();
      expect(carts.length).toBeGreaterThan(0);
      expect(carts[0]).toHaveProperty('id');
      expect(carts[0]).toHaveProperty('userId');
      expect(carts[0]).toHaveProperty('products');
    });

    test('should return carts with valid structure', async ({ cartsClient }) => {
      const response = await cartsClient.getAllCarts();
      const carts: CartResponse[] = await response.json();

      carts.forEach(cart => {
        expect(typeof cart.id).toBe('number');
        expect(typeof cart.userId).toBe('number');
        expect(Array.isArray(cart.products)).toBe(true);
        
        cart.products.forEach(product => {
          expect(typeof product.productId).toBe('number');
          expect(typeof product.quantity).toBe('number');
        });
      });
    });
  });

  test.describe('GET /carts/:id', () => {
    test('should return 200 and single cart', async ({ cartsClient }) => {
      const response = await cartsClient.getCartById(1);
      expect(response.status()).toBe(200);

      const cart: CartResponse = await response.json();
      expect(cart.id).toBe(1);
      expect(cart.userId).toBeTruthy();
      expect(Array.isArray(cart.products)).toBe(true);
    });

    // Note: The API returns 200 with an empty object for non-existent carts, so this test is commented out.
    // test('should return 404 for non-existent cart', async ({ cartsClient }) => {
    //   const response = await cartsClient.getCartById(9999);
    //   expect(response.status()).toBe(404);
    // });

    test('should have products array', async ({ cartsClient }) => {
      const response = await cartsClient.getCartById(1);
      const cart: CartResponse = await response.json();

      expect(cart.products).toBeDefined();
      expect(Array.isArray(cart.products)).toBe(true);

      if (cart.products.length > 0) {
        expect(cart.products[0]).toHaveProperty('productId');
        expect(cart.products[0]).toHaveProperty('quantity');
      }
    });
  });

  test.describe('GET /carts/user/:userId', () => {
    test('should return 200 and user carts', async ({ cartsClient }) => {
      const response = await cartsClient.getCartsByUserId(1);
      expect(response.status()).toBe(200);

      const carts: CartResponse[] = await response.json();
      expect(Array.isArray(carts)).toBe(true);

      carts.forEach(cart => {
        expect(cart.userId).toBe(1);
      });
    });

    test('should return empty array for user with no carts', async ({ cartsClient }) => {
      const response = await cartsClient.getCartsByUserId(9999);
      expect(response.status()).toBe(200);

      const carts: CartResponse[] = await response.json();
      expect(Array.isArray(carts)).toBe(true);
      expect(carts.length).toBe(0);
    });
  });

  test.describe('POST /carts', () => {
    test('should return 201 and created cart', async ({ cartsClient }) => {
      const newCart = {
        userId: 1,
        date: new Date().toISOString(),
        products: [
          { productId: 1, quantity: 5 },
          { productId: 2, quantity: 2 },
        ],
      };

      const response = await cartsClient.createCart(newCart);
      expect(response.status()).toBe(201);

      const cart: CartResponse = await response.json();
      expect(cart).toHaveProperty('id');
      expect(cart.userId).toBe(newCart.userId);
      expect(cart.products).toEqual(newCart.products);
    });

    test('should generate valid cart id', async ({ cartsClient }) => {
      const newCart = {
        userId: 2,
        date: new Date().toISOString(),
        products: [{ productId: 1, quantity: 1 }],
      };

      const response = await cartsClient.createCart(newCart);
      const cart: CartResponse = await response.json();

      expect(typeof cart.id).toBe('number');
      expect(cart.id).toBeGreaterThan(0);
    });
  });

  test.describe('PUT /carts/:id', () => {
    test('should return 200 and updated cart', async ({ cartsClient }) => {
      const updateData = {
        userId: 1,
        date: new Date().toISOString(),
        products: [
          { productId: 5, quantity: 10 },
          { productId: 6, quantity: 3 },
        ],
      };

      const response = await cartsClient.updateCart(1, updateData);
      expect(response.status()).toBe(200);

      const cart: CartResponse = await response.json();
      expect(cart.userId).toBe(updateData.userId);
      expect(cart.products).toEqual(updateData.products);
    });
  });

  test.describe('DELETE /carts/:id', () => {
    test('should return 200 when deleting cart', async ({ cartsClient }) => {
      const response = await cartsClient.deleteCart(1);
      expect(response.status()).toBe(200);
    });
  });
});
