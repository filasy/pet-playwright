import { Api } from '../../api-challenges/API';
import { expect, test } from '../../fixtures/API';
import { TodoBuilder } from '../../utils/builders/todo.builder';

const api: Api = new Api();

test.beforeAll(`Получить и установить токен`, async () => {
  await api.authenticate();
});

test('Получить список challenger', { tag: '@challenges' }, async () => {
  const response = await api.challenges.get();
  await response.statusCode.shouldBe('OK');
  await response.shouldHaveValidSchema();
});

test('Получить список todo', { tag: '@challenges' }, async () => {
  const response = await api.todo.getTodoList();
  await response.statusCode.shouldBe('OK');
  await response.shouldHaveValidSchema();
});

test(
  'Получить список todo. Ошибка в end point',
  { tag: ['@challenges', '@negative'] },
  async () => {
    const response = await api.todo.getTodoWrong();
    await response.statusCode.shouldBe('Not Found');
  },
);

test('Получить todo по id', { tag: '@challenges' }, async () => {
  const ID = 1;
  const response = await api.todo.getTodoById(ID);
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
    const response = await api.todo.getTodoById(WRONG_ID);
    await response.statusCode.shouldBe('Not Found');
    await response.shouldHaveValidSchema();
    await response.shouldBe({
      'errorMessages': [`Could not find an instance with todos/${WRONG_ID}`],
    });
  },
);

[true, false].forEach((element) => {
  test(
    `Получить список ${element ? 'выполненных' : 'не выполненных'} заданий`,
    { tag: ['@challenges'] },
    async () => {
      //добавляем новые todo
      const DONE_TODO = TodoBuilder.create().withAll().asNotDone().build();
      const NOT_DONE_TODO = TodoBuilder.create().withAll().asDone().build();
      await api.todo.createTodo(DONE_TODO); 
      await api.todo.createTodo(NOT_DONE_TODO);

      //фильтруем список todo
      const response = await api.todo.filterTodo(element ? 'true' : 'false');
      await response.statusCode.shouldBe('OK');
      await response.shouldHaveValidSchema();
      expect(
        response.body.todos?.every((todo) => todo.doneStatus === element),
        'Проверка: все todo c верным статусом',
      ).toBeTruthy();
    },
  );
});

test('Получить заголовки ответа', { tag: '@challenges' }, async () => {
  const response = await api.todo.headTodo();
  await response.statusCode.shouldBe('OK');
  await response.shouldBeEmpty();
});

test(`Создать todo`, { tag: '@challenges' }, async () => {
  const TODO_PARAMS = TodoBuilder.create().withAll().build();
  const response = await api.todo.createTodo(TODO_PARAMS);
  await response.statusCode.shouldBe('Created');
  await response.shouldHaveValidSchema();
  await response.shouldHave({ property: 'title', value: TODO_PARAMS.title });
  await response.shouldHave({
    property: 'description',
    value: TODO_PARAMS.description,
  });
  await response.shouldHave({
    property: 'doneStatus',
    value: TODO_PARAMS.doneStatus,
  });
});

test.afterAll(`Проверить количество выполненных заданий`, async () => {
  const TEST_COUNT = 9;
  const response = await api.challenges.get();
  await response.statusCode.shouldBe('OK');
  expect(
    response.body.challenges.filter((task) => task.status === true).length,
    `Проверка: выполнено ${TEST_COUNT} заданий`,
  ).toEqual(TEST_COUNT);
  expect(response.body.challenges.length).toEqual(59);
});
