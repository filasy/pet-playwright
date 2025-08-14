import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { Api } from '../../learnqa-api/Api';

test('[GET] Проверить Hello c name', async ({ request }) => {
  const myName = faker.person.firstName();
  const response = await new Api(request).hello.get({ name: myName });
  await response.statusCode.shouldBe('OK');
  await response.shouldBe({ answer: `Hello, ${myName}` });
});
test('[GET] Проверить Hello без name', async ({ request }) => {
  const response = await new Api(request).hello.get();
  await response.statusCode.shouldBe('OK');
  await response.shouldBe({ answer: `Hello, someone` });
});
test('[GET] Проверить Hello c пустым name', async ({ request }) => {
  const response = await new Api(request).hello.get({ name: '' });
  await response.statusCode.shouldBe('OK');
  await response.shouldBe({ answer: `Hello, someone` });
});
