import { APIRequestContext } from '@playwright/test';

export class ApiClient {
  constructor(protected request: APIRequestContext) {}

  protected async get(endpoint: string) {
    return this.request.get(endpoint);
  }

  protected async post(endpoint: string, body: object) {
    return this.request.post(endpoint, { data: body });
  }

  protected async put(endpoint: string, body: object) {
    return this.request.put(endpoint, { data: body });
  }

  protected async patch(endpoint: string, body: object) {
    return this.request.patch(endpoint, { data: body });
  }

  protected async delete(endpoint: string) {
    return this.request.delete(endpoint);
  }
}
