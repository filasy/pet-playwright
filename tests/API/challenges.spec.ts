import { Api } from '../../api-challenges/API';
import { FailedValidation } from '../../api-challenges/todos/TodoResponse';
import { expect, test } from '../../fixtures/API';
import { TodoBuilder } from '../../utils/builders/todo.builder';

const api: Api = new Api();

test.beforeAll(`1. Получить и установить токен`, async () => {
  await api.authenticate();
});

test.afterAll(` Проверить количество выполненных заданий`, async () => {
  const TEST_COUNT = 16;
  const response = await api.challenges.get();
  await response.statusCode.shouldBe('OK');
  expect(
    response.body.challenges.filter((task) => task.status === true).length,
    `Проверка: выполнено ${TEST_COUNT} заданий`,
  ).toEqual(TEST_COUNT);
  expect(response.body.challenges.length).toEqual(59);
});

test('2. [GET] Получить список challenges', async () => {
  const response = await api.challenges.get();
  await response.statusCode.shouldBe('OK');
  await response.shouldHaveValidSchema();
});

test('3. [GET] Получить список todo', async () => {
  const response = await api.todo.getTodoList();
  await response.statusCode.shouldBe('OK');
  await response.shouldHaveValidSchema();
});

test(
  '4. [GET] Получить список todo. Ошибка в end point.',
  { tag: '@negative' },
  async () => {
    const response = await api.todo.getTodoWrong();
    await response.statusCode.shouldBe('Not Found');
  },
);

test('5. [GET] Получить todo по id', async () => {
  const ID = 1;
  const response = await api.todo.getTodoById(ID);
  await response.statusCode.shouldBe('OK');
  await response.shouldHaveValidSchema();
  expect(response.body.todos!.length).toBe(1);
  expect(response.body.todos![0].id).toBe(ID);
});

test(
  '6. [GET] Получить todo по id. Не существует id.',
  { tag: '@negative' },
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
  test(`7. [GET] Получить список ${element ? 'выполненных' : 'не выполненных'} заданий`, async () => {
    //Arrange
    const DONE_TODO = TodoBuilder.create().withAll().asNotDone().build();
    const NOT_DONE_TODO = TodoBuilder.create().withAll().asDone().build();
    await api.todo.createTodo(DONE_TODO);
    await api.todo.createTodo(NOT_DONE_TODO);

    //Act
    const response = await api.todo.filterTodo(element ? 'true' : 'false');
    //Asserts
    await response.statusCode.shouldBe('OK');
    await response.shouldHaveValidSchema();
    expect(
      response.body.todos?.every((todo) => todo.doneStatus === element),
      'Проверка: все todo c верным статусом',
    ).toBeTruthy();
  });
});

test('8. [HEAD]  Получить только заголовки запроса', async () => {
  const response = await api.todo.headTodo();
  await response.statusCode.shouldBe('OK');
  await response.shouldBeEmpty();
});

test(`9. [POST] Создать todo c валидными данными`, async () => {
  const TODO = TodoBuilder.create().withAll().build();
  const response = await api.todo.createTodo(TODO);
  //asserts
  await response.statusCode.shouldBe('Created');
  await response.shouldHaveValidSchema();
  await response.shouldHave({ property: 'title', value: TODO.title });
  await response.shouldHave({
    property: 'description',
    value: TODO.description,
  });
  await response.shouldHave({
    property: 'doneStatus',
    value: TODO.doneStatus,
  });
});

test(
  `10. [POST] Создать todo. Неверный тип doneStatus.`,
  { tag: '@negative' },
  async () => {
    const TODO = {
      title: 'title',
      description: 'description',
      doneStatus: 'invalid',
    };
    const response = await api.todo.createTodoWithInvalidParams(TODO);
    await response.statusCode.shouldBe('Bad Request');
    await response.shouldHaveValidSchema();
    await response.shouldHave({
      property: 'errorMessages',
      value: [FailedValidation.DONESTATUS_INVALID_TYPE],
    });
  },
);

test(
  `11. [POST] Создать todo. Слишком длинный title.`,
  { tag: '@negative' },
  async () => {
    const TODO = TodoBuilder.create().withAll().addTitle(51).build();
    const response = await api.todo.createTodoWithInvalidParams(TODO);
    await response.statusCode.shouldBe('Bad Request');
    await response.shouldHaveValidSchema();
    await response.shouldHave({
      property: 'errorMessages',
      value: [FailedValidation.TITLE_TOO_LONG],
    });
  },
);

test(
  `12. [POST] Создать todo. Слишком длинный description.`,
  { tag: '@negative' },
  async () => {
    const TODO = TodoBuilder.create().withAll().addDescription(201).build();
    const response = await api.todo.createTodoWithInvalidParams(TODO);
    await response.statusCode.shouldBe('Bad Request');
    await response.shouldHaveValidSchema();
    await response.shouldHave({
      property: 'errorMessages',
      value: [FailedValidation.DESCRIPTION_TOO_LONG],
    });
  },
);

test(`13. [POST] Создать todo. Граничные значения title и description.`, async () => {
  const TODO = TodoBuilder.create().addTitle(50).addDescription(200).build();
  const response = await api.todo.createTodo(TODO);
  await response.statusCode.shouldBe('Created');
  await response.shouldHaveValidSchema();
});

test(
  `14. [POST] Создать todo. Слишком длинный content.`,
  { tag: '@negative' },
  async () => {
    const TODO = TodoBuilder.create().withAll().addDescription(5000).build();
    const response = await api.todo.createTodoWithInvalidParams(TODO);
    await response.statusCode.shouldBe('Request Entity Too Large');
    await response.shouldHaveValidSchema();
    await response.shouldHave({
      property: 'errorMessages',
      value: [FailedValidation.CONTENT_TOO_LONG],
    });
  },
);

test(
  `15. [POST] Создать todo. Лишнее свойство в объекте todo.`,
  { tag: '@negative' },
  async () => {
    const TODO = { title: 'a title', priority: 'extra' };
    const response = await api.todo.createTodoWithInvalidParams(TODO);
    await response.statusCode.shouldBe('Bad Request');
    await response.shouldHaveValidSchema();
    await response.shouldHave({
      property: 'errorMessages',
      value: [FailedValidation.COOULD_NOT_FIND_FIELD],
    });
  },
);
