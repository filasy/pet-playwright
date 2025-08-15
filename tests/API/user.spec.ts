import { test } from '../../fixtures/API';

test('Проверить Id пользователя после логина', async ({ authApi }) => {
  const userIdResponse = await authApi.user.getAuth();

  await userIdResponse.statusCode.shouldBe('OK');
  await userIdResponse.shouldHave({
    property: 'user_id',
    withValue: +authApi.authUser!.userId,
  });
});

test('[GET] Проверить инфо о User по Id', async ({ authApi }) => {
  const response = await authApi.user.getUserInfo(authApi.authUser!.userId);

  await response.statusCode.shouldBe('OK');
  await response.shouldHave({
    property: 'email',
    withValue: authApi.authUser!.email,
  });
  await response.shouldHaveValidSchema();
});
