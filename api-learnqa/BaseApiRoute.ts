import { ApiClient } from '../api-client/ApiClient';

export abstract class ApiRoute {
  constructor(
    protected apiClient: ApiClient,
    protected url: string,
  ) {}
}
