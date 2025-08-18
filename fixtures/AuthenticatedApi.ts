import test from '@playwright/test';
import { Api } from '../learnqa-api/Api';
import { UserParams } from '../learnqa-api/user/UserParams';
import { createRandomUserParams } from '../utils/helpers';

export class AuthenticatedApi extends Api {
  public authUser: (UserParams & { userId: string }) | undefined;

  public async authWithRandomUser() {
    await test.step(`Логин случайным пользователем`, async () => {
      const randomUser = createRandomUserParams();
      const createUserResponse = await this.user.create(randomUser);
      await createUserResponse.statusCode.shouldBe('OK');
      const userId = createUserResponse.body.id;

      this.authUser = {
        ...randomUser,
        userId,
      };
      await super.authenticate(this.authUser.email, this.authUser.password);
    });
  }
}
