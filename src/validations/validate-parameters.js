const getParametersWithEmptyValues = (tools, schema) => {
  return Object.entries(schema).reduce(
    (acc, [parameter, parameterConfig]) => {
      if (!parameterConfig.required) {
        return acc;
      }

      if (tools.inputs[parameter]) {
        return acc;
      }

      acc.push(parameter);
      return acc;
    }, [],
  );
};

const getParametersWithInvalidValues = (tools, schema) => {
  return Object.entries(schema).reduce(
    (acc, [parameter, parameterConfig]) => {
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
    }, [],
  );
};

/**
 * Validate correct parameters of the action
 * @param {import('actions-toolkit').Toolkit} tools
 * @param {object} schema
 */
module.exports = (tools, schema) => {
  const parametersWithEmptyValues = getParametersWithEmptyValues(tools, schema);

  if (parametersWithEmptyValues.length !== 0) {
    tools.exit.failure(
      `You forgot to provide some required values: [${parametersWithEmptyValues.join(
        ', ',
      )}]`,
    );
  }

  const parametersWithInvalidValues = getParametersWithInvalidValues(tools, schema);

  if (parametersWithInvalidValues.length !== 0) {
    tools.exit.failure(
      `Some parameters have invalid values: [${parametersWithInvalidValues.join(
        ', ',
      )}]`,
    );
  }

  tools.exit.failure('mal: ', tools.inputs);
};
