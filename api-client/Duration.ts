import test, { expect } from '@playwright/test';

export class Duration {
  constructor(private duration: number = 0) {}
  public async shouldBeValid(maxAllowedTime?: number) {
    const _maxAllowedTime = maxAllowedTime ?? 1000;
    return test.step(`Проверка: время выполнения запроса <= ${_maxAllowedTime}ms`, async () => {
      expect(this.duration).toBeLessThanOrEqual(_maxAllowedTime);
    });
  }
}
