import test, { expect } from '@playwright/test';

const STATUS_CODES = {
  'OK': 200,
  'Internal Server Error': 500,
} as const;

export class StatusCode {
  constructor(private code: number) {}
  public async shouldBe(expectedCode: number | keyof typeof STATUS_CODES) {
    return test.step(`Проверка: StatusCode=${expectedCode}`, async () => {
      const calculatedCode =
        typeof expectedCode === 'number' ? expectedCode : STATUS_CODES[expectedCode];
      expect(calculatedCode).toEqual(this.code);
    });
  }
}
