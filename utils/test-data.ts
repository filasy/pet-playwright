import { faker } from '@faker-js/faker';
import { UserParams } from '../learnqa-api/user/UserParams';

export const createRandomUserParams = (): UserParams => {
  return {
    username: faker.internet.username(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};

// export class UserBuilder {
//   private user;
//   addUsername() {
//     this.user.username = faker.internet.username();
//     return this;
//   }
// }
