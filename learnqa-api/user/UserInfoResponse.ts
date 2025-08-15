import { JSONSchemaType } from 'ajv';

export type UserInfoResponse = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
};

export const UserInfoSchema: JSONSchemaType<UserInfoResponse> = {
  title: 'User Info',
  type: 'object',
  properties: {
    id: { type: 'string' },
    username: { type: 'string' },
    email: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
  },
  required: ['id', 'username', 'email', 'firstName', 'lastName'],
};
