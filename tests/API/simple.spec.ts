import { test } from '@playwright/test';
import { Api } from '../../api/API';
import { faker } from '@faker-js/faker';

test('[GET] Проверить Hello', async ({ request }) => {
  const myName = faker.person.firstName();
  const response = await new Api(request).hello.get({ name: myName });
  await response.statusCode.shouldBe('OK');
  await response.shouldBe({ answer: `Hello, ${myName}` });
});
