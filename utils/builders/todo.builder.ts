import { fakerRU as faker } from '@faker-js/faker';
import { Todo } from '../../api-challenges/todos/TodoResponse';

export class TodoBuilder {
  private todo: Partial<Todo> = {};

  constructor() {
    this.reset();
  }

  reset() {
    this.todo = {
      title: '',
      description: '',
      doneStatus: false,
    };
  }

  addTitle(title?: string) {
    this.todo.title = title || faker.lorem.words(1);
    return this;
  }

  addDescription(description?: string) {
    this.todo.description = description || faker.lorem.words(1);
    return this;
  }

  addDoneStatus(doneStatus?: boolean) {
    this.todo.doneStatus = doneStatus ?? faker.datatype.boolean();
    return this;
  }

  asDone() {
    this.todo.doneStatus = true;
    return this;
  }
  asNotDone() {
    this.todo.doneStatus = false;
    return this;
  }

  withAll() {
    this.addTitle();
    this.addDescription();
    this.addDoneStatus();
    return this;
  }

  build(): Todo {
    const result = this.todo;
    this.reset();
    return result as Todo;
  }

  static create(): TodoBuilder {
    return new TodoBuilder();
  }
}
