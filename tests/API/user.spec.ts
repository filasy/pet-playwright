import test from '@playwright/test';
import { Api } from '../../learnqa-api/Api';
import { createRandomUserParams } from '../../utils/test-data';

const userParams = createRandomUserParams();
let api: Api;
let userId: string;

test.beforeEach(async ({ request }) => {
  api = new Api(request);
  const createUserResponse = await api.user.create(userParams);
  await createUserResponse.statusCode.shouldBe('OK');
  userId = createUserResponse.body.id;
  await api.authenticate(userParams.email, userParams.password);
});

test.afterEach(async ({ request }) => {
  const deleteUserResponse = await api.user.delete(userId);
  await deleteUserResponse.statusCode.shouldBe('OK');
  await deleteUserResponse.shouldBe({ success: '!' });
});

test('Проверить Id пользователя после логина', async ({ request }) => {
  const userIdResponse = await api.user.getAuth();
  await userIdResponse.statusCode.shouldBe('OK');
  await userIdResponse.shouldHave({ property: 'user_id', withValue: +userId });
});

test('[GET] User', async () => {
  const response = await api.user.getUserInfo(userId);
  await response.statusCode.shouldBe('OK');
  await response.shouldHave({ property: 'email', withValue: userParams.email });

  await response.shouldHaveValidSchema();
});
