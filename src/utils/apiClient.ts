import { APIRequestContext } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const baseURL = process.env.BASE_URL;

export class ApiClient {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async registerUser(email: string, password: string) {
    const response = await this.request.post(`${baseURL}/api/auth/register`, {
      data: {
        email: email,
        password: password,
        roles: ['ROLE_USER']
      }
    });

    if (response.ok()) {
      const responseBody = await response.json();
      return responseBody;
    } else {
      throw new Error(`Failed to register user: ${response.status()} ${response.statusText()}`);
    }
  }
}
