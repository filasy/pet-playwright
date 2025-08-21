import test from '@playwright/test';
import { ApiRoute } from '../../api-learnqa/BaseApiRoute';
import { TodosResponse, TodosResponseSchema } from './TodoResponse';

export class Todo extends ApiRoute {
  public async getTodo(id?: number) {
    return test.step(`Получить список todo`, async () => {
      const path = id ? `/${id}` : '';
      const response = await this.apiClient.sendRequest<TodosResponse>(
        'GET',
        this.url + path,
      );
      response.setSchema(TodosResponseSchema);
      return response;
    });
  }

  public async getTodoWrong() {
    return test.step(`Ошибка в endpoint todo`, async () => {
      return await this.apiClient.sendRequest('GET', 'todo');
    });
  }
}
