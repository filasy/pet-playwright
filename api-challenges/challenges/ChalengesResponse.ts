import { JSONSchemaType } from 'ajv';

export type Challenger = {
  id: number;
  name: string;
  description: string;
  status: boolean;
};

export type ChalengesResponse = {
  challenges: Challenger[];
};

export const ChallengerSchema: JSONSchemaType<Challenger> = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    description: { type: 'string' },
    status: { type: 'boolean' },
  },
  required: ['description', 'name', 'status'], // укажите обязательные поля
  additionalProperties: false, // запретить дополнительные поля
};

export const ChalengesSchema: JSONSchemaType<ChalengesResponse> = {
  type: 'object',
  properties: {
    challenges: {
      type: 'array',
      items: ChallengerSchema,
    },
  },
  required: ['challenges'],
  additionalProperties: false,
};
