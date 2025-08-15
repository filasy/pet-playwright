import { test } from '@playwright/test';
import { ApiRoute } from '../BaseApiRoute';
import { UserParams } from './UserParams';
import { CreateUserResponse } from './CreateUserResponse';
import { GetUserAuthResponse } from './GetUserAuthResponse';
import { UserInfo, UserInfoSchema } from './UserInfo';

export class User extends ApiRoute {
  public async delete(id: string | number) {
    return test.step(`Sending delete user request with id: ${id}`, async () => {
      return this.apiClient.sendRequest<{ success: string }>(
        'DELETE',
        `${this.url}/${id}`,
      );
    });
  }

  public async create(createUserParams: UserParams) {
    return test.step(`Sending create user request`, async () => {
      return this.apiClient.sendRequest<CreateUserResponse>('POST', this.url, {
        body: createUserParams,
      });
    });
  }

  public async login(email: string, password: string) {
    return test.step(`Sending request for login with email ${email}`, async () => {
      const body = { email, password };
      return this.apiClient.sendRequest('POST', `${this.url}/login`, { body });
    });
  }
  public async getAuth() {
    return test.step(`Fetching user id`, async () => {
      return this.apiClient.sendRequest<GetUserAuthResponse>(
        'GET',
        `${this.url}/auth`,
      );
    });
  }
  async getUserInfo(id: number | string) {
    const userId = typeof id === 'string' ? Number(id) : id;
    return test.step(`Fetching user info by id: ${id}`, async () => {
      const response = await this.apiClient.sendRequest<UserInfo>(
        'GET',
        `${this.url}/${userId}`,
      );
      response.setSchema(UserInfoSchema);
      return response;
    });
  }
}
