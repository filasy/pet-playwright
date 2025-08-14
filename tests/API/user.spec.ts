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

test('Check userId ', async ({ request }) => {
  const userIdResponse = await api.user.getAuth();
  await userIdResponse.statusCode.shouldBe('OK');
  await userIdResponse.shouldHave({ property: 'user_id', withValue: +userId });
});

test('Check user info by id', async () => {
  const response = await api.user.getUserInfo(userId);
  await response.statusCode.shouldBe('OK');

  // await response.shouldHaveValidSchema();
  await response.shouldHave({
    property: 'firstName',
    withValue: userParams.firstName,
  });
  await response.shouldBe({
    id: userId.toString(),
    username: userParams.username,
    email: userParams.email,
    firstName: userParams.firstName,
    lastName: userParams.lastName,
  });
});
