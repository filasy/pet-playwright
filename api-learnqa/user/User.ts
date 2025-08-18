import { test } from '@playwright/test';
import { ApiRoute } from '../BaseApiRoute';
import { UserParams } from './UserParams';
import { CreateUserResponse } from './CreateUserResponse';
import { GetUserAuthResponse } from './GetUserAuthResponse';
import { UserInfoResponse, UserInfoSchema } from './UserInfoResponse';
import { SuccessResponse, ResponseSchema } from './SuccessResponse';

export class User extends ApiRoute {
  public async delete(id: string | number) {
    return test.step(`Отправить запрос для удаления user с id: ${id}`, async () => {
      const response = await this.apiClient.sendRequest<SuccessResponse>(
        'DELETE',
        `${this.url}/${id}`,
      );
      response.setSchema(ResponseSchema);
      return response;
    });
  }

  public async create(createUserParams: UserParams) {
    return test.step(`Отправить запрос для создания user`, async () => {
      return this.apiClient.sendRequest<CreateUserResponse>('POST', this.url, {
        body: createUserParams,
      });
    });
  }

  public async update(userId: string, updateUserParams: UserParams) {
    return test.step(`Отправить запрос для обновления user`, async () => {
      const response = await this.apiClient.sendRequest<SuccessResponse>(
        'PUT',
        `${this.url}/${userId}`,
        {
          body: updateUserParams,
        },
      );
      response.setSchema(ResponseSchema);
      return response;
    });
  }

  public async login(email: string, password: string) {
    return test.step(`Отправить запрос для логина с email: ${email}`, async () => {
      const body = { email, password };
      return this.apiClient.sendRequest('POST', `${this.url}/login`, { body });
    });
  }
  public async getAuth() {
    return test.step(`Поиск user`, async () => {
      return this.apiClient.sendRequest<GetUserAuthResponse>(
        'GET',
        `${this.url}/auth`,
      );
    });
  }
  async getUserInfo(id: number | string) {
    const userId = typeof id === 'string' ? Number(id) : id;
    return test.step(`Поиск информации о User с id: ${id}`, async () => {
      const response = await this.apiClient.sendRequest<UserInfoResponse>(
        'GET',
        `${this.url}/${userId}`,
      );
      response.setSchema(UserInfoSchema);
      return response;
    });
  }
}
