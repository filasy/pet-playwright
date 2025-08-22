import test from '@playwright/test';
import { ApiRoute } from '../../api-learnqa/BaseApiRoute';
import { Todo, TodoSchema, TodosResponse, TodosResponseSchema, TodoWithId } from './TodoResponse';

export class TodoService extends ApiRoute {
  public async getTodoById(id: number) {
    return test.step(`Получить todo по id: = ${id}`, async () => {
      const response = await this.apiClient.sendRequest<TodosResponse>(
        'GET',
        `${this.url}/${id}`,
      );
      response.setSchema(TodosResponseSchema);
      return response;
    });
  }

  public async getTodoList() {
    return test.step(`Получить список todo`, async () => {
      const response = await this.apiClient.sendRequest<TodosResponse>(
        'GET',
        this.url,
      );
      response.setSchema(TodosResponseSchema);
      return response;
    });
  }

  public async filterTodo(doneStatus: 'true' | 'false') {
    return test.step(`Получить список todo, у которых doneStatus = ${doneStatus}`, async () => {
      const response = await this.apiClient.sendRequest<TodosResponse>(
        'GET',
        this.url,
        { params: { doneStatus } },
      );
      response.setSchema(TodosResponseSchema);
      return response;
    });
  }

  public async createTodo(todoParams: Todo) {
    return test.step(`Создать todo`, async () => {
      const response = await this.apiClient.sendRequest<TodoWithId>('POST', this.url, {
        body: todoParams,
      });
      response.setSchema(TodoSchema);
      return response;
    });
  }

  public async headTodo() {
    return test.step(`Получить заголовки запроса`, async () => {
      return await this.apiClient.sendRequest('HEAD', this.url);
    });
  }

  public async getTodoWrong() {
    return test.step(`Ошибка в endpoint todo`, async () => {
      const response = await this.apiClient.sendRequest<TodosResponse>(
        'GET',
        'todo',
      );
      response.setSchema(TodosResponseSchema);
      return response;
    });
  }
}
