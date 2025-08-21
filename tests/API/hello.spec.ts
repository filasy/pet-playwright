import { faker } from '@faker-js/faker';
import { test } from '../../fixtures/API';

test(
  '[GET] Hello выводит переданный name',
  { tag: '@learnqa' },
  async ({ api }) => {
    const myName = faker.person.firstName();
    const response = await api.hello.get({ name: myName });

    await response.statusCode.shouldBe('OK');
    await response.shouldBe({ answer: `Hello, ${myName}` });
    await response.shouldHave({
      property: 'answer',
      value: `Hello, ${myName}`,
    });
  },
);
test('[GET] Hello без name', { tag: '@learnqa' }, async ({ api }) => {
  const response = await api.hello.get();

  await response.statusCode.shouldBe('OK');
  await response.shouldBe({ answer: `Hello, someone` });
});
test('[GET] Hello c пустым name', { tag: '@learnqa' }, async ({ api }) => {
  const response = await api.hello.get({ name: '' });

  await response.statusCode.shouldBe('OK');
  await response.shouldBe({ answer: `Hello, someone` });
});
