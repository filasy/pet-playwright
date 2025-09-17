import { JSONSchemaType } from 'ajv';

export const enum FailedValidation {
  TITLE_TOO_LONG = 'Failed Validation: Maximum allowable length exceeded for title - maximum allowed is 50',
  // eslint-disable-next-line @stylistic/max-len
  DESCRIPTION_TOO_LONG = 'Failed Validation: Maximum allowable length exceeded for description - maximum allowed is 200',
  DONESTATUS_INVALID_TYPE = 'Failed Validation: doneStatus should be BOOLEAN but was STRING',
  CONTENT_TOO_LONG = 'Error: Request body too large, max allowed is 5000 bytes',
  COOULD_NOT_FIND_FIELD = 'Could not find field: priority'
}

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

export type ErrorMessagesResponse = {
  errorMessages: string[];
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

export const ErrorMessagesResponseSchema: JSONSchemaType<ErrorMessagesResponse> =
  {
    type: 'object',
    properties: {
      errorMessages: {
        type: 'array',
        items: { type: 'string' },
        nullable: false,
      },
    },
    required: ['errorMessages'],
    additionalProperties: false,
  };
