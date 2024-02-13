import { Toolkit } from 'actions-toolkit';

export interface ValidationSchema {
  [key: string]: {
    required: boolean;
    availableValues?: string[]
  }
}

const getParametersWithEmptyValues = (
  tools: Toolkit,
  schema: ValidationSchema,
): string[] => {
  return Object.entries(schema).reduce<string[]>((
    acc,
    [parameter, parameterConfig],
  ) => {
    if (!parameterConfig.required) {
      return acc;
    }

    if (tools.inputs[parameter]) {
      return acc;
    }

    acc.push(parameter);
    return acc;
  }, []);
};

const getParametersWithInvalidValues = (
  tools: Toolkit,
  schema: ValidationSchema,
): string[] => {
  return Object.entries(schema).reduce<string[]>((
    acc,
    [parameter, parameterConfig],
  ) => {
    if (!parameterConfig.availableValues) {
      return acc;
    }

    if (!parameterConfig.required && !tools.inputs[parameter]) {
      return acc;
    }

    if (!parameterConfig.availableValues.includes(tools.inputs[parameter])) {
      acc.push(parameter);
    }

    return acc;
  }, []);
};

/**
 * Validate correct parameters of the action
 * @param {import('actions-toolkit').Toolkit} tools
 * @param {object} schema
 */
export default async function validateParameters(
  tools: Toolkit,
  schema: ValidationSchema,
): Promise<void> {
  const emptyParams = getParametersWithEmptyValues(tools, schema);

  if (emptyParams.length) {
    tools.exit.failure(
      `You forgot to provide some required values: [${emptyParams.join(
        ', ',
      )}]`,
    );
  }

  const invalidParams = getParametersWithInvalidValues(tools, schema);

  if (invalidParams.length) {
    tools.exit.failure(
      `Some parameters have invalid values: [${invalidParams.join(
        ', ',
      )}]`,
    );
  }
}
