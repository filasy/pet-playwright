import { ClientRequest } from 'http';
import { test } from '../../fixtures/API';
import { UserBuilder } from '../../utils/helpers';

test.describe('Авторизованный пользователь', () => {
  test('Получить userId после логина', async ({ authApi }) => {
    const userIdResponse = await authApi.user.getAuth();

    await userIdResponse.statusCode.shouldBe('OK');
    await userIdResponse.shouldHave({
      property: 'user_id',
      value: +authApi.authUser!.userId,
    });
  });

  test('Получить инфо о User по Id', async ({ authApi }) => {
    const response = await authApi.user.getUserInfo(authApi.authUser!.userId);

    await response.statusCode.shouldBe('OK');
    await response.shouldHave({
      property: 'email',
      value: authApi.authUser!.email,
    });
    await response.shouldHaveValidSchema();
  });

  test('Обновить данные своего аккаунта', async ({ authApi }) => {
    const new_values = new UserBuilder().withAll().build();
    const { password, ...user_without_pass } = new_values;
    const userId = authApi.authUser!.userId;

    const updateUser = await authApi.user.update(userId, new_values); //обновляем юзера
    await updateUser.statusCode.shouldBe('OK');
    await updateUser.duration.shouldBeValid()    
    await updateUser.shouldBe({ success: '!' });

    const getUserInfo = await authApi.user.getUserInfo(userId); //запрашиваем данные о юзере
    await getUserInfo.shouldBe({ ...user_without_pass, id: userId });
    await getUserInfo.shouldHaveValidSchema();
  });

  test(
    'Запрещено удаление чужого аккаунта',
    { tag: '@negative' },
    async ({ authApi }) => {
      const response = await authApi.user.delete('100500');
      await  response.statusCode.shouldBe('Bad Request');
      await response.shouldHave({
        property: 'error',
        value: 'This user can only delete their own account.',
      });
      await response.shouldHaveValidSchema();
    },
  );
});

test.describe('Неавторизованный пользователь', () => {
  test('Запрещено удаление аккаунта', { tag: '@negative' }, async ({ api }) => {
    const response = await api.user.delete('100500');
    await response.statusCode.shouldBe('Bad Request');
    await response.shouldHave({
      property: 'error',
      value: 'Auth token not supplied',
    });
    await response.shouldHaveValidSchema();
  });
});
