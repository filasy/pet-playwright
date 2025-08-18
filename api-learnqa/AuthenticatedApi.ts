import test from '@playwright/test';
import { Api } from './Api';
import { UserParams } from './user/UserParams';
import { UserBuilder } from '../utils/helpers';

export class AuthenticatedApi extends Api {
  public authUser: (UserParams & { userId: string }) | undefined;

  public async authWithRandomUser() {
    await test.step(`Логин случайным пользователем`, async () => {
      const randomUser = new UserBuilder().withAll().build();
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
