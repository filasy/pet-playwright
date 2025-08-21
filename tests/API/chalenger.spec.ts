import { Api } from '../../api-challenges/API';
import { expect, test } from '../../fixtures/API';
import * as allure from 'allure-js-commons';

const api: Api = new Api();

test.beforeAll(`Получить и установить токен`, async () => {
  await api.authenticate();
});

test.describe(() => {
  test('Получить список challenger', { tag: '@challenges' }, async () => {
    const response = await api.challenges.get();
    await response.statusCode.shouldBe('OK');
    await response.shouldHaveValidSchema();
  });

  test('Получить список todo', { tag: '@challenges' }, async () => {
    const response = await api.todo.getTodo();
    await response.statusCode.shouldBe('OK');
    await response.shouldHaveValidSchema();
  });

  test(
    'Получить список todo. Ошибка в endpoint',
    { tag: ['@challenges', '@negative'] },
    async () => {
      allure.tag('UI');
      const response = await api.todo.getTodoWrong();
      await response.statusCode.shouldBe('Not Found');
    },
  );

  test('Получить todo по id', { tag: '@challenges' }, async () => {
    const ID = 1;
    const response = await api.todo.getTodo(ID);
    await response.statusCode.shouldBe('OK');
    await response.shouldHaveValidSchema();
    expect(response.body.todos!.length).toBe(1);
    expect(response.body.todos![0].id).toBe(ID);
  });

  test(
    'Получить todo по id. Не существует id',
    { tag: ['@challenges', '@negative'] },
    async () => {
      const WRONG_ID = 100500;
      const response = await api.todo.getTodo(WRONG_ID);
      await response.statusCode.shouldBe('Not Found');
      await response.shouldHaveValidSchema();
      await response.shouldBe({
        'errorMessages': [`Could not find an instance with todos/${WRONG_ID}`],
      });
    },
  );
});

test.afterAll(`Проверить количество выполненных заданий`, async () => {
  const TEST_COUNT = 7;
  const response = await api.challenges.get();
  await response.statusCode.shouldBe('OK');
  expect(
    response.body.challenges.filter((task) => task.status === true).length,
    `Проверка: выполнено ${TEST_COUNT} заданий`,
  ).toEqual(TEST_COUNT);
  expect(response.body.challenges.length).toEqual(59);
});
