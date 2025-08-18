import { JSONSchemaType } from 'ajv';

export type SuccessResponse = {
  success?: string;
  error?: string;
};

export const ResponseSchema: JSONSchemaType<SuccessResponse> = {
  title: 'Response Schema',
  type: 'object',
  properties: {
    success: { type: 'string', nullable: true },
    error: { type: 'string', nullable: true },
  },
};
