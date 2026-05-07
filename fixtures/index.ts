import { test as base } from '@playwright/test';
import { ProductsClient } from '../api-clients/ProductsClient';
import { UsersClient } from '../api-clients/UsersClient';
import { CartsClient } from '../api-clients/CartsClient';
import dotenv from 'dotenv';

dotenv.config();

export const VALID_LOGIN = {
  username: process.env.VALID_LOGIN_USERNAME || '',
  password: process.env.VALID_LOGIN_PASSWORD || '',
};

export const NEW_USER = {
  email: 'test@example.com',
  username: 'testuser2025',
  password: 'testpass123',
  name: {
    firstname: 'Test',
    lastname: 'User',
  },
  address: {
    city: 'Lisbon',
    street: 'Avenida Paulista',
    number: 123,
    zipcode: '2000-105',
    geolocation: {
      lat: '38.7223',
      long: '-9.1393',
    },
  },
  phone: '351926625209',
};

// Fixtures
type Clients = {
  productsClient: ProductsClient;
  usersClient: UsersClient;
  cartsClient: CartsClient;
};

export const test = base.extend<Clients>({
  productsClient: async ({ request }, use) => {
    await use(new ProductsClient(request));
  },
  usersClient: async ({ request }, use) => {
    await use(new UsersClient(request));
  },
  cartsClient: async ({ request }, use) => {
    await use(new CartsClient(request));
  },
});

export { expect } from '@playwright/test';
