import { JSONSchemaType } from 'ajv';

export type Todo = {
  title: string;
  description: string;
  doneStatus: boolean;
};

export type TodoWithId = Todo & {
  id: number;
};

export type TodosResponse = {
  todos?: TodoWithId[];
  errorMessages?: string[];
};

export const TodoSchema: JSONSchemaType<TodoWithId> = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    title: { type: 'string' },
    description: { type: 'string' },
    doneStatus: { type: 'boolean' },
  },
  required: ['description', 'title', 'doneStatus', 'id'],
  additionalProperties: false,
};

export const TodosResponseSchema: JSONSchemaType<TodosResponse> = {
  type: 'object',
  properties: {
    todos: {
      type: 'array',
      items: TodoSchema,
      nullable: true,
    },
    errorMessages: {
      type: 'array',
      items: { type: 'string' },
      nullable: true,
    },
  },
  additionalProperties: false,
};
