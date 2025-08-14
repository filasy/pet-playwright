import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { Api } from '../../api/API';

test('[GET] Проверить Hello', async ({ request }) => {
  const myName = faker.person.firstName();
  const response = await new Api(request).hello.get({ name: myName });
  await response.statusCode.shouldBe('OK');
  await response.shouldBe({ answer: `Hello, ${myName}` });
});
