import test, { expect } from '@playwright/test';
import { StatusCode } from './StatusCode';
import Ajv, { JSONSchemaType } from 'ajv';
import { Duration } from './Duration';

type ResponseProps<T extends Record<string, unknown> | string> = {
  statusCode: number;
  body: T;
  headers: Record<string, string>;
  duration: Duration;
};

export class Response<T extends Record<string, unknown> | string> {
  public statusCode: StatusCode;
  public body: T;
  public headers: Record<string, string>;
  private schema: JSONSchemaType<T> | undefined;
  private ajv = new Ajv();
  public duration: Duration;

  constructor({ statusCode, headers, body, duration }: ResponseProps<T>) {
    this.statusCode = new StatusCode(statusCode);
    this.body = body;
    this.headers = headers;
    this.duration = duration;
  }

  public async shouldBe(expectedBody: T) {
    await test.step(`Проверка: body=${JSON.stringify(expectedBody, null, 2)}`, async () => {
      if (typeof expectedBody === 'string') {
        throw new Error('This response body is a string, not json');
      }
      expect(this.body).toEqual(expect.objectContaining(expectedBody));
    });
  }
  public async shouldHave<Key extends keyof T>({
    property,
    value,
  }: {
    property: Key;
    value: any;
  }) {
    await test.step(`Проверка: cвойство '${String(property)}'=${value}`, async () => {
      expect((this.body as Record<string, unknown>)[String(property)]).toEqual(
        value,
      );
    });
  }
  public async shouldHaveValidSchema() {
    await test.step('Проверка: схема ответа валидная', async () => {
      if (!this.schema) {
        throw new Error('Schema is not defined for this Response instance');
      }
      const validate = this.ajv.compile(this.schema);
      validate(this.body);
      if (validate.errors) {
        await test.step(`Обнаружены ошибки валидации схемы:
                    ${JSON.stringify(validate.errors, null, 2)}
                `, () => {
          expect(validate.errors?.length).toEqual(0);
        });
      }
    });
  }

  public setSchema<T>(schema: JSONSchemaType<T>) {
    this.schema = schema;
  }
}
