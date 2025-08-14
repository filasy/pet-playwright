import test, { expect } from '@playwright/test';
import { StatusCode } from './StatusCode';

type ResponseProps<T extends Record<string, unknown> | string> = {
  statusCode: number;
  body: T;
  headers: Record<string, string>;
};

export class Response<T extends Record<string, unknown> | string> {
  public statusCode: StatusCode;
  public body: Record<string, unknown> | string;
  public headers: Record<string, string>;

  constructor({ statusCode, headers, body }: ResponseProps<T>) {
    this.statusCode = new StatusCode(statusCode);
    this.body = body;
    this.headers = headers;
  }

  public async shouldBe(expectedBody: T) {
    await test.step(`Checking that body equals: ${JSON.stringify(expectedBody, null, 2)}`, async () => {
      if (typeof expectedBody === 'string') {
        throw new Error('This response body is a string, not json');
      }
      expect(this.body).toEqual(expect.objectContaining(expectedBody));
    });
  }
  public async shouldHave<Key extends keyof T>({
    property,
    withValue,
  }: {
    property: Key;
    withValue: string;
  }) {
    await test.step(`Checking that response have property '${String(property)}' with value ${withValue}`, async () => {
      expect((this.body as T)[String(property)]).toEqual(withValue);
    });
  }
}
