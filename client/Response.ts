import test, { expect } from '@playwright/test';
import { StatusCode } from './StatusCode';

type ResponseProps = {
  statusCode: number;
  body: Record<string, unknown> | string;
  headers: Record<string, string>;
};

export class Response {
  public statusCode: StatusCode;
  public body: Record<string, unknown> | string;
  public headers: Record<string, string>;

  constructor({ statusCode, headers, body }: ResponseProps) {
    this.statusCode = new StatusCode(statusCode);
    this.body = body;
    this.headers = headers;
  }

  public async shouldBe(expectedBody: Record<string, unknown> | string) {
    await test.step(`Checking that body equals: ${JSON.stringify(expectedBody, null, 2)}`, async () => {
      if (typeof expectedBody === 'string') {
        throw new Error('This response body is a string, not json');
      }
      expect(this.body).toEqual(expect.objectContaining(expectedBody));
    });
  }
}
