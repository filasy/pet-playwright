import { JSONSchemaType } from 'ajv';

export type Todo = {
  id: number;
  title: string;
  description: string;
  doneStatus: boolean;
};

export type TodosResponse = {
  todos?: Todo[];
  errorMessages?: string[];
};

export const TodoSchema: JSONSchemaType<Todo> = {
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
      nullable: true
    },
    errorMessages: {
      type: 'array',
      items: { type: 'string' },
      nullable : true
    },
  },
  additionalProperties: false,
};
