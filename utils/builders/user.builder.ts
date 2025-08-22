import { fakerRU as faker } from '@faker-js/faker';
import { UserParams } from '../../api-learnqa/user/UserParams';

export class UserBuilder {
  private new_user: Partial<UserParams> = {};
  constructor() {
    this.reset();
  }
  reset() {
    this.new_user = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  }
  addUsername(username?: string) {
    this.new_user.username = username || faker.internet.username();
    return this;
  }
  addFirstName(firstName?: string) {
    this.new_user.firstName = firstName || faker.person.firstName();
    return this;
  }
  addLastName(lastName?: string) {
    this.new_user.lastName = lastName || faker.person.lastName();
    return this;
  }
  addEmail(email?: string) {
    this.new_user.email = email || faker.internet.email();
    return this;
  }
  addPassword(password?: string) {
    this.new_user.password = password || faker.internet.password();
    return this;
  }

  withAll() {
    this.addFirstName();
    this.addLastName();
    this.addUsername();
    this.addEmail();
    this.addPassword();
    return this;
  }

  build(): UserParams {
    const result = this.new_user;
    this.reset();
    return result as UserParams;
  }

  static create(): UserBuilder {
    return new UserBuilder();
  }
}

export function hexToRgb(hex: string) {
  hex = hex.startsWith('#') ? hex.slice(1) : hex;
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
}
