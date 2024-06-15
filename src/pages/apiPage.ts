import { APIRequestContext } from '@playwright/test';
import { ApiClient } from '../utils/apiClient';
import { FileManager } from '../utils/fileManager';

export class ApiPage {
  private apiClient: ApiClient;

  constructor(request: APIRequestContext) {
    this.apiClient = new ApiClient(request);
    console.log('ApiPage initialized with APIRequestContext');
  }

  // Method to generate a random email address
  private generateRandomEmail(domain = 'example.com'): string {
    const randomString = Math.random().toString(36).substring(2, 15) +
                         Math.random().toString(36).substring(2, 15);
    const randomEmail = `${randomString}@${domain}`;
    console.log(`Generated random email: ${randomEmail}`);
    return randomEmail;
  }

  // Method to register a user with a randomly generated email
  async registerUserWithRandomEmail(password: string, domain: string = 'qubika.com') {
    const randomEmail = this.generateRandomEmail(domain);
    console.log(`Registering user with random email: ${randomEmail}`);
    return await this.registerUser(randomEmail, password);
  }

  // Existing method to register a user with specific email and password
  async registerUser(email: string, password: string) {
    console.log(`Registering user with email: ${email}`);
    const userData = await this.apiClient.registerUser(email, password);
    FileManager.saveUser(userData);
    console.log(`User data saved: ${JSON.stringify(userData)}`);
    return userData;
  }
}
